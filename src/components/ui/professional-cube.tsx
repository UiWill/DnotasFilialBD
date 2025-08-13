"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, useHelper } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { SpotLight, useDepthBuffer } from '@react-three/drei'
import * as THREE from 'three'
import React, { Suspense, useRef, useState, useEffect, forwardRef, useMemo, useCallback } from "react"
import { Vector3, Matrix4, Quaternion } from "three"
import { RoundedBox } from "@react-three/drei"

const RubiksCubeModel = forwardRef<any, any>((props, ref) => {
  const ANIMATION_DURATION = 1.2
  const GAP = 0.01
  const RADIUS = 0.075
  
  const mainGroupRef = useRef<THREE.Group>()
  const isAnimatingRef = useRef(false)
  const currentRotationRef = useRef(0)
  const lastMoveAxisRef = useRef<string | null>(null)
  const currentMoveRef = useRef<any>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)
  
  const isResizingRef = useRef(false)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const [size] = useState(0.8)
  const [cubes, setCubes] = useState<any[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [deviceSettings] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    return {
      smoothness: isMobile ? 2 : 4,
      castShadow: !isMobile,
      receiveShadow: !isMobile
    }
  })
  
  const reusableVec3 = useMemo(() => new Vector3(), [])
  const reusableMatrix4 = useMemo(() => new Matrix4(), [])
  const reusableQuaternion = useMemo(() => new Quaternion(), [])
  
  React.useImperativeHandle(ref, () => ({
    ...mainGroupRef.current,
    reset: resetCube
  }))

  const initializeCubes = useCallback(() => {
    const initial = []
    const positions = [-1, 0, 1]
    
    for (let x of positions) {
      for (let y of positions) {
        for (let z of positions) {
          initial.push({
            position: new Vector3(x, y, z),
            rotationMatrix: new Matrix4().identity(),
            id: `cube-${x}-${y}-${z}`,
            originalCoords: { x, y, z }
          })
        }
      }
    }
    return initial
  }, [])

  useEffect(() => {
    setCubes(initializeCubes())
    isMountedRef.current = true
    
    return () => {
      isMountedRef.current = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
        resizeTimeoutRef.current = null
      }
    }
  }, [initializeCubes])

  const resetCube = useCallback(() => {
    if (!isMountedRef.current) return
    
    setCubes(initializeCubes())
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.set(0, 0, 0)
    }
    isAnimatingRef.current = false
    currentRotationRef.current = 0
    lastMoveAxisRef.current = null
    currentMoveRef.current = null
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [initializeCubes])

  const possibleMoves = useMemo(() => {
    const moves: any[] = []
    for (let axis of ['x', 'y', 'z']) {
      for (let layer of [-1, 0, 1]) {
        for (let direction of [1, -1]) {
          moves.push({ axis, layer, direction })
        }
      }
    }
    return moves
  }, [])

  const isInLayer = useCallback((position: Vector3, axis: string, layer: number) => {
    const coord = axis === "x" ? position.x : axis === "y" ? position.y : position.z
    return Math.abs(coord - layer) < 0.1
  }, [])

  const selectNextMove = useCallback(() => {
    if (!isAnimatingRef.current && isVisible && isMountedRef.current && !isResizingRef.current) {
      const availableMoves = possibleMoves.filter(
        (move) => move.axis !== lastMoveAxisRef.current
      )
      
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)]
      const rotationAngle = Math.PI / 2
            
      currentMoveRef.current = { ...move, rotationAngle }
      lastMoveAxisRef.current = move.axis
      isAnimatingRef.current = true
      currentRotationRef.current = 0
    }
  }, [possibleMoves, isVisible])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const scheduleNextMove = () => {
      if (isVisible && isMountedRef.current && !isResizingRef.current) {
        const delay = isAnimatingRef.current ? ANIMATION_DURATION * 1000 : 200
        
        timeoutId = setTimeout(
          () => {
            selectNextMove()
            if (isMountedRef.current) {
              scheduleNextMove()
            }
          },
          delay
        )
      }
    }

    scheduleNextMove()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isVisible, selectNextMove])

  const createRotationMatrix = useCallback((axis: string, angle: number) => {
    reusableMatrix4.identity()
    reusableQuaternion.identity()
    reusableVec3.set(0, 0, 0)
    
    if (axis === 'x') reusableVec3.x = 1
    else if (axis === 'y') reusableVec3.y = 1
    else reusableVec3.z = 1
    
    reusableQuaternion.setFromAxisAngle(reusableVec3, angle)
    return reusableMatrix4.makeRotationFromQuaternion(reusableQuaternion)
  }, [reusableMatrix4, reusableQuaternion, reusableVec3])

  const easeInOutQuad = useCallback((t: number) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  }, [])

  const matrixToQuaternion = useCallback((matrix: Matrix4) => {
    reusableQuaternion.setFromRotationMatrix(matrix)
    return reusableQuaternion.clone()
  }, [reusableQuaternion])

  const normalizePositions = useCallback((cubes: any[]) => {
    return cubes.map(cube => {
      const x = Math.round(cube.position.x)
      const y = Math.round(cube.position.y)
      const z = Math.round(cube.position.z)
      
      const newPosition = 
        (Math.abs(cube.position.x - x) > 0.001 || 
         Math.abs(cube.position.y - y) > 0.001 || 
         Math.abs(cube.position.z - z) > 0.001) 
          ? new Vector3(x, y, z) 
          : cube.position
      
      return {
        ...cube,
        position: newPosition
      }
    })
  }, [])

  const updateCubes = useCallback((prevCubes: any[], move: any, stepRotationMatrix: Matrix4) => {
    return prevCubes.map((cube) => {
      if (isInLayer(cube.position, move.axis, move.layer)) {
        const tempVec3 = new Vector3(
          cube.position.x,
          cube.position.y,
          cube.position.z
        )

        tempVec3.applyMatrix4(stepRotationMatrix)

        const newRotationMatrix = new Matrix4().multiplyMatrices(
          stepRotationMatrix,
          cube.rotationMatrix
        )

        return {
          ...cube,
          position: tempVec3,
          rotationMatrix: newRotationMatrix,
        }
      }
      return cube
    })
  }, [isInLayer])

  useFrame((state, delta) => {
    if (!isVisible || !isMountedRef.current) return

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.x += delta * 0.3
      mainGroupRef.current.rotation.y += delta * 0.5
      mainGroupRef.current.rotation.z += delta * 0.2
    }

    if (isAnimatingRef.current && currentMoveRef.current) {
      const move = currentMoveRef.current
      const targetRotation = move.rotationAngle
      const rotation = delta / ANIMATION_DURATION

      if (currentRotationRef.current < 1) {
        const newRotation = Math.min(currentRotationRef.current + rotation, 1)
        const prevRotation = currentRotationRef.current
        currentRotationRef.current = newRotation

        const easedProgress = easeInOutQuad(newRotation)
        const prevEasedProgress = easeInOutQuad(prevRotation)
        const currentAngle = easedProgress * targetRotation
        const prevAngle = prevEasedProgress * targetRotation
        const stepRotation = currentAngle - prevAngle

        const stepRotationMatrix = createRotationMatrix(
          move.axis,
          stepRotation * move.direction
        )

        if (isMountedRef.current && !isResizingRef.current) {
          setCubes((prevCubes) => {
            const updatedCubes = updateCubes(prevCubes, move, stepRotationMatrix)
            
            if (newRotation >= 1) {
              const normalizedCubes = normalizePositions(updatedCubes)
              isAnimatingRef.current = false
              currentRotationRef.current = 0
              currentMoveRef.current = null
              return normalizedCubes
            }
            
            return updatedCubes
          })
        }
      }
    }
  })

  const chromeMaterial = useMemo(() => ({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    reflectivity: 0.8,
    envMapIntensity: 1
  }), [])

  const sharedMaterial = useMemo(() => (
    <meshPhysicalMaterial {...chromeMaterial} />
  ), [chromeMaterial])

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
            smoothness={deviceSettings.smoothness}
            castShadow={deviceSettings.castShadow}
            receiveShadow={deviceSettings.receiveShadow}
          >
            {sharedMaterial}
          </RoundedBox>
        </group>
      ))}
    </group>
  )
})

RubiksCubeModel.displayName = 'RubiksCubeModel'

function CameraController() {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

function EnhancedSpotlight(props: any) {
  const light = useRef<THREE.SpotLight>()
  
  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(0, 0, 0)
      light.current.target.updateMatrixWorld()
    }
  }, [])
  
  return (
    <SpotLight 
      castShadow={false}
      ref={light} 
      {...props} 
    />
  )
}

function SceneContent() {
  const depthBuffer = useDepthBuffer({ 
    size: 2048,
    frames: 1,
  })
  
  return (
    <>
      <EnhancedSpotlight 
        depthBuffer={depthBuffer} 
        color="#ffffff" 
        position={[3, 3, 2]}
        volumetric={false}
        opacity={1}
        penumbra={1}
        distance={17}
        angle={0.8}
        attenuation={30}
        anglePower={6}
        intensity={2}
        shadowMapSize={2048}
        shadowBias={-0.0001}
        shadowAutoUpdate={true}
        castShadow={true}
      />
      
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 7]}
        near={0.1}
        far={1000}
      />

      <CameraController />

      <Suspense fallback={null}>
        <RubiksCubeModel position={[0, 0, 0]} scale={1} />
      </Suspense>
    </>
  )
}

interface ProfessionalCubeProps {
  onComplete?: () => void
  className?: string
}

export function ProfessionalCube({ onComplete, className }: ProfessionalCubeProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)

    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 4000)

    return () => {
      window.removeEventListener("resize", checkIsDesktop)
      clearTimeout(timer)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 z-50 bg-black ${className}`}>
      <div className="absolute inset-0">
        <Canvas
          shadows
          gl={{
            antialias: isDesktop,
            preserveDrawingBuffer: isDesktop,
            powerPreference: isDesktop ? "high-performance" : "default",
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
          }}
        >
          <SceneContent />
        </Canvas>
      </div>
      
      {/* Logo DNOTAS */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center mb-8">
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-widest mb-4">
            DNOTAS
          </h1>
          <p className="text-white/60 text-xl md:text-2xl font-light">
            Bom Despacho - MG
          </p>
        </div>
        
        {/* Loading indicator */}
        <div className="flex space-x-2 mt-12">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}