import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HeroBackdrop from './HeroBackdrop'

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.8], fov: 40 }}
      >
        <ambientLight intensity={0.22} />
        <directionalLight position={[4, 6, 2]} intensity={0.65} color="#e0e7ff" />
        <pointLight position={[-6, 2, 2]} intensity={0.95} color="#6366f1" />
        <pointLight position={[6, -1, 1]} intensity={0.75} color="#3b82f6" />
        <pointLight position={[2, 3, 1]} intensity={0.35} color="#f7b538" />
        <Suspense fallback={null}>
          <HeroBackdrop />
        </Suspense>
      </Canvas>
    </div>
  )
}
