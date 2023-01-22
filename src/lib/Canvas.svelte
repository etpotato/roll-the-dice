<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import * as THREE from 'three'
  import { getRandomSign } from '../utils'

  const DICE_COUNT = 3

  let camera: THREE.PerspectiveCamera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer
  let div: HTMLDivElement
  let isRolling = false
  let dices: THREE.Mesh[] = []
  let index = 0

  onMount(() => {
    initThree()
  })

  onDestroy(() => {
    disposeThree()
  })

  function disposeThree() {
    console.log('onDestroy')
    dices.forEach((dice) => {
      dice.geometry.dispose()

      if (Array.isArray(dice.material)) {
        dice.material.forEach((item) => item.dispose())
      } else {
        dice.material.dispose()
      }
    })
    camera = null
    scene = null
    renderer = null
    dices = []

    window.removeEventListener('resize', onWindowResize)
  }

  function initThree() {
    camera = new THREE.PerspectiveCamera(800, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 800

    scene = new THREE.Scene()

    const loader = new THREE.TextureLoader()
    const materialArray = [
      new THREE.MeshBasicMaterial({ map: loader.load('cube1.webp') }),
      new THREE.MeshBasicMaterial({ map: loader.load('cube2.webp') }),
      new THREE.MeshBasicMaterial({ map: loader.load('cube3.webp') }),
      new THREE.MeshBasicMaterial({ map: loader.load('cube4.webp') }),
      new THREE.MeshBasicMaterial({ map: loader.load('cube5.webp') }),
      new THREE.MeshBasicMaterial({ map: loader.load('cube6.webp') }),
    ]

    const geometry = new THREE.BoxGeometry(200, 200, 200)

    for (let i = 0; i < DICE_COUNT; i++) {
      const newMesh = new THREE.Mesh(geometry, materialArray)
      dices.push(newMesh)
      scene.add(newMesh)

      if (i === 0) {
        newMesh.position.set(0, -180, 50)
      } else if (i === 1) {
        newMesh.position.set(-300, 180, 0)
      } else if (i === 2) {
        newMesh.position.set(300, 180, 0)
      }
    }

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    div.appendChild(renderer.domElement)

    function show() {
      renderer.render(scene, camera)
      if (renderer) {
        requestAnimationFrame(show)
      }
    }

    show()

    window.addEventListener('resize', onWindowResize)
  }

  function onWindowResize() {
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
    const angleY = Math.floor(Math.random() * 2) * (Math.PI / 2) * getRandomSign()
    const angleZ = Math.floor(Math.random() * 2) * (Math.PI / 2) * getRandomSign()
    animate(mesh, angleX, angleY, angleZ, 50)
  }

  function roll() {
    if (!isRolling) {
      for (let i = 0; i < dices.length; i++) {
        if (index === i || (index + 1) % dices.length === i) {
          rollOne(dices[i])
        }
      }
      index = (index + 1) % dices.length
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={div} on:click={roll} class="canvas" />