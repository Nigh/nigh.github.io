<script>
  import { onMount, tick } from 'svelte';
  import DotsImage from './DotsImage.svelte';
  export let base = '';
  let src;

  const isValidPixel = (rgba) => rgba.a > 50;

  let images = [
    ['head.png', 'welcome.png'],
    ['fullstack1.png', 'fullstack2.png'],
    ['archery.png'],
    ['snowboard.png'],
    ['skateboard.png'],
    ['tecnico.png'],
    ['xianii.png'],
    ['meet.png'],
    ['artificial.png'],
    ['lol.png'],
    ['head.png'],
  ];
  const h1Texts = [
    '欢迎来到<span class="text-primary">我</span>的赛博空间',
    '我是软硬通吃的<br><span class="text-primary">全栈电子工程师</span>',
    '我爱<span class="text-primary">射箭</span><br>专注心与靶的对话',
    '也爱<span class="text-primary">滑雪</span><br>享受御风而行的自由',
    '我用<span class="text-primary">滑板</span><br>穿梭在城市每个角落',
    '我是<span class="text-primary">TecNico</span><br>理性的造物者',
    '我是<span class="text-primary">xianii</span><br>永不离线的探索者',
    '击掌！寻找<span class="text-primary">创意伙伴</span>',
    '创作！沉溺<span class="text-primary">灵感洪流</span>',
    '认真编码<br><span class="text-primary">放肆整活</span>',
    '<span class="text-primary">无限迭代中...</span>',
  ];
  let index = 0;
  let subindex = 0;
  const srcUpdate = () => {
    if (images[index]) {
      src = base + images[index][subindex];
    } else {
      src = '';
    }
  };
  $: if (images[index] && images[index][subindex]) {
    srcUpdate();
  }
  let timerId = null;

  function newTimer() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(nextPage, 5000);
  }
  function nextPage() {
    if (images[index]) {
      subindex = (subindex + 1) % images[index].length;
    } else {
      subindex = 0;
    }
    if (subindex === 0) next();
  }
  onMount(newTimer);

  function next() {
    index = (index + 1) % h1Texts.length;
    subindex = 0;
    srcUpdate();
    newTimer();
  }
  let displayedText = '';
  let typewriterTimeout;

  $: typeTextWithHtml(h1Texts[index]);

  async function typeTextWithHtml(html) {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    displayedText = '';
    let i = 0;
    let result = '';
    let tag = false;
    while (i < html.length) {
      if (html[i] === '<') {
        // Copy tag instantly
        let close = html.indexOf('>', i);
        if (close === -1) break;
        result += html.slice(i, close + 1);
        i = close + 1;
      } else {
        // Reveal text one character at a time
        result += html[i];
        displayedText = result;
        await tick();
        await new Promise((r) => (typewriterTimeout = setTimeout(r, 120)));
        i++;
      }
    }
    displayedText = html;
  }
</script>

<div>
  <div class="flex w-full justify-center">
    <DotsImage {src} color="#fff8" height={400} dotSize={4} gap={1} float={false} {isValidPixel} />
  </div>
  <div class="text-center">
    <h1 class="text-5xl font-bold text-white/80">
      {@html displayedText}
    </h1>
  </div>

  <div class="flex w-full justify-center mt-12 gap-6">
    <button on:click={next} class="btn btn-primary text-xl">下一条</button>
    <a href="/about">
      <button class="btn btn-info text-xl">关于我</button>
    </a>
  </div>
</div>
