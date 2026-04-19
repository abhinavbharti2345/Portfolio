import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useHeroParallaxRef } from '../context/HeroParallaxContext'

const COUNT = 420

/** Deterministic 0–1 “noise” from index (avoids Math.random in render). */
function hash01(i) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

export default function CosmicStream() {
  const group = useRef(null)
  const parallaxRef = useHeroParallaxRef()

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7, -2.2, -4.5),
      new THREE.Vector3(-3, 0.4, -2.8),
      new THREE.Vector3(0.5, -0.2, -2.2),
      new THREE.Vector3(4, 0.8, -2.4),
      new THREE.Vector3(8, 0.2, -4),
    ])

    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const c1 = new THREE.Color('#4cc9f0')
    const c2 = new THREE.Color('#7209b7')
    const c3 = new THREE.Color('#f7b538')

    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT
      const p = curve.getPoint(t)
      const spread = 0.55
      const r0 = hash01(i) - 0.5
      const r1 = hash01(i + 7919) - 0.5
      const r2 = hash01(i + 104729) - 0.5
      positions[i * 3] = p.x + r0 * spread
      positions[i * 3 + 1] = p.y + r1 * spread * 0.8
      positions[i * 3 + 2] = p.z + r2 * spread * 0.5

      const mix = hash01(i + 30011)
      const col = mix < 0.45 ? c1.clone().lerp(c2, mix / 0.45) : c2.clone().lerp(c3, (mix - 0.45) / 0.55)
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const { x, y } = parallaxRef.current
    g.rotation.y = x * 0.14 + Math.sin(t * 0.08) * 0.04
    g.rotation.x = y * 0.1 + Math.cos(t * 0.06) * 0.03
    g.position.x = x * 0.35
    g.position.y = y * 0.12
  })

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <pointsMaterial
          vertexColors
          toneMapped={false}
          size={0.048}
          transparent
          opacity={0.62}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
