<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import DotsImage from './DotsImage.svelte';

  const base = import.meta.env.PUBLIC_BASE_URL;

  // OPTIMIZATION 1: Unified data structure
  const items = [
    { img: 'coding.jpg', label: 'coding' },
    { img: 'gaming.jpg', label: 'playing games' },
    { img: 'camera.jpg', label: 'taking photos' },
    { img: 'archery.jpg', label: 'archery' },
    { img: 'snowboard.jpg', label: 'snowboarding' },
    { img: 'skateboard.jpg', label: 'skateboarding' },
    { img: 'drone.jpg', label: 'flying FPV drones' },
  ];

  let index = 0;
  let timerId;

  $: currentItem = items[index];
  $: src = base + currentItem.img;

  const isValidPixel = (rgba) => rgba.r + rgba.g + rgba.b < 100 && rgba.a > 50;

  // OPTIMIZATION 3: Simplified Timer Logic
  function startTimer() {
    // Ensure we don't have multiple timers running
    stopTimer();
    timerId = setInterval(next, 5000);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
  }

  function next() {
    index = (index + 1) % items.length;
    // No need to call startTimer() here; setInterval loops automatically
  }

  // Start on mount
  onMount(() => {
    startTimer();
    return stopTimer; // Cleanup on component destroy
  });
</script>

<div class="flex md:px-0 px-4 w-full h-full min-h-screen items-center justify-center">
  <div class="md:grid md:grid-cols-2">
    <div class="w-full h-full grid grid-cols-1">
      <div class="self-end">
        <h2 class="md:text-4xl text-3xl">I like</h2>
      </div>
      <div class="md:w-0 md:grid md:grid-cols-1 md:grid-rows-1">
        {#key index}
          <span
            transition:fade={{ duration: 400 }}
            class="absolute w-full max-w-sm ml-12 text-4xl md:text-7xl font-bold text-primary md:col-start-1 md:row-start-1"
          >
            {currentItem.label}
          </span>
        {/key}
      </div>
    </div>
    <div class="min-w-sm max-w-md max-h-md md:my-0 -my-16">
      <DotsImage
        {src}
        color="#fffa"
        height={448}
        dotSize={2}
        gap={1}
        float={false}
        {isValidPixel}
      />
    </div>

    <div class="col-span-2 flex flex-row justify-center gap-4">
      {#each items as item, i}
        <button
          class="btn btn-primary btn-xs w-6 h-6 md:btn-md md:w-10 md:h-6 transition-all duration-200"
          class:btn-outline={index !== i}
          on:mouseenter={() => {
            index = i;
            stopTimer();
          }}
          on:mouseleave={startTimer}
          on:click={() => {
            index = i;
            startTimer();
          }}
          type="button"
          aria-label={`Switch to ${item.label}`}
          tabindex="0"
        ></button>
      {/each}
    </div>
  </div>
</div>
