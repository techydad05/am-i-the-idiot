<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let width = 0;
  let height = 0;
  let mouse = { x: -1000, y: -1000 };

  const words = [
    "idios", "private", "disengaged", "citizen", "civic duty", 
    "ignorance", "polis", "democracy", "uninformed", "shame", 
    "accountability", "uninformed", "passive", "avoidance", "civics"
  ];

  class Word {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number = 0;
    vy: number = 0;
    text: string;
    size: number;
    opacity: number;

    constructor(text: string, x: number, y: number, size: number) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.originX = x;
      this.originY = y;
      this.size = size;
      this.opacity = Math.random() * 0.3 + 0.1;
    }

    update(mouseX: number, mouseY: number) {
      // Repulsion logic
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const forceRange = 200;
      
      if (dist < forceRange) {
        const force = (forceRange - dist) / forceRange;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 2;
        this.vy += Math.sin(angle) * force * 2;
      }

      // Return to origin logic
      const ox = this.originX - this.x;
      const oy = this.originY - this.y;
      this.vx += ox * 0.01;
      this.vy += oy * 0.01;

      // Friction
      this.vx *= 0.9;
      this.vy *= 0.9;

      this.x += this.vx;
      this.y += this.vy;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.font = `${this.size}px Inter, sans-serif`;
      ctx.fillStyle = `rgba(148, 163, 184, ${this.opacity})`;
      ctx.fillText(this.text, this.x, this.y);
    }
  }

  let particles: Word[] = [];

  function init() {
    particles = [];
    for (let i = 0; i < 60; i++) {
      const text = words[Math.floor(Math.random() * words.length)];
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 20 + 12;
      particles.push(new Word(text, x, y, size));
    }
  }

  function animate() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update(mouse.x, mouse.y);
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  function handleMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
    init();
  }

  onMount(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<canvas 
  bind:this={canvas} 
  class="fixed inset-0 pointer-events-none z-0"
></canvas>

<style>
  canvas {
    background: transparent;
  }
</style>
