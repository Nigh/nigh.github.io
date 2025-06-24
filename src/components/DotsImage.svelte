<script>
  import { onMount } from 'svelte';

  export let src = '';
  export let height = 400;
  export let dotSize = 5;
  export let gap = 2;
  export let color = '#fff';
  export let isValidPixel = (rgba) => rgba.a > 128;
  export let tween = (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const tweenMoveOut = (t) => 1 - Math.pow(1 - t, 4);
  const tweenAlphaIn = (t) => t * t;
  const tweenAlphaOut = (t) => 1 - Math.pow(1 - t, 3);
  export let float = true;

  let canvas;
  let ctx;
  let particles = [];
  let animating = false;
  let animationFinished = false;
  let lastSrc = null;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function makeFloatParams() {
    return {
      amplitude: 0.5 + Math.random(),
      speed: 0.5 + Math.random(),
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    };
  }

  function particleBorn() {
    const alpha = 0.0;
    const r = Math.random();
    return {
      x: (Math.sin(r * Math.PI * 2) * canvas.width) / 2 + canvas.width / 2,
      y: (Math.cos(r * Math.PI * 2) * canvas.height) / 2 + canvas.height / 2,
      alpha,
    };
  }

  async function getImageDotPositions(img) {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawRatio = 0.76;
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * drawRatio;
    const w = img.width * scale;
    const h = img.height * scale;

    // Center the image
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const positions = [];
    const getRGBAfromXY = (x, y) => {
      x = Math.floor(x);
      y = Math.floor(y);
      const idx = (y * canvas.width + x) * 4;
      const r = imageData[idx];
      const g = imageData[idx + 1];
      const b = imageData[idx + 2];
      const a = imageData[idx + 3];
      return { r, g, b, a };
    };
    const padding = Math.floor(dotSize);
    for (let y = padding; y < canvas.height - padding; y += dotSize + gap) {
      for (let x = padding; x < canvas.width - padding; x += dotSize + gap) {
        let validCount = 0;
        for (let i = 0; i < dotSize / 2; i++) {
          if (isValidPixel(getRGBAfromXY(x - i, y - i))) validCount++;
          if (isValidPixel(getRGBAfromXY(x + i, y - i))) validCount++;
          if (isValidPixel(getRGBAfromXY(x + i, y + i))) validCount++;
          if (isValidPixel(getRGBAfromXY(x - i, y + i))) validCount++;
        }
        if (validCount >= dotSize) {
          positions.push({ x: x + Math.random() * 2.0 - 1, y: y + Math.random() * 2.0 - 1 });
        }
      }
    }
    return positions;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function updateParticles(targets) {
    if (particles.length < targets.length) {
      for (let i = 0; particles.length < targets.length; i++) {
        // New particle
        const from = particleBorn();
        particles.push({
          current: { ...from },
        });
      }
    }
    shuffle(targets);
    // Reuse particles for new targets
    for (let i = 0; i < targets.length; i++) {
      let p;
      p = particles[i];
      p.from = { ...p.current };
      p.to = { ...targets[i], alpha: 1.0 };
      p.destroyOnArrive = false;
      p.startTime = performance.now();
      p.duration = 1600 + Math.random() * 1200;
      if (float) {
        p.float = p.float || makeFloatParams();
      } else {
        delete p.float;
      }
    }

    // Extra particles fade out to random positions
    for (let i = particles.length - 1; i >= targets.length; i--) {
      particles[i].from = { ...particles[i].current };
      particles[i].to = { ...particleBorn(), alpha: 0.0 };
      particles[i].destroyOnArrive = true;
      particles[i].startTime = performance.now();
      particles[i].duration = 1600 + Math.random() * 1200;
    }
  }

  function animateParticles() {
    animating = true;
    animationFinished = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();
    let stillAnimating = false;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const t = Math.min(1, (now - (p.startTime || 0)) / (p.duration || 1));

      if (p.to.alpha < 0.05) {
        const tt = tweenMoveOut(t);
        p.current.x = lerp(p.from.x, p.to.x, tt);
        p.current.y = lerp(p.from.y, p.to.y, tt);
        p.current.alpha = lerp(p.from.alpha, p.to.alpha, tweenAlphaOut(Math.min(1, t * 1.5)));
      } else {
        const tt = tween(t);
        p.current.x = lerp(p.from.x, p.to.x, tt);
        p.current.y = lerp(p.from.y, p.to.y, tt);
        p.current.alpha = lerp(p.from.alpha, p.to.alpha, tweenAlphaIn(Math.min(1, t * 2)));
      }

      let x = p.current.x;
      let y = p.current.y;
      if (float && p.float && p.to.alpha === 1 && p.current.alpha > 0.99) {
        x += Math.sin((now / 400) * p.float.speed + p.float.phaseX) * p.float.amplitude;
        y += Math.cos((now / 400) * p.float.speed + p.float.phaseY) * p.float.amplitude;
      }

      ctx.globalAlpha = p.current.alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, dotSize, dotSize);

      // Remove if arrived at position and faded out
      if (
        p.destroyOnArrive &&
        Math.abs(p.current.x - p.to.x) <= 1 &&
        Math.abs(p.current.y - p.to.y) <= 1 &&
        Math.abs(p.current.alpha - p.to.alpha) <= 0.05
      ) {
        particles.splice(i, 1);
        continue;
      }

      if (
        Math.abs(p.current.x - p.to.x) > 0.5 ||
        Math.abs(p.current.y - p.to.y) > 0.5 ||
        Math.abs(p.current.alpha - p.to.alpha) > 0.05
      ) {
        stillAnimating = true;
      }
    }

    if (stillAnimating) {
      requestAnimationFrame(animateParticles);
    } else {
      animating = false;
      animationFinished = true;
      if (!float) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
          ctx.globalAlpha = p.current.alpha;
          ctx.fillStyle = color;
          ctx.fillRect(p.current.x, p.current.y, dotSize, dotSize);
        }
      } else {
        requestAnimationFrame(floatingParticles);
      }
    }
  }

  function floatingParticles() {
    if (animating || !animationFinished) return;
    if (!float) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();
    for (const p of particles) {
      let x = p.current.x;
      let y = p.current.y;
      if (float && p.float) {
        x += Math.sin((now / 400) * p.float.speed + p.float.phaseX) * p.float.amplitude;
        y += Math.cos((now / 400) * p.float.speed + p.float.phaseY) * p.float.amplitude;
      }
      ctx.globalAlpha = p.current.alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, dotSize, dotSize);
    }
    requestAnimationFrame(floatingParticles);
  }

  async function updateDots() {
    if (!ctx || !src) return;
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    await new Promise((res) => {
      img.onload = res;
    });
	
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const newTargets = await getImageDotPositions(img);
    updateParticles(newTargets);
    animateParticles();
  }

  onMount(() => {
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    updateDots();
  });

  $: if (src && src !== lastSrc) {
    lastSrc = src;
    updateDots();
  }
</script>

<canvas bind:this={canvas} style="display: block; margin: auto; width: 100%; height: {height}px;"
></canvas>
