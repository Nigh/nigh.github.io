<script>
  import links from './links.ts';
  import Toast from './Toast.svelte';
  import { showToast } from '../stores/toast.ts';
  function copyMe() {
    navigator.clipboard
      .writeText(JSON.stringify(links.me, null, 2))
      .then(() => showToast('已复制到剪贴板!', 'success'))
      .catch((err) => showToast('复制失败: ' + err, 'error'));
  }
</script>

<Toast />

<div class="flex flex-col gap-4">
  <div class="flex flex-col max-w-xs min-w-3xs border-primary/20 border rounded-xl text-wrap">
    <p class="text-lg font-bold mb-4 px-4 pt-4">赛博友人</p>
    {#each links.friends as f}
      <a href={f.link} target="_blank" class="hover:bg-primary p-4 rounded-xl">
        <div class="flex gap-x-4 w-full">
          <div class="h-16 w-16 shrink-0 rounded-full overflow-hidden outline-4 outline-white/60">
            <img src={f.pic} alt={f.name} />
          </div>
          <div class="flex flex-col">
            <div>
              <span
                class="break-all whitespace-normal text-xl font-bold text-white/90 line-clamp-1"
              >
                {f.name}
              </span>
            </div>
            <div>
              <p class="text-sm/4 text-white/60 line-clamp-2">{f.bio}</p>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="flex flex-col max-w-xs min-w-3xs border-primary/20 border rounded-xl text-wrap">
    <p class="text-lg font-bold px-4 pt-2">
      友链自取
      <span class="text-right text-xs text-white/40 mx-2">点击复制</span>
    </p>
    <button class="cursor-pointer hover:bg-primary p-4 rounded-xl text-left" on:click={copyMe}>
      <div class="flex gap-x-4 w-full">
        <div class="h-16 w-16 shrink-0 rounded-full overflow-hidden outline-4 outline-white/60">
          <img src={links.me.pic} alt={links.me.name} />
        </div>
        <div class="flex flex-col">
          <div>
            <span class="break-all whitespace-normal text-xl font-bold text-white/90 line-clamp-1">
              {links.me.name}
            </span>
          </div>
          <div>
            <p class="text-sm/4 text-white/60 line-clamp-2">{links.me.bio}</p>
          </div>
        </div>
      </div>
    </button>
  </div>
</div>
