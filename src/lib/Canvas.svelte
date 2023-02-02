<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { PerspectiveCamera, Scene, WebGLRenderer, Vector2, Raycaster } from 'three'
  import debounce from 'lodash.debounce'
  import Menu from './Menu.svelte'
  import Sound from './Sound.svelte'
  import { EDiceType } from '../types'
  import { getDicePosition, getRandomSign, getRoundedBox } from '../utils'

  const BOX_SIZE = 200;

  const dice: Record<EDiceType, THREE.Mesh | undefined> = {
    [EDiceType.Attack]: undefined,
    [EDiceType.Damage]: undefined,
    [EDiceType.Protection]: undefined,
  }
  let camera: THREE.PerspectiveCamera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer
  let canvas: HTMLCanvasElement
  let audio: HTMLAudioElement
  let isMuted = false
  let isRolling = false
  let state = false
  let isDamageActive = true
  let width = 0
  let height = 0

  onMount(() => {
    initThree()
    window.addEventListener('keydown', handleSpace)
  })

  onDestroy(() => {
    disposeThree()
    window.removeEventListener('keydown', handleSpace)
  })

  function disposeThree() {
    Object.values(dice).forEach((dice) => {
      dice?.geometry.dispose()

      if (Array.isArray(dice.material)) {
        dice.material.forEach((item) => item.dispose())
      } else {
        dice?.material.dispose()
      }
    })
    camera = null
    scene = null
    renderer = null

    canvas.removeEventListener('click', handleClick)
    window.removeEventListener('resize', handleWindowResizeDebounced)
  }

  function initThree() {
    width = window.innerWidth;
    height = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`)
    camera = new PerspectiveCamera(1000, width / height, 0.1, 1400)
    camera.position.z = 1000

    scene = new Scene()

    dice[EDiceType.Attack] = getRoundedBox(EDiceType.Attack, BOX_SIZE)
    scene.add(dice[EDiceType.Attack])
    dice[EDiceType.Attack].position.set(...getDicePosition(EDiceType.Attack, BOX_SIZE))

    dice[EDiceType.Damage] = getRoundedBox(EDiceType.Damage, BOX_SIZE)
    scene.add(dice[EDiceType.Damage])
    dice[EDiceType.Damage].position.set(...getDicePosition(EDiceType.Damage, BOX_SIZE))

    dice[EDiceType.Protection] = getRoundedBox(EDiceType.Protection, BOX_SIZE)
    scene.add(dice[EDiceType.Protection])
    dice[EDiceType.Protection].position.set(...getDicePosition(EDiceType.Protection, BOX_SIZE))

    renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0);

    function show() {
      renderer.render(scene, camera)
      if (renderer) {
        requestAnimationFrame(show)
      }
    }

    show()
    
    canvas.addEventListener('click', handleClick)
    window.addEventListener('resize', handleWindowResizeDebounced)
  }

  function handleClick(evt: MouseEvent) {
    const OPACITY = 0.3
    const mouse = new Vector2()
    const raycaster = new Raycaster()
    mouse.set((evt.clientX / width) * 2 - 1, -(evt.clientY / height) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (!intersects.length) {
      return roll()
    }

    if (intersects[0].object !== dice[EDiceType.Damage]) {
      return
    }

    const {material} = intersects[0].object as THREE.Mesh

    isDamageActive = !isDamageActive

    if (Array.isArray(material)) {
      material.forEach((item) => {
        item.opacity = isDamageActive ? 1 : OPACITY
      }) 
    }
  }

  function handleWindowResize() {
    if (!camera) return
    width = window.innerWidth
    height = window.innerHeight
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  const handleWindowResizeDebounced = debounce(handleWindowResize, 500)

  function animate(
    mesh: THREE.Mesh,
    angleX: number,
    angleY: number,
    angleZ: number,
    count: number,
  ) {
    if (!mesh) return

    function recursive(curX: number, curY: number, curZ: number, curCount: number) {
      if (curCount === count) {
        !isMuted && audio.play()
        isRolling = false
        return
      }

      isRolling = true

      if (!mesh) return

      mesh.rotation.set(curX + angleX / count, curY + angleY / count, curZ + angleZ / count)
      curCount++
      requestAnimationFrame(() =>
        recursive(curX + angleX / count, curY + angleY / count, curZ + angleZ / count, curCount),
      )
    }

    recursive(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z, 0)
  }

  function rollOne(mesh: THREE.Mesh) {
    const angleX = (Math.floor(Math.random() * 4) * (Math.PI / 2) + Math.PI * 4) * getRandomSign()
    const angleY = Math.floor(Math.random() * 2 + 1) * (Math.PI / 2) * getRandomSign()
    const angleZ = Math.floor(Math.random() * 2 + 1) * (Math.PI / 2) * getRandomSign()
    animate(mesh, angleX, angleY, angleZ, 50)
  }

  function roll() {
    if (isRolling) return

    if (state) {
      rollOne(dice[EDiceType.Attack])
      isDamageActive && rollOne(dice[EDiceType.Damage])
    } else {
      rollOne(dice[EDiceType.Protection])
    }

    state = !state
  }

  function handleSpace(evt: Event) {
    if ([' ', 'Space'].includes(evt.key)) {
      roll()
    }
  }

  function handleMute(evt: Event) {
    (evt.currentTarget as HTMLButtonElement).blur()
    isMuted = !isMuted
  }
</script>

<div class="wrap">
  <audio bind:this={audio} src="/kick.mp3"/> 
  <canvas bind:this={canvas} class='canvas'></canvas>
  <Sound {isMuted} on:click={handleMute} />
  <Menu />
</div>

<style>
  .wrap {
    position: relative;
  }

  .canvas {
    display: block;
    width: 100% !important;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100) !important;
  }
</style>