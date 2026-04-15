<script lang="ts">
  import type { PageServerData } from "./$types";

  let { data } = $props<{ data: PageServerData }>();
</script>

<div class="fixed inset-0 bg-slate-900 -z-30"></div>
<div class="h-dvh overflow-hidden flex justify-center items-center text-slate-100 font-sans p-4 relative z-10">
  <div class="max-w-md mx-auto w-full text-center">
    <div class="text-8xl mb-6">&#x26A0;</div>
    <h1 class="text-4xl font-black uppercase italic mb-4 text-red-600">Auth Error</h1>
    <p class="text-slate-400 mb-8">{data.error ?? "An unknown error occurred during authentication."}</p>
    <a 
      href="/auth/signin"
      class="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-black uppercase tracking-widest rounded-xl hover:from-red-500 hover:to-red-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-900/30"
    >
      Try Again
    </a>
    <div class="mt-6">
      <a href="/" class="text-slate-500 hover:text-slate-300 text-sm uppercase tracking-widest transition-colors">
        &larr; Back to quiz
      </a>
    </div>
  </div>
</div>
