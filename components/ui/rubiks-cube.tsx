"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RubiksCubeProps {
  onComplete?: () => void
  className?: string
}

export function RubiksCube({ onComplete, className }: RubiksCubeProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black",
      className
    )}>
      <div className="text-center">
        <div className="relative">
          {/* 3D Cube */}
          <motion.div
            className="mx-auto mb-8"
            style={{
              perspective: "1000px",
              width: "120px",
              height: "120px"
            }}
            animate={{
              rotateY: [0, 90, 180, 270, 360],
              rotateX: [0, 90, 0, -90, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div
              className="relative"
              style={{
                width: "120px",
                height: "120px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Cube faces */}
              {[
                { face: "front", letter: "D", transform: "rotateY(0deg) translateZ(60px)" },
                { face: "back", letter: "N", transform: "rotateY(180deg) translateZ(60px)" },
                { face: "right", letter: "O", transform: "rotateY(90deg) translateZ(60px)" },
                { face: "left", letter: "T", transform: "rotateY(-90deg) translateZ(60px)" },
                { face: "top", letter: "A", transform: "rotateX(90deg) translateZ(60px)" },
                { face: "bottom", letter: "S", transform: "rotateX(-90deg) translateZ(60px)" }
              ].map(({ face, letter, transform }) => (
                <div
                  key={face}
                  className="absolute flex items-center justify-center w-32 h-32 border-2 border-white/20 bg-gradient-to-br from-blue-500 to-green-500"
                  style={{ transform }}
                >
                  <motion.span
                    className="text-4xl font-black text-white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  >
                    {letter}
                  </motion.span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl font-black text-white mb-4 tracking-wider"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            DNOTAS
          </motion.h1>
          <motion.p
            className="text-slate-400 text-lg"
            animate={{
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            Carregando experiência profissional...
          </motion.p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}