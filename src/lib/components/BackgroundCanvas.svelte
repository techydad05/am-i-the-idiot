<script lang="ts">
  import { onMount } from 'svelte';

  const definition = "In ancient Greece, an 'idios' wasn't someone who was stupid. It was a private citizen—someone who chose to avoid the civic duties of their community. To the Greeks, the real 'idiot' was the person who thought they were above the responsibilities of citizenship. They didn't hate the ignorant; they hated the disengaged.";
  
  const keywords = ["idios", "private", "citizen", "civic", "duties", "responsibilities", "citizenship", "disengaged", "ignorant"];
  
  const wordList = definition.toLowerCase().replace(/[.,'—]/g, '').split(/\s+/);

  type Particle = {
    text: string;
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    opacity: number;
    vx: number;
    vy: number;
  };

  let particles = $state<Particle[]>([]);
  let mouse = $state({ x: -1000, y: -1000 });
  let containerWidth = $state(0);
  let containerHeight = $state(0);

  function init() {
    if (containerWidth === 0 || containerHeight === 0) return;
    
    const newParticles: Particle[] = [];
    const totalWordsNeeded = 100; 
    
    for (let i = 0; i < totalWordsNeeded; i++) {
      const word = wordList[i % wordList.length];
      let size = Math.random() * 15 + 12;
      if (keywords.includes(word)) {
        size = Math.random() * 30 + 30;
      }

      let x = 0;
      let y = 0;
      let placed = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!placed && attempts < maxAttempts) {
        x = Math.random() * containerWidth;
        y = Math.random() * containerHeight;
        
        // Check for overlap with existing particles
        const tooClose = newParticles.some(p => {
          const dx = x - p.x;
          const dy = y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          // Minimum distance based on combined font sizes + padding
          const minDistance = (size + p.size) * 0.8; 
          return distance < minDistance;
        });

        if (!tooClose) {
          placed = true;
        }
        attempts++;
      }
      
      newParticles.push({
        text: word,
        x,
        y,
        originX: x,
        originY: y,
        size,
        opacity: Math.random() * 0.4 + 0.4,
        vx: 0,
        vy: 0
      });
    }
    particles = newParticles;
  }

  function updateParticles() {
    if (particles.length === 0) return;
    
    particles = particles.map(p => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const forceRange = 250;
      
      let vx = p.vx;
      let vy = p.vy;

      if (dist < forceRange) {
        const force = (forceRange - dist) / forceRange;
        const angle = Math.atan2(dy, dx);
        vx += Math.cos(angle) * force * 3;
        vy += Math.sin(angle) * force * 3;
      }

      vx += (p.originX - p.x) * 0.02;
      vy += (p.originY - p.y) * 0.02;
      vx *= 0.9;
      vy *= 0.9;

      return {
        ...p,
        x: p.x + vx,
        y: p.y + vy,
        vx,
        vy
      };
    });
  }

  function handleMouseMove(e: PointerEvent) {
    const rect = canvasDiv.getBoundingClientRect();
    
    // On touch devices, only update mouse position when the pointer is pressed.
    // This prevents the background from reacting to page scrolls.
    if ('ontouchstart' in window && e.buttons === 0) return;
    
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  let canvasDiv: HTMLDivElement;

  onMount(() => {
    window.addEventListener('pointermove', handleMouseMove);
    const interval = setInterval(updateParticles, 16);
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      clearInterval(interval);
    };
  });

  $effect(() => {
    if (containerWidth > 0 && containerHeight > 0) {
      init();
    }
  });
</script>

<div 
  bind:this={canvasDiv}
  bind:clientWidth={containerWidth} 
  bind:clientHeight={containerHeight}
  class="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
>
  {#each particles as p}
    <span 
      class="absolute whitespace-nowrap transition-transform duration-75 ease-out"
      style="
        left: {p.x}px; 
        top: {p.y}px; 
        font-size: {p.size}px; 
        color: #FFFFFF;
        opacity: {p.opacity};
        font-family: sans-serif;
        font-weight: {p.size > 30 ? 'bold' : 'normal'};
        transform: translate(-50%, -50%);
      "
    >
      {p.text}
    </span>
  {/each}
</div>
