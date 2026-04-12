<script lang="ts">
  import { alerts } from '$lib/alerts.svelte';
  import { fly } from 'svelte/transition';
</script>

<div class="fixed top-6 right-6 z-50 pointer-events-none">
  {#if alerts.visible}
    <div 
      in:fly={{ x: 200, duration: 300 }} 
      out:fly={{ x: 200, duration: 300 }}
      class="pointer-events-auto p-6 rounded-none border-l-8 shadow-2xl max-w-sm animate-bounce-subtle
      {alerts.type === 'shame' ? 'bg-red-600 border-black text-white' : 
       alerts.type === 'error' ? 'bg-red-900 border-red-600 text-red-100' : 
       alerts.type === 'success' ? 'bg-green-600 border-green-900 text-white' : 
       'bg-slate-800 border-slate-600 text-slate-100'}"
    >
      <div class="flex items-start gap-4">
        <div class="font-black uppercase text-xs tracking-widest opacity-50">
          {alerts.type}
        </div>
        <div class="font-bold text-lg leading-tight">
          {alerts.message}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
</style>
