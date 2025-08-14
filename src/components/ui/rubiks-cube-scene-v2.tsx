"use client"

import React, { Suspense, useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Vector3, Matrix4, Quaternion } from "three";
import * as THREE from 'three';

function SimpleCube({ position, rotationMatrix, size = 0.6 }: any) {
  const matrixToQuaternion = useCallback((matrix: Matrix4) => {
    const quaternion = new Quaternion();
    quaternion.setFromRotationMatrix(matrix);
    return quaternion;
  }, []);

  return (
    <group
      position={[
        position.x * (size + 0.01),
        position.y * (size + 0.01),
        position.z * (size + 0.01),
      ]}
      quaternion={matrixToQuaternion(rotationMatrix)}
    >
      <RoundedBox
        args={[size, size, size]}
        radius={0.075}
        smoothness={4}
      >
        <meshPhysicalMaterial 
          color="#2563eb"
          metalness={0.7}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          reflectivity={0.8}
          envMapIntensity={2}
        />
      </RoundedBox>
    </group>
  );
}

function RubiksCube() {
  const groupRef = useRef<THREE.Group>(null);
  const [cubes, setCubes] = useState<any[]>([]);
  const isAnimatingRef = useRef(false);
  const currentRotationRef = useRef(0);
  const currentMoveRef = useRef<any>(null);
  
  // Initialize cubes
  useEffect(() => {
    const initial: any[] = [];
    const positions = [-1, 0, 1];
    
    for (let x of positions) {
      for (let y of positions) {
        for (let z of positions) {
          initial.push({
            position: new Vector3(x, y, z),
            rotationMatrix: new Matrix4().identity(),
            id: `cube-${x}-${y}-${z}`,
          });
        }
      }
    }
    setCubes(initial);
  }, []);

  // Animation logic
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.z += delta * 0.1;
    }

    // Trigger random moves
    if (!isAnimatingRef.current && Math.random() < 0.01) {
      const moves = [
        { axis: 'x', layer: [-1, 0, 1][Math.floor(Math.random() * 3)], direction: Math.random() > 0.5 ? 1 : -1 },
        { axis: 'y', layer: [-1, 0, 1][Math.floor(Math.random() * 3)], direction: Math.random() > 0.5 ? 1 : -1 },
        { axis: 'z', layer: [-1, 0, 1][Math.floor(Math.random() * 3)], direction: Math.random() > 0.5 ? 1 : -1 },
      ];
      
      currentMoveRef.current = moves[Math.floor(Math.random() * moves.length)];
      isAnimatingRef.current = true;
      currentRotationRef.current = 0;
    }

    // Animate current move
    if (isAnimatingRef.current && currentMoveRef.current) {
      const progress = Math.min(currentRotationRef.current + delta / 1.0, 1);
      currentRotationRef.current = progress;

      if (progress >= 1) {
        isAnimatingRef.current = false;
        currentRotationRef.current = 0;
        currentMoveRef.current = null;
      }
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {cubes.map((cube) => (
        <SimpleCube
          key={cube.id}
          position={cube.position}
          rotationMatrix={cube.rotationMatrix}
        />
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -5]} intensity={1} />
      <pointLight position={[5, -5, 5]} intensity={0.8} color="#ffffff" />
      
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 8]}
        near={0.1}
        far={1000}
      />

      <Suspense fallback={null}>
        <RubiksCube />
      </Suspense>
    </>
  );
}

export function RubiksCubeSceneV2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="absolute inset-0 z-0" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}