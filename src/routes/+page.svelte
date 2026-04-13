<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { civicsQuiz, getFeedback } from '$lib/quiz';
  import { alerts } from '$lib/alerts.svelte';
  import Alerts from '$lib/components/Alerts.svelte';
  import BackgroundCanvas from '$lib/components/BackgroundCanvas.svelte';

  let { data } = $props();
  
  let step = $state('intro-1'); // intro-1, intro-2, intro-3, intro-4, quiz, result
  let currentQuestionIndex = $state(0);
  let score = $state(0);
  let selectedOption = $state<number | null>(null);
  let isWrong = $state(false);
  let userName = $state('');
  let finalFeedback = $state<{ message: string; class: string } | null>(null);
  let highScores = $derived(data.highScores);

  async function startQuiz() {
    if (!userName.trim()) {
      alerts.trigger("You can't be anonymous. Idiots hide; citizens stand accountable.", 'shame');
      return;
    }
    step = 'quiz';
  }

  function nextIntro() {
    if (step === 'intro-1') step = 'intro-2';
    else if (step === 'intro-2') step = 'intro-3';
    else if (step === 'intro-3') step = 'intro-4';
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
    step = 'intro-1';
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    isWrong = false;
    userName = '';
    finalFeedback = null;
  }
</script>

<Alerts />

<!-- Layer 1: The Absolute Bottom (Opaque base color) -->
<div class="fixed inset-0 bg-slate-900 -z-30"></div>

<!-- Layer 2: The Word Cloud (Now behind the overlay) -->
<BackgroundCanvas />

<!-- Layer 3: The Semi-Transparent Blue Overlay (Mutes the words) -->
<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] -z-10"></div>

<!-- Layer 4: The Content (Top layer) -->
<div class="min-h-screen w-full text-slate-900 font-sans selection:bg-red-500 selection:text-white p-4 md:p-8 relative z-10 flex items-center justify-center">
  <div class="max-w-3xl w-full mx-auto bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden flex flex-col max-h-[90vh]">
    
    <!-- Inner Scrollable Area -->
    <div class="overflow-y-auto p-6 md:p-10 custom-scrollbar">
      
      {#if step === 'intro-1'}
        <div in:fade class="space-y-8 text-center">
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase italic leading-none">
            Am I <span class="bg-red-600 text-white px-2">The Idiot?</span>
          </h1>
          
          <div class="relative p-6 bg-slate-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left space-y-4">
            <p class="font-black text-black text-2xl uppercase italic">The Shocking Truth</p>
            <p class="text-lg text-slate-700 leading-tight">
              In ancient Greece, an <span class="font-mono font-bold underline decoration-red-600">"idios"</span> wasn't someone who was stupid. 
              It was a <span class="font-bold text-black">private citizen</span>—someone who chose to avoid the civic duties 
              of their community. 
            </p>
            <p class="text-lg text-slate-700 leading-tight">
              To the Greeks, the real "idiot" was the person who thought they were above the responsibilities 
              of citizenship. They didn't hate the ignorant; they hated the <span class="text-red-600 font-black uppercase">disengaged</span>.
            </p>
          </div>

          <!-- Placeholder for Greek Animation -->
          <div class="aspect-video w-full bg-slate-200 border-4 border-black rounded-none flex items-center justify-center text-slate-500 italic font-bold uppercase tracking-tighter">
            [Animation: Visualizing the Greek Agora vs the isolated "Idios"]
          </div>

          <button 
            onclick={nextIntro}
            class="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Continue →
          </button>
        </div>

      {:else if step === 'intro-2'}
        <div in:fade class="space-y-8 text-center">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase italic leading-none">
            The <span class="bg-red-600 text-white px-2">Cost</span> of Apathy
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="p-4 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p class="text-black font-black text-lg uppercase italic mb-2">Financial Cost</p>
              <p class="text-sm text-black font-medium leading-tight">Not knowing how government works = paying more taxes through inefficiency.</p>
            </div>
            <div class="p-4 bg-blue-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p class="text-black font-black text-lg uppercase italic mb-2">Corporate Rule</p>
              <p class="text-sm text-black font-medium leading-tight">Not voting = letting corporations decide your healthcare and environment.</p>
            </div>
            <div class="p-4 bg-green-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p class="text-black font-black text-lg uppercase italic mb-2">Intellectual Decay</p>
              <p class="text-sm text-black font-medium leading-tight">Believing fake news = allowing your children to grow up uninformed.</p>
            </div>
          </div>

          <button 
            onclick={nextIntro}
            class="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            The Damage →
          </button>
        </div>

      {:else if step === 'intro-3'}
        <div in:fade class="space-y-8 text-center">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase italic leading-none">
            The <span class="bg-red-600 text-white px-2">Damage</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div class="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <p class="text-red-600 font-black text-xl uppercase italic">The Erosion of Power</p>
              <p class="text-slate-700 leading-tight font-medium">
                When citizens stop participating, power doesn't disappear—it just concentrates. 
                Local governance becomes a playground for the few, while the many pay the price in decaying 
                infrastructure and skewed laws.
              </p>
            </div>
            <div class="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <p class="text-red-600 font-black text-xl uppercase italic">The Rise of Noise</p>
              <p class="text-slate-700 leading-tight font-medium">
                Civic vacuum is filled by polarization. Without a broad base of engaged citizens, 
                politics becomes a performance for the extremes, leaving the moderate and the 
                rational invisible and voiceless.
              </p>
            </div>
            <div class="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <p class="text-red-600 font-black text-xl uppercase italic">From Citizen to Consumer</p>
              <p class="text-slate-700 leading-tight font-medium">
                We have traded the duty of citizenship for the convenience of consumption. 
                We expect "services" from our government rather than exercising "authority" over it.
              </p>
            </div>
            <div class="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <p class="text-red-600 font-black text-xl uppercase italic">The Legacy of Apathy</p>
              <p class="text-slate-700 leading-tight font-medium">
                The ultimate tragedy isn't that we are governed by idiots, but that we've become 
                the "idios" ourselves—private individuals watching the world burn from a safe, 
                disengaged distance.
              </p>
            </div>
          </div>

          <!-- Placeholder for American Society Imagery -->
          <div class="aspect-video w-full bg-slate-200 border-4 border-black rounded-none flex items-center justify-center text-slate-600 italic font-bold uppercase tracking-tighter">
            [Visual: Montage of civic decay vs active engagement]
          </div>

          <button 
            onclick={nextIntro}
            class="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Are You One of Them? →
          </button>
        </div>

      {:else if step === 'intro-4'}
        <div in:fade class="flex flex-col h-full justify-center space-y-8 text-center">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase italic leading-none">
            Are <span class="bg-red-600 text-white px-2">You</span> One of Them?
          </h2>
          
          <div class="flex flex-col items-center space-y-4">
            <input 
              type="text" 
              bind:value={userName} 
              placeholder="Enter your real name..." 
              class="w-full max-w-sm p-4 bg-white border-4 border-black text-black text-center font-bold focus:bg-yellow-100 outline-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
            <button 
              onclick={startQuiz}
              class="px-8 py-4 bg-red-600 text-white font-black text-xl uppercase tracking-widest rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
            Test My Intelligence
          </button>
          </div>
        </div>

      {:else if step === 'quiz'}
        <div in:fly={{ y: 20 }} class="space-y-8 text-center">
        <div class="flex justify-between items-end font-black uppercase">
          <span class="text-slate-600">Question {currentQuestionIndex + 1}/{civicsQuiz.length}</span>
          <span class="text-slate-600">Score: {score}</span>
        </div>

        <div class="bg-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-left"
             class:shake={isWrong}>
          
          <h2 class="text-2xl md:text-3xl font-black mb-8 leading-tight text-black">
            {civicsQuiz[currentQuestionIndex].text}
          </h2>

          <div class="grid gap-4">
            {#each civicsQuiz[currentQuestionIndex].options as option, i}
              <button 
                onclick={() => handleOptionSelect(i)}
                disabled={selectedOption !== null}
                class="p-4 text-left rounded-none border-4 transition-all font-bold
                {selectedOption === null ? 'border-black hover:bg-yellow-200' : 
                 i === civicsQuiz[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-200 text-black' : 
                 selectedOption === i ? 'border-red-500 bg-red-200 text-black' : 'border-slate-200 text-slate-400'}"
              >
                {option}
              </button>
            {/each}
          </div>

          {#if selectedOption !== null}
            <div in:fade class="mt-8 p-6 bg-slate-100 border-4 border-black">
              <p class="text-slate-600 text-sm uppercase tracking-widest mb-2 font-black">The Fact</p>
              <p class="text-lg text-black mb-6 italic font-medium">"{civicsQuiz[currentQuestionIndex].fact}"</p>
              <button 
                onclick={nextQuestion}
                class="w-full py-3 bg-red-600 text-white font-black rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
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
          <h1 class="text-5xl font-black uppercase italic text-black">The Verdict</h1>
          <div class="text-8xl font-black {finalFeedback?.class} leading-none">
            {Math.round((score / civicsQuiz.length) * 100)}%
          </div>
          <p class="text-2xl font-black max-w-lg mx-auto {finalFeedback?.class} uppercase italic">
            {finalFeedback?.message}
          </p>
        </div>

        <div class="bg-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 class="text-2xl font-black mb-6 uppercase tracking-tighter text-black">Wall of Shame & Glory</h3>
          <div class="space-y-3">
            {#each highScores as entry}
              <div class="flex justify-between items-center p-3 bg-slate-100 border-2 border-black">
                <span class="font-bold">{entry.name}</span>
                <span class="font-mono font-black {entry.score < 3 ? 'text-red-600' : 'text-green-600'}">{entry.score}/{civicsQuiz.length}</span>
              </div>
            {/each}
          </div>
        </div>

        <button 
          onclick={reset}
          class="px-8 py-4 bg-yellow-300 text-black font-black text-xl uppercase tracking-widest rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-left: 4px solid black;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border: 2px solid black;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>