<script>
  import { toast } from '../stores/toast.ts';
  import { fly, fade } from 'svelte/transition';
  $: show = $toast.show;
  $: message = $toast.message;
  $: type = $toast.type;
</script>

{#if show}
  <div
    class="toast z-50 fixed"
    transition:fade={{ duration: 350 }}
  >
    <div
      class="alert"
      class:alert-success={type === 'success'}
      class:alert-error={type === 'error'}
      class:alert-info={type === 'info'}
    >
      <span>{message}</span>
    </div>
  </div>
{/if}
