import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import FloatingElements from './FloatingElements'
import CosmicStream from './CosmicStream'

/**
 * Distant starfield + cosmic stream + sparkles — tuned for hero depth.
 */
export default function HeroBackdrop() {
  const starsGroup = useRef(null)

  useFrame((state) => {
    const g = starsGroup.current
    if (!g) return
    g.rotation.y = state.clock.elapsedTime * 0.028
  })

  return (
    <group>
      <group ref={starsGroup}>
        <Stars radius={80} depth={48} count={2000} factor={3.4} fade speed={0.4} />
      </group>
      <CosmicStream />
      <FloatingElements />
      <Sparkles
        count={96}
        scale={16}
        size={2.1}
        speed={0.16}
        opacity={0.4}
        color="#7dd3fc"
      />
      <Sparkles
        count={52}
        position={[3.2, 0.2, -1]}
        scale={9}
        size={1.55}
        speed={0.22}
        opacity={0.3}
        color="#c084fc"
      />
    </group>
  )
}
