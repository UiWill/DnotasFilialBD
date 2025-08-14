"use client"

import React, { Suspense, useRef, useState, useEffect, forwardRef, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, Matrix4, Quaternion } from "three";
import * as THREE from 'three';

const RubiksCubeModel = forwardRef<any, any>((props, ref) => {
  const ANIMATION_DURATION = 1.2;
  const GAP = 0.01;
  const RADIUS = 0.075;
  
  const mainGroupRef = useRef<THREE.Group>(null);
  const isAnimatingRef = useRef(false);
  const currentRotationRef = useRef(0);
  const lastMoveAxisRef = useRef<string | null>(null);
  const currentMoveRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  
  const [size] = useState(0.6);
  const [cubes, setCubes] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  
  const reusableVec3 = useMemo(() => new Vector3(), []);
  const reusableMatrix4 = useMemo(() => new Matrix4(), []);
  const reusableQuaternion = useMemo(() => new Quaternion(), []);
  
  React.useImperativeHandle(ref, () => ({
    ...mainGroupRef.current,
    reset: resetCube
  }));

  const initializeCubes = useCallback(() => {
    const initial: any[] = [];
    const positions = [-1, 0, 1];
    
    for (let x of positions) {
      for (let y of positions) {
        for (let z of positions) {
          initial.push({
            position: new Vector3(x, y, z),
            rotationMatrix: new Matrix4().identity(),
            id: `cube-${x}-${y}-${z}`,
            originalCoords: { x, y, z }
          });
        }
      }
    }
    return initial;
  }, []);

  useEffect(() => {
    setCubes(initializeCubes());
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, [initializeCubes]);

  const resetCube = useCallback(() => {
    if (!isMountedRef.current) return;
    
    setCubes(initializeCubes());
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.set(0, 0, 0);
    }
    isAnimatingRef.current = false;
    currentRotationRef.current = 0;
    lastMoveAxisRef.current = null;
    currentMoveRef.current = null;
  }, [initializeCubes]);

  const possibleMoves = useMemo(() => {
    const moves: any[] = [];
    for (let axis of ['x', 'y', 'z']) {
      for (let layer of [-1, 0, 1]) {
        for (let direction of [1, -1]) {
          moves.push({ axis, layer, direction });
        }
      }
    }
    return moves;
  }, []);

  const isInLayer = useCallback((position: Vector3, axis: string, layer: number) => {
    const coord = axis === "x" ? position.x : axis === "y" ? position.y : position.z;
    return Math.abs(coord - layer) < 0.1;
  }, []);

  const selectNextMove = useCallback(() => {
    if (!isAnimatingRef.current && isVisible && isMountedRef.current) {
      const availableMoves = possibleMoves.filter(
        (move) => move.axis !== lastMoveAxisRef.current
      );
      
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const rotationAngle = Math.PI / 2;
            
      currentMoveRef.current = { ...move, rotationAngle };
      lastMoveAxisRef.current = move.axis;
      isAnimatingRef.current = true;
      currentRotationRef.current = 0;
    }
  }, [possibleMoves, isVisible]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextMove = () => {
      if (isVisible && isMountedRef.current) {
        const delay = isAnimatingRef.current ? ANIMATION_DURATION * 1000 : 500;
        
        timeoutId = setTimeout(
          () => {
            selectNextMove();
            if (isMountedRef.current) {
              scheduleNextMove();
            }
          },
          delay
        );
      }
    };

    scheduleNextMove();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, selectNextMove]);

  const createRotationMatrix = useCallback((axis: string, angle: number) => {
    reusableMatrix4.identity();
    reusableQuaternion.identity();
    reusableVec3.set(0, 0, 0);
    
    if (axis === 'x') reusableVec3.x = 1;
    else if (axis === 'y') reusableVec3.y = 1;
    else reusableVec3.z = 1;
    
    reusableQuaternion.setFromAxisAngle(reusableVec3, angle);
    return reusableMatrix4.makeRotationFromQuaternion(reusableQuaternion);
  }, [reusableMatrix4, reusableQuaternion, reusableVec3]);

  const easeInOutQuad = useCallback((t: number) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }, []);

  const matrixToQuaternion = useCallback((matrix: Matrix4) => {
    reusableQuaternion.setFromRotationMatrix(matrix);
    return reusableQuaternion.clone();
  }, [reusableQuaternion]);

  const updateCubes = useCallback((prevCubes: any[], move: any, stepRotationMatrix: Matrix4) => {
    return prevCubes.map((cube) => {
      if (isInLayer(cube.position, move.axis, move.layer)) {
        const tempVec3 = new Vector3(
          cube.position.x,
          cube.position.y,
          cube.position.z
        );

        tempVec3.applyMatrix4(stepRotationMatrix);

        const newRotationMatrix = new Matrix4().multiplyMatrices(
          stepRotationMatrix,
          cube.rotationMatrix
        );

        return {
          ...cube,
          position: tempVec3,
          rotationMatrix: newRotationMatrix,
        };
      }
      return cube;
    });
  }, [isInLayer]);

  useFrame((state, delta) => {
    if (!isVisible || !isMountedRef.current) return;

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.x += delta * 0.2;
      mainGroupRef.current.rotation.y += delta * 0.3;
      mainGroupRef.current.rotation.z += delta * 0.1;
    }

    if (isAnimatingRef.current && currentMoveRef.current) {
      const move = currentMoveRef.current;
      const targetRotation = move.rotationAngle;
      const rotation = delta / ANIMATION_DURATION;

      if (currentRotationRef.current < 1) {
        const newRotation = Math.min(currentRotationRef.current + rotation, 1);
        const prevRotation = currentRotationRef.current;
        currentRotationRef.current = newRotation;

        const easedProgress = easeInOutQuad(newRotation);
        const prevEasedProgress = easeInOutQuad(prevRotation);
        const currentAngle = easedProgress * targetRotation;
        const prevAngle = prevEasedProgress * targetRotation;
        const stepRotation = currentAngle - prevAngle;

        const stepRotationMatrix = createRotationMatrix(
          move.axis,
          stepRotation * move.direction
        );

        if (isMountedRef.current) {
          setCubes((prevCubes) => {
            const updatedCubes = updateCubes(prevCubes, move, stepRotationMatrix);
            
            if (newRotation >= 1) {
              isAnimatingRef.current = false;
              currentRotationRef.current = 0;
              currentMoveRef.current = null;
            }
            
            return updatedCubes;
          });
        }
      }
    }
  });

  const cubeMaterial = useMemo(() => ({
    color: '#2563eb',
    metalness: 0.7,
    roughness: 0.3,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    reflectivity: 0.8,
    envMapIntensity: 2
  }), []);

  const sharedMaterial = useMemo(() => (
    <meshPhysicalMaterial {...cubeMaterial} />
  ), [cubeMaterial]);

  return (
    <group ref={mainGroupRef} {...props}>
      {cubes.map((cube) => (
        <group
          key={cube.id}
          position={[
            cube.position.x * (size + GAP),
            cube.position.y * (size + GAP),
            cube.position.z * (size + GAP),
          ]}
          quaternion={matrixToQuaternion(cube.rotationMatrix)}
        >
          <RoundedBox
            args={[size, size, size]}
            radius={RADIUS}
            smoothness={4}
          >
            {sharedMaterial}
          </RoundedBox>
        </group>
      ))}
    </group>
  );
});

RubiksCubeModel.displayName = "RubiksCubeModel";

function CameraController() {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} />
      <pointLight position={[5, -5, 5]} intensity={0.6} color="#ffffff" />
      
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 6]}
        near={0.1}
        far={1000}
      />

      <CameraController />

      <Suspense fallback={<mesh><boxGeometry args={[1,1,1]} /><meshBasicMaterial color="blue" /></mesh>}>
        <RubiksCubeModel position={[0, 0, 0]} scale={1.5} />
      </Suspense>
    </>
  );
}

export function RubiksCubeScene() {
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