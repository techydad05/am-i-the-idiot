<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { civicsQuiz, getFeedback } from '$lib/quiz';
  import { alerts } from '$lib/alerts.svelte';
  import Alerts from '$lib/components/Alerts.svelte';
  import BackgroundCanvas from '$lib/components/BackgroundCanvas.svelte';

  let { data } = $props();
  
  let step = $state('landing'); // landing, quiz, result
  let currentQuestionIndex = $state(0);
  let score = $state(0);
  let selectedOption = $state<number | null>(null);
  let isWrong = $state(false);
  let userName = $state('');
  let finalFeedback = $state<{ message: string; class: string } | null>(null);
  let highScores = $state(data.highScores);

  async function startQuiz() {
    if (!userName.trim()) {
      alerts.trigger("You can't be anonymous. Idiots hide; citizens stand accountable.", 'shame');
      return;
    }
    step = 'quiz';
  }

  function handleOptionSelect(index: number) {
    if (selectedOption !== null) return;
    
    selectedOption = index;
    const question = civicsQuiz[currentQuestionIndex];
    
    if (index === question.correctAnswer) {
      score++;
      isWrong = false;
    } else {
      isWrong = true;
      alerts.trigger("Wrong. Your ignorance is a gift to lobbyists.", 'error');
    }
  }

  async function nextQuestion() {
    if (currentQuestionIndex < civicsQuiz.length - 1) {
      currentQuestionIndex++;
      selectedOption = null;
      isWrong = false;
    } else {
      await finishQuiz();
    }
  }

  async function finishQuiz() {
    const percentage = score / civicsQuiz.length;
    finalFeedback = getFeedback(percentage);
    
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('score', score.toString());

    const response = await fetch('?/saveScore', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alerts.trigger("Your shame (or glory) has been recorded.", 'info');
      window.location.reload(); 
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
  }
</script>

<Alerts />
<BackgroundCanvas />

<div class="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-red-500 selection:text-white p-4 md:p-8 relative z-10">
  <div class="max-w-2xl mx-auto">
    
    {#if step === 'landing'}
      <div in:fade class="space-y-8 text-center">
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
          Am I <span class="text-red-600">The Idiot?</span>
        </h1>
        
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative space-y-4 text-lg text-slate-400 text-left bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p class="font-bold text-white text-xl">The Shocking Truth About "Idiots"</p>
            <p>
              In ancient Greece, an <span class="text-white font-mono">"idios"</span> wasn't someone who was stupid. 
              It was a <span class="text-white font-bold">private citizen</span>—someone who chose to avoid the civic duties 
              of their community. 
            </p>
            <p>
              To the Greeks, the real "idiot" was the person who thought they were above the responsibilities 
              of citizenship. They didn't hate the ignorant; they hated the <span class="text-red-400 font-bold">disengaged</span>.
            </p>
            <p class="text-slate-300 italic">
              Modern society has forgotten this. We use the word as a generic insult, while we collectively 
              become exactly what the Greeks feared: a population of disengaged "idiots".
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div class="p-4 bg-red-900/20 border border-red-900/50 rounded-xl">
            <p class="text-red-400 font-bold mb-1">Financial Cost</p>
            <p class="text-sm text-slate-400">Not knowing how government works = paying more taxes through inefficiency.</p>
          </div>
          <div class="p-4 bg-red-900/20 border border-red-900/50 rounded-xl">
            <p class="text-red-400 font-bold mb-1">Corporate Rule</p>
            <p class="text-sm text-slate-400">Not voting = letting corporations decide your healthcare and environment.</p>
          </div>
          <div class="p-4 bg-red-900/20 border border-red-900/50 rounded-xl">
            <p class="text-red-400 font-bold mb-1">Intellectual Decay</p>
            <p class="text-sm text-slate-400">Believing fake news = allowing your children to grow up uninformed.</p>
          </div>
        </div>

        <div class="flex flex-col items-center space-y-4">
          <input 
            type="text" 
            bind:value={userName} 
            placeholder="Enter your real name..." 
            class="w-full max-w-sm p-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white text-center focus:border-red-600 outline-none transition-all"
          />
          <button 
            onclick={startQuiz}
            class="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl uppercase tracking-widest rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20"
          >
            Test My Intelligence
          </button>
        </div>
      </div>

    {:else if step === 'quiz'}
      <div in:fly={{ y: 20 }} class="space-y-8">
        <div class="flex justify-between items-end">
          <span class="text-slate-500 font-mono">Question {currentQuestionIndex + 1}/{civicsQuiz.length}</span>
          <span class="text-slate-500 font-mono">Score: {score}</span>
        </div>

        <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden"
             class:shake={isWrong}>
          
          <h2 class="text-2xl md:text-3xl font-bold mb-8 leading-tight">
            {civicsQuiz[currentQuestionIndex].text}
          </h2>

          <div class="grid gap-4">
            {#each civicsQuiz[currentQuestionIndex].options as option, i}
              <button 
                onclick={() => handleOptionSelect(i)}
                disabled={selectedOption !== null}
                class="p-4 text-left rounded-xl border-2 transition-all font-medium
                {selectedOption === null ? 'border-slate-700 hover:border-slate-500 hover:bg-slate-700' : 
                 i === civicsQuiz[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-500/10 text-green-400' : 
                 selectedOption === i ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-slate-800 text-slate-600'}"
              >
                {option}
              </button>
            {/each}
          </div>

          {#if selectedOption !== null}
            <div in:fade class="mt-8 p-6 bg-slate-900 rounded-2xl border-l-4 border-red-600">
              <p class="text-slate-400 text-sm uppercase tracking-widest mb-2 font-bold">The Fact</p>
              <p class="text-lg text-slate-200 mb-6 italic">"{civicsQuiz[currentQuestionIndex].fact}"</p>
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
            {Math.round((score / civicsQuiz.length) * 100)}%
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
                <span class="font-mono font-bold {entry.score < 3 ? 'text-red-500' : 'text-green-500'}">{entry.score}/{civicsQuiz.length}</span>
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
