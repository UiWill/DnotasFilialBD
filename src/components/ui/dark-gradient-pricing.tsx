"use client"

import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  popular?: boolean
  setupFee?: string
  ctaText: string
  ctaLink: string
  badge?: string
  urgency?: string
  discount?: string
}

interface DarkGradientPricingProps {
  plans: PricingPlan[]
  className?: string
}

export function DarkGradientPricing({ plans, className }: DarkGradientPricingProps) {
  return (
    <div className={cn(
      "relative overflow-hidden py-24",
      className
    )}>
      
      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10",
                plan.popular && "border-white/30 ring-1 ring-white/20 scale-105"
              )}
            >
              {(plan.popular || plan.badge) && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className={cn(
                    "rounded-full px-4 py-1 text-sm font-semibold",
                    plan.popular 
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      : "bg-white text-black"
                  )}>
                    {plan.badge || "MAIS POPULAR"}
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-3">{plan.name}</h3>
                <p className="text-slate-400 text-lg mb-6">{plan.description}</p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-400 text-2xl">R$</span>
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-2xl">/{plan.period}</span>
                </div>

                {plan.discount && (
                  <div className="mt-3 inline-block bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg px-3 py-1">
                    <span className="text-green-400 text-sm font-semibold">💰 {plan.discount}</span>
                  </div>
                )}

                {plan.urgency && (
                  <div className="mt-3">
                    <span className="text-orange-400 text-sm font-semibold animate-pulse">{plan.urgency}</span>
                  </div>
                )}
              </div>
              
              <div className="mb-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-4">
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full mt-1 flex-shrink-0",
                      feature.included
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700/50 text-slate-500"
                    )}>
                      {feature.included ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </div>
                    <span className={cn(
                      "text-lg leading-relaxed",
                      feature.included ? "text-slate-200" : "text-slate-500"
                    )}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {plan.setupFee && (
                <div className="mb-6 rounded-lg bg-slate-800/50 border border-slate-700/30 p-5">
                  <p className="text-slate-300 text-lg font-semibold">
                    Taxa de adesão: {plan.setupFee}
                  </p>
                </div>
              )}
              
              <motion.a
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "block w-full rounded-lg px-8 py-4 text-center text-lg font-bold transition-all duration-200",
                  plan.popular
                    ? "bg-white text-black hover:bg-slate-200 shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30"
                )}
              >
                {plan.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}