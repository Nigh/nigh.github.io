<script lang="ts">
  import { onMount } from 'svelte';
  import { tsParticles } from '@tsparticles/engine';
  import { loadSlim } from '@tsparticles/slim';

  export let color = '#ffffff';
  const id = `particles-${Math.random().toString(36).substring(2, 9)}`;
  onMount(async () => {
    await loadSlim(tsParticles);
    tsParticles.load({
      id: id,
      options: {
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: 'transparent' },
        particles: {
          number: { value: 60, density: { enable: true } },
          color: { value: color },
          shape: { type: 'circle' },
          opacity: { value: 0.9 },
          size: { value: 1 },
          move: { enable: true, speed: 1 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' } },
          modes: { repulse: { distance: 100 } },
        },
      },
    });
  });
</script>

<div {id} style="position:fixed; inset:0; z-index:-1;"></div>
