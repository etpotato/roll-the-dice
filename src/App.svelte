<script lang="ts">
  import Canvas from './lib/Canvas.svelte'
  import ReloadPrompt from './lib/ReloadPrompt.svelte'
</script>

<main>
  <Canvas />
  <ReloadPrompt />
</main>

<style>
  main {
    position: relative;
    overflow: hidden;
  }
</style>