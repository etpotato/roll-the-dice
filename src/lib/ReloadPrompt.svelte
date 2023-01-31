<script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(swr) {
      console.log(`SW registered: ${swr}`)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    }
  });

  function close() {
    offlineReady.set(false)
    needRefresh.set(false)
  }

  $: toast = $offlineReady || $needRefresh
</script>

{#if toast}
  <div
    class="pwa-toast"
    role="alert"
  >
    <div class="message">
      {#if $offlineReady}
      <span>
        App ready to work offline
      </span>
      {:else}
      <span>
        New content available, click on reload button to update.
      </span>
      {/if}
    </div>
    {#if $needRefresh}
      <button on:click={() => updateServiceWorker(true)}>
        Reload
      </button>
    {/if}
    <button on:click={close}>
      Close
    </button>
  </div>
{/if}

<style>
  .pwa-toast {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    margin: 0;
    padding: 12px;
    border-radius: 8px;
    z-index: 1;
    text-align: center;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: white;
  }
  .pwa-toast .message {
    margin-bottom: 10px;
  }
  .pwa-toast button {
    color: #000;
    border: 1px solid #8885;
    outline: none;
    border-radius: 4px;
    padding: 5px 15px;
    background-color: antiquewhite;
  }
</style>
