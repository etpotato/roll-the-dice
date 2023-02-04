<script lang="ts">
  export let isLoading: boolean
</script>

{#if isLoading}
<div class="wrap">
  <svg class="icon" fill="none" viewBox="0 0 24 24">
    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v3m6 3H3l2.64-2.37a9 9 0 0 1 14.574 2.692M21 21v-3m-6-3h6l-2.64 2.37a9 9 0 0 1-14.574-2.692"/>
  </svg>
</div>
{/if}

<style>
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon {
    display: block;
    width: 64px;
    height: 64px;
    animation: load 1.5s linear infinite;
  }

  @keyframes load {
    0% {
      opacity: 0.8;
      transform: rotate(0);
    }
    50% {
      opacity: 0.3;
      transform: rotate(-180deg);
    }
    100% {
      opacity: 0.8;
      transform: rotate(-360deg);
    }
  }
</style>