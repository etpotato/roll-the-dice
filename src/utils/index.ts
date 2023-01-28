import * as THREE from 'three'
import { EDiceType } from '../types'

export function getRandomSign() {
  return Math.random() > 0.5 ? -1 : 1
}

export function getMaterial(type: EDiceType) {
  const loader = new THREE.TextureLoader()
  switch (type) {
    case EDiceType.Damage:
      return [
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
    case EDiceType.Attack:
      return [
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-leg.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/attack-empty.png') }),
      ]
    default:
      return [
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-shield.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-sword.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('dice/protection-sword.png') }),
      ]
  }
}
export function getBoxGeometry(boxSize: number) {
  return new THREE.BoxGeometry(boxSize, boxSize, boxSize)
}
