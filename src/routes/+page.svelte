<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { invalidateAll } from '$app/navigation';
  import { civicsQuiz, getFeedback, CONFIDENCE_CONFIG, getQuestionsForConfidence, type ConfidenceLevel, type Question } from '$lib/quiz';
  import { alerts } from '$lib/alerts.svelte';
  import Alerts from '$lib/components/Alerts.svelte';
  import BackgroundCanvas from '$lib/components/BackgroundCanvas.svelte';
  import { onMount } from 'svelte';

  let { data } = $props();
  
  let isShameMode = $derived(data.shameState?.failed && !data.shameState?.passed);
  
  let step = $state('landing'); // landing, confidence, quiz, result
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

  function reset() {
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
  }
</script>

<Alerts />

<div class="fixed inset-0 bg-slate-900 -z-30"></div>
<BackgroundCanvas />
<div class="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] -z-10"></div>

<div class="h-dvh overflow-y-auto flex justify-center items-start pt-12 pb-12 text-slate-100 font-sans selection:bg-red-500 selection:text-white p-3 md:p-8 relative z-10">
  <div class="max-w-2xl mx-auto w-full">
    
    {#if step === 'landing'}
      <div in:fade class="space-y-6 text-center">
        <h1 in:fly={{ y: -20, duration: 600 }} class="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
          {#if isShameMode}
            I am <span class="text-red-600">the idiot.</span>
          {:else}
            Am I <span class="text-red-600">The Idiot?</span>
          {/if}
        </h1>
        
        <div in:fly={{ y: 20, duration: 600, delay: 100 }} class="relative group">
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

        <div in:fly={{ y: 20, duration: 600, delay: 200 }} class="flex flex-col sm:flex-row items-center justify-center gap-3">
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
      <div in:fade class="space-y-8 text-center">
        <h2 in:fly={{ y: -20 }} class="text-3xl md:text-5xl font-black uppercase italic text-white">
          How confident are you? <span class="text-red-600">Honestly.</span>
        </h2>
        
        <div class="grid grid-cols-1 gap-4">
          {#each Object.entries(CONFIDENCE_CONFIG) as [key, config]}
            <button 
              onclick={() => confirmConfidence(key as ConfidenceLevel)}
              class="group relative p-6 bg-slate-800 border-2 border-slate-700 rounded-2xl text-left transition-all duration-300 hover:border-red-600 hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              <div class="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-2xl font-black uppercase italic text-white">{config.label}</span>
                  <p class="text-slate-400 text-sm">{config.description}</p>
                </div>
                <div class="text-red-500 font-mono font-bold text-lg">
                  {config.questionCount} Qs &bull; {config.timeLimit}s/q
                </div>
              </div>
            </button>
          {/each}
        </div>

        <button onclick={() => step = 'landing'} class="text-slate-500 hover:text-slate-300 transition-colors underline text-sm uppercase tracking-widest">
          Back to start
        </button>
      </div>

    {:else if step === 'quiz'}
      <div in:fade class="space-y-8">
        <div class="flex justify-between items-end">
          <div class="flex flex-col">
            <span class="text-slate-500 font-mono text-xs uppercase">Question</span>
            <span class="text-slate-100 font-mono text-xl">{currentQuestionIndex + 1}/{activeQuiz.length}</span>
          </div>
          
          <div class="flex flex-col items-end">
            <span class="text-slate-500 font-mono text-xs uppercase">Time Remaining</span>
            <span class="text-slate-100 font-mono text-xl {timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}">
              {timeLeft}s
            </span>
          </div>

          <div class="flex flex-col items-end">
            <span class="text-slate-500 font-mono text-xs uppercase">Score</span>
            <span class="text-slate-100 font-mono text-xl">{score}</span>
          </div>
        </div>

        <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden transition-all duration-300"
             class:shake={isWrong}>
          
          <h2 class="text-2xl md:text-3xl font-bold mb-8 leading-tight">
            {activeQuiz[currentQuestionIndex].text}
          </h2>

          <div class="grid gap-4">
            {#each activeQuiz[currentQuestionIndex].options as option, i}
              {@const isCorrect = selectedOption !== null && i === activeQuiz[currentQuestionIndex].correctAnswer}
              {@const isSelectedWrong = selectedOption !== null && selectedOption === i && i !== activeQuiz[currentQuestionIndex].correctAnswer}
              {@const isOther = selectedOption !== null && i !== activeQuiz[currentQuestionIndex].correctAnswer && i !== selectedOption}
              <button 
                onclick={() => handleOptionSelect(i)}
                disabled={selectedOption !== null}
                class="p-4 text-left rounded-xl border-2 transition-all font-medium {isCorrect ? 'border-green-500 bg-green-500/10 text-green-400' : ''} {isSelectedWrong ? 'border-red-500 bg-red-500/10 text-red-400' : ''} {selectedOption === null ? 'border-slate-700 hover:border-slate-500 hover:bg-slate-700' : ''} {isOther ? 'border-slate-800 text-slate-600' : ''}"
              >
                {option}
              </button>
            {/each}
          </div>

          {#if selectedOption !== null}
            <div in:fade class="mt-8 p-6 bg-slate-900 rounded-2xl border-l-4 border-red-600">
              <p class="text-slate-400 text-sm uppercase tracking-widest mb-2 font-bold">The Fact</p>
              <p class="text-lg text-slate-200 mb-6 italic">"{activeQuiz[currentQuestionIndex].fact}"</p>
              <button 
                onclick={nextQuestion}
                class="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
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
  .shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
</style>
// git test
