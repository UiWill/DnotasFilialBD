"use client"

import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2563eb" />
    </mesh>
  )
}

export function TestCube() {
  return (
    <div className="absolute inset-0 z-0" style={{ background: 'transparent' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
      </Canvas>
    </div>
  )
}