<script>
  import links from './links.ts';
  import Toast from './Toast.svelte';
  import { showToast } from '../stores/toast.ts';
  function copyMe() {
    navigator.clipboard
      .writeText(JSON.stringify(links.me, null, 2))
      .then(() => showToast('Copied!', 'success'))
      .catch((err) => showToast('Copy failed: ' + err, 'error'));
  }
</script>

<Toast />

<div class="flex flex-col px-4 w-full justify-center items-center">
  <div class="flex flex-col max-w-3xl">
    <h2 class="text-3xl mb-4">Friends</h2>
    <div class="grid grid-cols-3 gap-2">
      {#each links.friends as f}
        <a href={f.link} target="_blank" class="hover:bg-primary p-4 rounded-xl">
          <div class="flex gap-x-4 w-full h-full">
            <div class="h-16 w-16 shrink-0 self-center rounded-full overflow-hidden outline-4 outline-white/60">
              <img src={f.pic} alt={f.name} />
            </div>
            <div class="hidden md:flex flex-col">
              <div>
                <span
                  class="break-all whitespace-normal text-xl font-bold text-white/90 line-clamp-1"
                >
                  {f.name}
                </span>
              </div>
              <div>
                <p class="text-sm/4 text-white/60 line-clamp-3">{f.bio}</p>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <h2 class="text-3xl mt-4">
      My link<span class="text-right text-xs text-white/40 mx-2">Click to copy</span>
    </h2>

    <button class="cursor-pointer mr-auto hover:bg-primary p-4 rounded-xl text-left" on:click={copyMe}>
      <div class="flex gap-x-4">
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
