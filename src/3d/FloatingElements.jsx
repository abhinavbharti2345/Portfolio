import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHeroParallaxRef } from '../context/HeroParallaxContext'

function SoftOrb({ position, color }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.position.y = position[1] + Math.sin(t * 0.55 + position[0] * 2) * 0.12
    meshRef.current.position.x = position[0] + Math.cos(t * 0.35) * 0.04
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.07
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.52, 2]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.18}
        metalness={0.12}
        transmission={0.42}
        thickness={1.4}
        transparent
        opacity={0.88}
        ior={1.35}
      />
    </mesh>
  )
}

export default function FloatingElements() {
  const group = useRef(null)
  const parallaxRef = useHeroParallaxRef()

  useFrame(() => {
    const g = group.current
    if (!g) return
    const { x, y } = parallaxRef.current
    g.position.x = x * 0.18
    g.position.y = y * 0.1
    g.rotation.y = x * 0.07
    g.rotation.x = y * 0.05
  })

  return (
    <group ref={group}>
      <SoftOrb position={[-2.35, 0.45, -0.9]} color="#6366f1" />
      <SoftOrb position={[2.5, -0.35, -1.25]} color="#3b82f6" />
      <SoftOrb position={[0.35, 1.35, -2.1]} color="#a5b4fc" />
      <SoftOrb position={[-0.9, -1.1, -1.6]} color="#60a5fa" />
    </group>
  )
}
