import { TextureLoader, MeshBasicMaterial, Mesh } from 'three'
import { EDiceType } from '../types'
import { RoundedBoxGeometry } from './RoundBox'

export function getRandomSign() {
  return Math.random() > 0.5 ? -1 : 1
}

export function getRoundedBox(type: EDiceType, boxSize: number) {
  const loader = new TextureLoader()
  let cubeTexture: MeshBasicMaterial[]
  switch (type) {
    case EDiceType.Damage:
      cubeTexture = [
        new MeshBasicMaterial({ map: loader.load('dice/damage-arm.jpg'), transparent: true }),
        new MeshBasicMaterial({
          map: loader.load('dice/damage-belly.jpg'),
          transparent: true,
        }),
        new MeshBasicMaterial({
          map: loader.load('dice/damage-chest.jpg'),
          transparent: true,
        }),
        new MeshBasicMaterial({
          map: loader.load('dice/damage-groin.jpg'),
          transparent: true,
        }),
        new MeshBasicMaterial({ map: loader.load('dice/damage-leg.jpg'), transparent: true }),
        new MeshBasicMaterial({
          map: loader.load('dice/damage-skull.jpg'),
          transparent: true,
        }),
      ]
      break
    case EDiceType.Attack:
      cubeTexture = [
        new MeshBasicMaterial({ map: loader.load('dice/attack-sword.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/attack-sword.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/attack-sword.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/attack-shield.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/attack-leg.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/attack-empty.jpg') }),
      ]
      break
    default:
      cubeTexture = [
        new MeshBasicMaterial({ map: loader.load('dice/protection-shield.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/protection-shield.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/protection-shield.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/protection-sword.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/protection-sword.jpg') }),
        new MeshBasicMaterial({ map: loader.load('dice/protection-sword.jpg') }),
      ]
  }

  const boxGeom = new RoundedBoxGeometry(boxSize, boxSize, boxSize, 40, 30)
  const box = new Mesh(boxGeom, cubeTexture)

  return box
}

export function getDicePosition(type: EDiceType, boxSize: number): [number, number, number] {
  switch (type) {
    case EDiceType.Attack:
      return [0, -0.8 * boxSize, boxSize / 4]
    case EDiceType.Damage:
      return [-1.1 * boxSize, 0.8 * boxSize, 0]
    default:
      return [1.1 * boxSize, 0.8 * boxSize, 0]
  }
}
