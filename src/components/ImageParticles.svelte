<script lang="ts">
  import { onMount } from "svelte";
  import { tsParticles } from "@tsparticles/engine";
  import { loadSlim } from "@tsparticles/slim";
  import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

  export let src = ""; // SVG path

  let containerId = `img-particles-${Math.random().toString(36).substring(2, 9)}`;
  let containerEl: HTMLDivElement;
  let scale = 1;

  // Helper: Get SVG viewBox size
  async function getSvgViewBox(svgUrl: string) {
    const res = await fetch(svgUrl);
    const text = await res.text();
    const match = text.match(/viewBox="([\d.\s]+)"/);
    if (match) {
      const [minX, minY, vbWidth, vbHeight] = match[1].split(/\s+/).map(Number);
      return { vbWidth, vbHeight };
    }
    // fallback: try width/height
    const widthMatch = text.match(/width="([\d.]+)"/);
    const heightMatch = text.match(/height="([\d.]+)"/);
    if (widthMatch && heightMatch) {
      return { vbWidth: Number(widthMatch[1]), vbHeight: Number(heightMatch[1]) };
    }
    return { vbWidth: 400, vbHeight: 400 }; // fallback default
  }

  async function updateParticles() {
    if (!containerEl) return;
    const { width, height } = containerEl.getBoundingClientRect();
    const { vbWidth, vbHeight } = await getSvgViewBox(src);

    // Calculate scale to fit SVG inside container
    scale = Math.min(width / vbWidth, height / vbHeight);

    const container = tsParticles.dom().find(c => c.id === containerId);
    if (container) {
      container.loadOptions({
        polygon: {
          url: src,
          scale
        }
      });
      container.refresh();
    }
  }

  async function initParticles() {
    await loadSlim(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);

    const { width, height } = containerEl.getBoundingClientRect();
    const { vbWidth, vbHeight } = await getSvgViewBox(src);
    scale = Math.min(width / vbWidth, height / vbHeight)*0.8;

    await tsParticles.load({
      id: containerId,
      options: {
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 999, density: { enable: false} },
          color: { value: "#ffffff" },
          shape: { type: "square" },
          opacity: { value: 0.6 },
          size: { value: 2 },
          move: { enable: true, speed: {min:0.07, max:0.15}, outModes: { default: "bounce" } },
		  reduceDuplicates: true
        },
        polygon: {
          enable: true,
          type: "inline",
          move: { radius: 3 },
          url: src,
          scale,
          inline: { arrangement: "equidistant" },
          draw: { enable: false, stroke: { color: "rgba(255,100,100,0.6)", width: 4 } }
        }
      }
    });
  }

  // Initialize on mount
  onMount(async () => {
    await initParticles();
  });

  // Update on src or container size change
  $: if (containerEl && src) {
    updateParticles();
  }

  // Update on resize
  function handleResize() {
    updateParticles();
  }

  // Listen for resize events
  onMount(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
</script>

<div
  bind:this={containerEl}
  id={containerId}
  style="height:400px; z-index:-1; overflow:hidden;"
></div>
