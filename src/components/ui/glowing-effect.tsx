"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlowingCardProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "green" | "purple" | "orange"
}

export function GlowingCard({ children, className, glowColor = "blue" }: GlowingCardProps) {
  const glowColors = {
    blue: "hover:shadow-blue-500/25 hover:border-blue-500/50",
    green: "hover:shadow-green-500/25 hover:border-green-500/50", 
    purple: "hover:shadow-purple-500/25 hover:border-purple-500/50",
    orange: "hover:shadow-orange-500/25 hover:border-orange-500/50"
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl",
        glowColors[glowColor],
        className
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-5",
          glowColor === "blue" && "from-blue-500 to-cyan-500",
          glowColor === "green" && "from-green-500 to-emerald-500",
          glowColor === "purple" && "from-purple-500 to-pink-500",
          glowColor === "orange" && "from-orange-500 to-red-500"
        )} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
            glowColor === "blue" ? "rgba(59, 130, 246, 0.1)" :
            glowColor === "green" ? "rgba(34, 197, 94, 0.1)" :
            glowColor === "purple" ? "rgba(168, 85, 247, 0.1)" :
            "rgba(249, 115, 22, 0.1)"
          }, transparent 40%)`
        }}
      />
    </motion.div>
  )
}

interface GlowingBadgeProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "green" | "purple" | "orange"
}

export function GlowingBadge({ children, className, glowColor = "blue" }: GlowingBadgeProps) {
  const badgeColors = {
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-400 shadow-blue-500/20",
    green: "bg-green-500/20 border-green-500/30 text-green-400 shadow-green-500/20",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-400 shadow-purple-500/20",
    orange: "bg-orange-500/20 border-orange-500/30 text-orange-400 shadow-orange-500/20"
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300",
        badgeColors[glowColor],
        className
      )}
    >
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface GlowingButtonProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "green" | "purple" | "orange"
  onClick?: () => void
  href?: string
}

export function GlowingButton({ children, className, glowColor = "blue", onClick, href }: GlowingButtonProps) {
  const buttonColors = {
    blue: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/25 hover:shadow-blue-500/40",
    green: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/25 hover:shadow-green-500/40",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/25 hover:shadow-purple-500/40",
    orange: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-500/25 hover:shadow-orange-500/40"
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl",
        buttonColors[glowColor],
        className
      )}
    >
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </Component>
  )
}

interface GlowingTextProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "green" | "purple" | "orange"
}

export function GlowingText({ children, className, glowColor = "blue" }: GlowingTextProps) {
  const textColors = {
    blue: "bg-gradient-to-r from-blue-400 to-cyan-400",
    green: "bg-gradient-to-r from-green-400 to-emerald-400",
    purple: "bg-gradient-to-r from-purple-400 to-pink-400",
    orange: "bg-gradient-to-r from-orange-400 to-red-400"
  }

  return (
    <motion.span
      className={cn(
        "bg-clip-text text-transparent font-bold",
        textColors[glowColor],
        className
      )}
      style={{
        filter: `drop-shadow(0 0 10px ${
          glowColor === "blue" ? "rgba(59, 130, 246, 0.3)" :
          glowColor === "green" ? "rgba(34, 197, 94, 0.3)" :
          glowColor === "purple" ? "rgba(168, 85, 247, 0.3)" :
          "rgba(249, 115, 22, 0.3)"
        })`
      }}
      animate={{
        filter: [
          `drop-shadow(0 0 10px ${
            glowColor === "blue" ? "rgba(59, 130, 246, 0.3)" :
            glowColor === "green" ? "rgba(34, 197, 94, 0.3)" :
            glowColor === "purple" ? "rgba(168, 85, 247, 0.3)" :
            "rgba(249, 115, 22, 0.3)"
          })`,
          `drop-shadow(0 0 20px ${
            glowColor === "blue" ? "rgba(59, 130, 246, 0.5)" :
            glowColor === "green" ? "rgba(34, 197, 94, 0.5)" :
            glowColor === "purple" ? "rgba(168, 85, 247, 0.5)" :
            "rgba(249, 115, 22, 0.5)"
          })`,
          `drop-shadow(0 0 10px ${
            glowColor === "blue" ? "rgba(59, 130, 246, 0.3)" :
            glowColor === "green" ? "rgba(34, 197, 94, 0.3)" :
            glowColor === "purple" ? "rgba(168, 85, 247, 0.3)" :
            "rgba(249, 115, 22, 0.3)"
          })`
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  )
}