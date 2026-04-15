<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { civicsQuiz, getFeedback, CONFIDENCE_CONFIG, getQuestionsForConfidence, type ConfidenceLevel, type Question } from '$lib/quiz';
  import { alerts } from '$lib/alerts.svelte';
  import Alerts from '$lib/components/Alerts.svelte';
  import BackgroundCanvas from '$lib/components/BackgroundCanvas.svelte';

  let { data } = $props();
  
  let isShameMode = $derived(data.shameState?.failed && !data.shameState?.passed);
  // Sync shame header whenever shameState changes (invalidateAll() updates) or on fresh mount
  let showShameHeader = $state(false);
  
  $effect(() => {
    // Sync from server data (invalidateAll updates) AND directly from cookie
    // so shame header appears immediately when returning to landing via reset()
    const cookie = document.cookie.match(/(?:^|;\s*)idiots_tracker=([^;]*)/)?.[1];
    const fromCookie = cookie ? (() => {
      try {
        const parsed = JSON.parse(cookie);
        return parsed.failed && !parsed.passed;
      } catch { return false; }
    })() : false;
    showShameHeader = isShameMode || fromCookie;
  });
  
  let step = $state(data.step); // landing, confidence, quiz, result
  let confidenceLevel = $state<ConfidenceLevel | null>(null);
  let activeQuiz = $state<Question[]>([]);
  
  let currentQuestionIndex = $state(0);
  let score = $state(0);
  let selectedOption = $state<number | null>(null);
  let isWrong = $state(false);
  let userName = $state('');
  let finalFeedback = $state<{ message: string; class: string } | null>(null);
  let highScores = $derived(data.highScores);

  // Timer state
  let timeLeft = $state(0);
  let timerInterval: any;

  // Cleanup timer on step change or component destroy — prevents interval leak on browser-back
  $effect(() => {
    if (step !== 'quiz') {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = undefined;
      }
    }
  });

  function startTimer() {
    if (!confidenceLevel) return;
    const limit = CONFIDENCE_CONFIG[confidenceLevel].timeLimit;
    timeLeft = limit;
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        // Time's up!
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    if (selectedOption !== null) return;
    isWrong = true;
    alerts.trigger("Time's up! Silence is the hallmark of the idiot.", 'error');
    
    // Small delay before moving to next question
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  }

  async function startQuiz() {
    if (!userName.trim()) {
      alerts.trigger("You can't be anonymous. Idiots hide; citizens stand accountable.", 'shame');
      return;
    }
    step = 'confidence';
  }

  function confirmConfidence(level: ConfidenceLevel) {
    confidenceLevel = level;
    activeQuiz = getQuestionsForConfidence(level);
    step = 'quiz';
    startTimer();
  }

  function handleOptionSelect(index: number) {
    if (selectedOption !== null) return;
    
    selectedOption = index;
    const question = activeQuiz[currentQuestionIndex];
    
    if (index === question.correctAnswer) {
      score++;
      isWrong = false;
    } else {
      isWrong = true;
      alerts.trigger("Wrong. Your ignorance is a gift to lobbyists.", 'error');
    }
  }

  async function nextQuestion() {
    if (currentQuestionIndex < activeQuiz.length - 1) {
      currentQuestionIndex++;
      selectedOption = null;
      isWrong = false;
      timeLeft = CONFIDENCE_CONFIG[confidenceLevel!].timeLimit;
    } else {
      await finishQuiz();
    }
  }

  async function finishQuiz() {
    if (timerInterval) clearInterval(timerInterval);
    
    const percentage = score / activeQuiz.length;
    finalFeedback = getFeedback(percentage);
    
    const passed = score >= Math.ceil(activeQuiz.length * 0.6);
    
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('score', score.toString());
    formData.append('total', activeQuiz.length.toString());
    
    const response = await fetch('?/saveScore', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      alerts.trigger("Your shame (or glory) has been recorded.", 'info');
      await invalidateAll();
    }
    
    step = 'result';
  }

  async function reset() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    step = 'landing';
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    isWrong = false;
    userName = '';
    finalFeedback = null;
    confidenceLevel = null;
    activeQuiz = [];
    if (timerInterval) clearInterval(timerInterval);
    await invalidateAll();
  }
</script>

<Alerts />

<div class="fixed inset-0 bg-slate-900 -z-30"></div>
<BackgroundCanvas />
<div class="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] -z-10"></div>

<div class="h-dvh overflow-hidden flex justify-center items-center text-slate-100 font-sans selection:bg-red-500 selection:text-white p-3 md:p-8 relative z-10">
  <div class="max-w-2xl mx-auto w-full h-full flex flex-col py-6 md:py-8">
    
    {#if step === 'landing'}
      <div class="space-y-4 md:space-y-6 text-center flex-1 flex flex-col justify-center animate-fade-in">
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic animate-fly-in-down">
          {#if showShameHeader}
            I am <span class="text-red-600">the idiot.</span>
          {:else}
            Am I <span class="text-red-600">The Idiot?</span>
          {/if}
        </h1>
        
        <div class="relative group animate-fade-in-up animation-delay-100">
          <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative space-y-3 text-base text-slate-400 text-left bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-slate-700/80 shadow-xl group-hover:border-red-600/50 transition-colors duration-500">
            <p class="font-bold text-white text-xl group-hover:text-red-100 transition-colors duration-300">The Shocking Truth About "Idiots"</p>
            <p>
              In ancient Greece, an <span class="text-white font-mono">"idios"</span> wasn't someone who was stupid. 
              It was a <span class="text-white font-bold">private citizen</span>—someone who chose to avoid the civic duties 
              of their community. 
            </p>
            <p>
              To the Greeks, the real "idiot" was the person who thought they were above the responsibilities 
              of citizenship. They didn't hate the ignorant; they hated the <span class="text-red-400 font-bold">disengaged</span>.
            </p>
            <p class="text-slate-300 italic text-sm">
              Modern society has forgotten this. We use the word as a generic insult, while we collectively 
              become exactly what the Greeks feared: a population of disengaged "idiots".
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-left animate-fade-in-up animation-delay-200">
          <div class="group relative p-4 md:p-6 bg-gradient-to-br from-red-900/30 to-red-950/50 border border-red-800/50 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-900/40 hover:from-red-800/40 hover:to-red-950/60">
            <div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div class="relative">
              <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p class="text-red-400 font-bold text-base md:text-xl group-hover:text-red-300 transition-colors duration-300">Financial Cost</p>
              </div>
              <p class="text-sm md:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">Not knowing how government works = paying more taxes through inefficiency.</p>
            </div>
          </div>
          <div class="group relative p-4 md:p-6 bg-gradient-to-br from-red-900/30 to-red-950/50 border border-red-800/50 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-900/40 hover:from-red-800/40 hover:to-red-950/60">
            <div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div class="relative">
              <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <p class="text-red-400 font-bold text-base md:text-xl group-hover:text-red-300 transition-colors duration-300">Corporate Rule</p>
              </div>
              <p class="text-sm md:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">Not voting = letting corporations decide your healthcare and environment.</p>
            </div>
          </div>
          <div class="group relative p-4 md:p-6 bg-gradient-to-br from-red-900/30 to-red-950/50 border border-red-800/50 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-900/40 hover:from-red-800/40 hover:to-red-950/60">
            <div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div class="relative">
              <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
                <p class="text-red-400 font-bold text-base md:text-xl group-hover:text-red-300 transition-colors duration-300">Intellectual Decay</p>
              </div>
              <p class="text-sm md:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">Believing fake news = allowing your children to grow up uninformed.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up animation-delay-200">
          <input 
            type="text" 
            bind:value={userName} 
            placeholder="Enter your real name..." 
            class="w-full max-w-xs p-3 md:p-4 bg-slate-800/80 border-2 border-slate-700/80 rounded-xl text-white text-center focus:border-red-500 outline-none transition-all duration-300 hover:border-slate-600 focus:shadow-lg focus:shadow-red-900/20"
          />
          <button 
            onclick={startQuiz}
            class="px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-base md:text-lg uppercase tracking-widest rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/30 whitespace-nowrap hover:shadow-red-900/50"
          >
            Test My Intelligence
          </button>
        </div>
      </div>

    {:else if step === 'confidence'}
      <div class="space-y-4 md:space-y-6 text-center flex-1 flex flex-col justify-center animate-fade-in">
        <h2 class="text-2xl md:text-4xl font-black uppercase italic text-white animate-fly-in-down">
          How confident are you? <span class="text-red-600">Honestly.</span>
        </h2>
        
        <div class="grid grid-cols-1 gap-3">
          {#each Object.entries(CONFIDENCE_CONFIG) as [key, config]}
            <button 
              onclick={() => confirmConfidence(key as ConfidenceLevel)}
              class="group relative p-4 md:p-5 bg-slate-800 border-2 border-slate-700 rounded-xl text-left transition-all duration-300 hover:border-red-600 hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              <div class="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-xl md:text-2xl font-black uppercase italic text-white">{config.label}</span>
                  <p class="text-slate-400 text-xs md:text-sm">{config.description}</p>
                </div>
                <div class="text-red-500 font-mono font-bold text-sm md:text-base shrink-0">
                  {config.questionCount} Qs · {config.timeLimit}s/q
                </div>
              </div>
            </button>
          {/each}
        </div>

        <button onclick={() => step = 'landing'} class="text-slate-500 hover:text-slate-300 transition-colors underline text-xs md:text-sm uppercase tracking-widest">
          Back to start
        </button>
      </div>

    {:else if step === 'quiz'}
      <div class="space-y-4 md:space-y-6 flex-1 flex flex-col min-h-0 animate-fade-in">
        <div class="flex justify-between items-center shrink-0">
          <div class="flex flex-col">
            <span class="text-slate-500 font-mono text-xs uppercase">Question</span>
            <span class="text-slate-100 font-mono text-base">{currentQuestionIndex + 1}/{activeQuiz.length}</span>
          </div>
          
          <div class="flex flex-col items-center">
            <span class="text-slate-500 font-mono text-xs uppercase">Time</span>
            <span class="text-slate-100 font-mono text-base {timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}">
              {timeLeft}s
            </span>
          </div>

          <div class="flex flex-col items-end">
            <span class="text-slate-500 font-mono text-xs uppercase">Score</span>
            <span class="text-slate-100 font-mono text-base">{score}</span>
          </div>
        </div>

        <div class="bg-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-700 shadow-2xl relative overflow-y-auto transition-all duration-300 flex-1 min-h-0"
             class:shake={isWrong}
             style="max-height: calc(100dvh - 160px);">
         
          <h2 class="text-lg md:text-2xl font-bold mb-4 leading-snug shrink-0">
            {activeQuiz[currentQuestionIndex].text}
          </h2>

          <div class="grid gap-2 md:gap-3">
            {#each activeQuiz[currentQuestionIndex].options as option, i}
              {@const isCorrect = selectedOption !== null && i === activeQuiz[currentQuestionIndex].correctAnswer}
              {@const isSelectedWrong = selectedOption !== null && selectedOption === i && i !== activeQuiz[currentQuestionIndex].correctAnswer}
              {@const isOther = selectedOption !== null && i !== activeQuiz[currentQuestionIndex].correctAnswer && i !== selectedOption}
              <button 
                onclick={() => handleOptionSelect(i)}
                disabled={selectedOption !== null}
                class="p-3 md:p-4 text-left rounded-xl border-2 transition-all font-medium text-sm md:text-base {isCorrect ? 'border-green-500 bg-green-500/10 text-green-400' : ''} {isSelectedWrong ? 'border-red-500 bg-red-500/10 text-red-400' : ''} {selectedOption === null ? 'border-slate-700 hover:border-slate-500 hover:bg-slate-700' : ''} {isOther ? 'border-slate-800 text-slate-600' : ''}"
              >
                {option}
              </button>
            {/each}
          </div>

          {#if selectedOption !== null}
            <div class="mt-4 p-4 bg-slate-900 rounded-xl border-l-4 border-red-600 shrink-0 animate-fade-in">
              <p class="text-slate-400 text-xs uppercase tracking-widest mb-1 font-bold">The Fact</p>
              <p class="text-slate-200 text-sm mb-4 italic leading-snug">"{activeQuiz[currentQuestionIndex].fact}"</p>
              <button 
                onclick={nextQuestion}
                class="w-full py-2.5 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                Continue
              </button>
            </div>
          {/if}
        </div>
      </div>

    {:else if step === 'result'}
      <div in:fade class="space-y-12 text-center">
        <div class="space-y-4">
          <h1 class="text-5xl font-black uppercase italic">The Verdict</h1>
          <div class="text-8xl font-black {finalFeedback?.class}">
            {Math.round((score / activeQuiz.length) * 100)}%
          </div>
          <p class="text-2xl font-medium max-w-lg mx-auto {finalFeedback?.class}">
            {finalFeedback?.message}
          </p>
        </div>

        <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
          <h3 class="text-2xl font-bold mb-6 uppercase tracking-tighter">Wall of Shame & Glory</h3>
          <div class="space-y-3">
            {#each highScores as entry}
              <div class="flex justify-between items-center p-3 bg-slate-900 rounded-lg border border-slate-700">
                <span class="font-medium">{entry.name}</span>
                <span class="font-mono font-bold {entry.score < 3 ? 'text-red-500' : 'text-green-500'}"> {entry.score}</span>
              </div>
            {/each}
          </div>
        </div>

        <button 
          onclick={reset}
          class="px-8 py-4 bg-slate-100 text-slate-900 font-black text-xl uppercase tracking-widest rounded-xl transition-all hover:bg-white"
        >
          Try to be less of an idiot
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }

  .shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  /* CSS replacement for Svelte transitions — no hydration risk */
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes fly-in-down {
    from { transform: translateY(-20px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }

  @keyframes fade-in-up {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  .animate-fade-in {
    animation: fade-in 400ms ease-out both;
  }

  .animate-fly-in-down {
    animation: fly-in-down 600ms ease-out both;
  }

  .animate-fade-in-up {
    animation: fade-in-up 600ms ease-out both;
  }

  .animation-delay-100 {
    animation-delay: 100ms;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }
</style>
