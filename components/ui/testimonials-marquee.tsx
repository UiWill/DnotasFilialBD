"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TestimonialAuthor {
  name: string
  company: string
  avatar?: string
}

interface Testimonial {
  text: string
  author: TestimonialAuthor
}

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[]
  className?: string
  title?: string
  description?: string
}

export function TestimonialsMarquee({ 
  testimonials, 
  className, 
  title = "O que nossos clientes dizem",
  description = "Confiança construída através de resultados excepcionais"
}: TestimonialsMarqueeProps) {
  return (
    <section className={cn(
      "bg-slate-950 py-24 text-white overflow-hidden",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 mb-6"
          >
            DEPOIMENTOS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <motion.div
              animate={{
                x: [0, -50 * testimonials.length + "%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-6 pr-6"
            >
              {/* Render testimonials twice for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-96 rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm"
                >
                  <div className="mb-6">
                    <p className="text-slate-200 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold">
                      {testimonial.author.avatar || testimonial.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.author.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {testimonial.author.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}