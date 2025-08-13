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
}

interface DarkGradientPricingProps {
  plans: PricingPlan[]
  className?: string
}

export function DarkGradientPricing({ plans, className }: DarkGradientPricingProps) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24",
      className
    )}>
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-blue-500/10",
                plan.popular && "border-blue-500/50 ring-1 ring-blue-500/20 scale-105"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-4 py-1 text-sm font-semibold text-white">
                    MAIS POPULAR
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-400 text-lg">R$</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-lg">/{plan.period}</span>
                </div>
              </div>
              
              <div className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full",
                      feature.included
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700/50 text-slate-500"
                    )}>
                      {feature.included ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      feature.included ? "text-slate-200" : "text-slate-500"
                    )}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {plan.setupFee && (
                <div className="mb-6 rounded-lg bg-slate-800/50 border border-slate-700/30 p-4">
                  <p className="text-slate-400 text-sm">
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
                  "block w-full rounded-lg px-6 py-3 text-center font-semibold transition-all duration-200",
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                    : "bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50"
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