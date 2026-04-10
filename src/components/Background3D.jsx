import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'

function Orb() {
  const meshRef = useRef(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.3} floatIntensity={1.8}>
      <Icosahedron ref={meshRef} args={[1.3, 4]} position={[0, 0.2, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#a855f7"
          emissiveIntensity={1.2}
          distort={0.35}
          speed={2}
          roughness={0.1}
        />
      </Icosahedron>
    </Float>
  )
}

export default function Background3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={2.2} color="#22d3ee" />
        <pointLight position={[-3, -1, -4]} intensity={1.6} color="#d946ef" />
        <Stars radius={120} depth={70} count={1800} factor={4} saturation={0} fade speed={0.8} />
        <Orb />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} enablePan={false} />
      </Canvas>
    </div>
  )
}
