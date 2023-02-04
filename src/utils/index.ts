import { TextureLoader, MeshBasicMaterial, Mesh } from 'three'
import { EDiceType } from '../types'
import { RoundedBoxGeometry } from './RoundBox'

const textures: Record<EDiceType, string[]> = {
  [EDiceType.Damage]: [
    'dice/damage-arm.jpg',
    'dice/damage-belly.jpg',
    'dice/damage-chest.jpg',
    'dice/damage-groin.jpg',
    'dice/damage-leg.jpg',
    'dice/damage-skull.jpg',
  ],
  [EDiceType.Attack]: [
    'dice/attack-sword.jpg',
    'dice/attack-sword.jpg',
    'dice/attack-sword.jpg',
    'dice/attack-shield.jpg',
    'dice/attack-leg.jpg',
    'dice/attack-empty.jpg',
  ],
  [EDiceType.Protection]: [
    'dice/protection-shield.jpg',
    'dice/protection-shield.jpg',
    'dice/protection-shield.jpg',
    'dice/protection-sword.jpg',
    'dice/protection-sword.jpg',
    'dice/protection-sword.jpg',
  ],
}

export async function getRoundedBox(type: EDiceType, boxSize: number) {
  const loader = new TextureLoader()
  const cubeTexture: MeshBasicMaterial[] = await Promise.all(
    textures[type].map(
      async (url) => new MeshBasicMaterial({ map: await loader.loadAsync(url), transparent: true }),
    ),
  )

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

export function getRandomSign() {
  return Math.random() > 0.5 ? -1 : 1
}
