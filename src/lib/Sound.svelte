<script lang="ts">
  export let isMuted: boolean
</script>  

<button on:click class="button" type="button">
  {#if isMuted}
    <svg viewBox="0 0 24 24" fill="none" class="icon">
      <path d="M7 16H5C3.89543 16 3 15.1046 3 14V10C3 9.25972 3.4022 8.61337 4 8.26756M13 8.5V3L10 5.5M13 17.5V21L10 18.5M3 3L21 21" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {:else}
    <svg viewBox="0 0 24 24" fill="none"class="icon">
      <path d="M7 16H5C3.89543 16 3 15.1046 3 14V10C3 8.89543 3.89543 8 5 8H7L13 3V21L10 18.5M16 8.99999C16.5 9.49999 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12M19 18C19.794 17.206 20.3078 16.1319 20.6155 15" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {/if}
</button>  

<style>
  .button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 2em;
    border: none;
    background-color: transparent;
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s opacity ease-in-out;
  }

  @media (hover: hover) {
    .button:hover,
    .button:focus {
      opacity: 1;
    }
  }

  .icon {
    display: block;
    width: 2em;
    height: 2em;
  }
</style>