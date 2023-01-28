import * as THREE from 'three'
import { EDiceType } from '../types'
import { RoundedBoxGeometry } from './RoundBox'

export function getRandomSign() {
  return Math.random() > 0.5 ? -1 : 1
}

export function getRoundedBox(type: EDiceType, boxSize: number) {
  const loader = new THREE.TextureLoader()
  let cubeTexture: THREE.MeshBasicMaterial[]
  switch (type) {
    case EDiceType.Damage:
      cubeTexture = [
        new THREE.MeshBasicMaterial({ map: loader.load('dice/damage-arm.png'), transparent: true }),
        new THREE.MeshBasicMaterial({
          map: loader.load('dice/damage-belly.png'),
          transparent: true,
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load('dice/damage-chest.png'),
          transparent: true,
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load('dice/damage-groin.png'),
          transparent: true,
        }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/damage-leg.png'), transparent: true }),
        new THREE.MeshBasicMaterial({
          map: loader.load('dice/damage-skull.png'),
          transparent: true,
        }),
      ]
      break
    case EDiceType.Attack:
      cubeTexture = [
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-leg.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-empty.png') }),
      ]
      break
    default:
      cubeTexture = [
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-sword.png') }),
      ]
  }

  const boxGeom = new RoundedBoxGeometry(boxSize, boxSize, boxSize, 40, 30)
  const box = new THREE.Mesh(boxGeom, cubeTexture)

  return box
}

// function resize(renderer) {
//   const canvas = renderer.domElement
//   const width = canvas.clientWidth
//   const height = canvas.clientHeight
//   const needResize = canvas.width !== width || canvas.height !== height
//   if (needResize) {
//     renderer.setSize(width, height, false)
//   }
//   return needResize
// }
