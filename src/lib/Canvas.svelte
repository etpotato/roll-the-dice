<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import * as THREE from 'three'
  import { EDiceType } from '../types'
  import { getBoxGeometry, getMaterial, getRandomSign } from '../utils'

  const dice: Record<EDiceType, THREE.Mesh | undefined> = {
    [EDiceType.Attack]: undefined,
    [EDiceType.Damage]: undefined,
    [EDiceType.Protection]: undefined,
  }
  let camera: THREE.PerspectiveCamera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer
  let div: HTMLDivElement
  let isRolling = false
  let state = false
  let isDamageActive = true
  let width = 0
  let height = 0

  onMount(() => {
    initThree()
  })

  onDestroy(() => {
    disposeThree()
  })

  function disposeThree() {
    console.log('onDestroy')
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

    window.removeEventListener('click', handleClick)
    window.removeEventListener('resize', handleWindowResize)
  }

  function initThree() {
    width = window.innerWidth;
    height = window.innerHeight;
    const windowSize = Math.min(width, height)
    camera = new THREE.PerspectiveCamera(1000, width / height, 0.1, 1400)
    camera.position.z = 1000

    scene = new THREE.Scene()

    const boxSize = windowSize/2;

    dice[EDiceType.Attack] = new THREE.Mesh(getBoxGeometry(boxSize), getMaterial(EDiceType.Attack))
    scene.add(dice[EDiceType.Attack])
    dice[EDiceType.Attack].position.set(0, -1 * boxSize, boxSize / 4)

    dice[EDiceType.Damage] = new THREE.Mesh(getBoxGeometry(boxSize), getMaterial(EDiceType.Damage))
    scene.add(dice[EDiceType.Damage])
    dice[EDiceType.Damage].position.set(-1.2 * boxSize, 0.8 * boxSize, 0)

    dice[EDiceType.Protection] = new THREE.Mesh(getBoxGeometry(boxSize), getMaterial(EDiceType.Protection))
    scene.add(dice[EDiceType.Protection])
    dice[EDiceType.Protection].position.set(1.2 * boxSize, 0.8 * boxSize, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0);
    div.appendChild(renderer.domElement)

    function show() {
      renderer.render(scene, camera)
      if (renderer) {
        requestAnimationFrame(show)
      }
    }

    show()
    
    window.addEventListener('click', handleClick)
    window.addEventListener('resize', handleWindowResize)
  }

  function handleClick(evt: MouseEvent) {
    const OPACITY = 0.3
    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
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
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={div} class="canvas" />
