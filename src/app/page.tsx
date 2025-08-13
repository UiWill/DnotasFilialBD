"use client"

// import { useState } from "react"
import { DarkGradientPricing } from "@/components/ui/dark-gradient-pricing"
import { TestimonialsMarquee } from "@/components/ui/testimonials-marquee"
// import { GlowingCard, GlowingBadge, GlowingButton, GlowingText } from "@/components/ui/glowing-effect"
import { motion } from "framer-motion"
import { FileText, CreditCard, Shield, Package, Phone, Mail, Building } from "lucide-react"

export default function Home() {

  const pricingPlans = [
    {
      name: "Emissão de Notas Fiscais",
      price: "125",
      period: "mês",
      description: "Perfeito para começar",
      setupFee: "R$ 125,00 (única vez)",
      features: [
        { name: "Emissão de até 4 notas fiscais", included: true },
        { name: "R$ 20,00 por cada nota fiscal adicional", included: true },
        { name: "Suporte via WhatsApp", included: true },
      ],
      ctaText: "Contratar Plano",
      ctaLink: "https://wa.me/5531991555222?text=Olá! Quero contratar o plano de Emissão de Notas Fiscais por R$ 125/mês."
    },
    {
      name: "BPO Fiscal Completo",
      price: "375",
      period: "mês",
      description: "Solução completa para crescer",
      setupFee: "R$ 525,00 (única vez)",
      popular: true,
      features: [
        { name: "Emissão ILIMITADA de notas fiscais", included: true },
        { name: "BPO fiscal completo com especialistas", included: true },
        { name: "Consultoria tributária especializada", included: true },
        { name: "Suporte prioritário 24h", included: true },
        { name: "Portal exclusivo para contador", included: true }
      ],
      ctaText: "Contratar Agora",
      ctaLink: "https://wa.me/5531991555222?text=Olá! Quero contratar o plano COMPLETO de BPO Fiscal por R$ 375/mês."
    }
  ]

  const testimonials = [
    {
      text: "Desde que contratei a Dnotas, nunca mais tive problemas com notas fiscais. Equipe muito profissional!",
      author: { name: "Maria Silva", company: "Loja do Centro" }
    },
    {
      text: "Excelente serviço! Agora posso focar 100% nas vendas sem me preocupar com burocracia fiscal.",
      author: { name: "João Santos", company: "Mercado Bom Despacho" }
    },
    {
      text: "Profissionalismo e agilidade que eu precisava. Recomendo a Dnotas para qualquer empresário.",
      author: { name: "Ana Costa", company: "Farmácia Central" }
    },
    {
      text: "Serviço impecável! Zero erros nas notas fiscais e suporte sempre disponível quando preciso.",
      author: { name: "Carlos Oliveira", company: "Auto Peças MG" }
    },
    {
      text: "A melhor decisão que tomei foi terceirizar minhas notas fiscais com a Dnotas. Resultado garantido!",
      author: { name: "Lucia Ferreira", company: "Boutique Elegante" }
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mt-64">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white tracking-tight"
            >
              DNOTAS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Serviço completo de emissão de <strong>NF-e, NFC-e e NFS-e</strong> com total conformidade.
              <br />
              <span className="font-semibold">Você vende, nós emitimos suas notas fiscais.</span>
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-40"
            >
              <motion.a
                href="https://wa.me/5531991555222?text=Olá! Quero conhecer os serviços da Dnotas!"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-white text-black rounded-lg hover:bg-slate-200 transition-all shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Falar com especialista
              </motion.a>
              
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white border border-white/30 rounded-lg hover:border-white/50 hover:bg-white/5 transition-all"
              >
                Conhecer serviços
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
            >
              {[
                { number: "1000+", label: "Notas emitidas por mês" },
                { number: "98%", label: "Clientes satisfeitos" },
                { number: "15+", label: "Anos no mercado" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm mb-6">
              SOBRE NÓS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Por que escolher a <span className="text-white font-bold">DNOTAS</span>?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Somos especialistas em emissão de notas fiscais com mais de 15 anos de experiência no mercado. 
              Nossa missão é eliminar o retrabalho e garantir 100% de conformidade fiscal para sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Conformidade Total",
                description: "Zero erros, máxima segurança",
                color: "green" as const
              },
              {
                icon: Phone,
                title: "Resposta Rápida",
                description: "Suporte em até 10 minutos",
                color: "purple" as const
              },
              {
                icon: Building,
                title: "Consultoria Especializada",
                description: "Soluções personalizadas para seu negócio",
                color: "orange" as const
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 text-center h-full border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm mb-6">
              NOSSOS SERVIÇOS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Soluções completas para sua empresa
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Tenha mais liberdade para focar no que realmente importa: <strong className="text-white">suas vendas</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "Emissão de Notas Fiscais",
                description: "NF-e, NFC-e e NFS-e com total agilidade e precisão. Conformidade garantida em todos os processos.",
                features: ["NF-e", "NFC-e", "NFS-e"]
              },
              {
                icon: CreditCard,
                title: "Conciliação de Vendas",
                description: "Conferência automática de vendas cartão e PIX. Controle total sobre suas receitas e movimentações.",
                features: ["Cartão", "PIX", "Relatórios"]
              },
              {
                icon: Shield,
                title: "Substituição Tributária",
                description: "Conferência especializada em ST. Evite problemas fiscais com nossa expertise técnica.",
                features: ["ST", "Compliance", "Auditoria"]
              },
              {
                icon: Package,
                title: "Controle de Estoque",
                description: "Conferência do estoque contábil. Dados precisos para decisões estratégicas do seu negócio.",
                features: ["Estoque", "Relatórios", "Análises"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 h-full border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 text-sm bg-white/10 text-white border border-white/20 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsMarquee testimonials={testimonials} />

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm mb-6">
              PLANOS E PREÇOS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Escolha o plano ideal para seu negócio
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Transparência total, sem surpresas
            </p>
          </div>
        </div>
        <DarkGradientPricing plans={pricingPlans} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm mb-6">
              ENTRE EM CONTATO
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Vamos conversar sobre seu negócio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: Phone,
                title: "WhatsApp",
                content: "(31) 99155-5222"
              },
              {
                icon: Mail,
                title: "E-mail",
                content: "comercial@dnotas.com.br"
              },
              {
                icon: Building,
                title: "CNPJ",
                content: "50.001.362/0001-75"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 text-center h-full border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{contact.title}</h3>
                  <p className="text-slate-300 whitespace-pre-line">{contact.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-black text-white">DNOTAS</h3>
              <p className="text-slate-400 mt-2">Bom Despacho - MG</p>
            </div>
            <div className="mb-4">
              <p className="text-slate-400 text-sm">
                Rua Doutor Miguel Gontijo, 181/ap 304<br />
                Centro - Bom Despacho-MG<br />
                CEP: 35630-016
              </p>
            </div>
            <p className="text-slate-500">
              &copy; 2025 Dnotas Bom Despacho. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <motion.a
        href="https://wa.me/5531991555222?text=Olá! Vi o site da Dnotas e gostaria de mais informações sobre os serviços."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all">
          <Phone className="w-8 h-8 text-white" />
        </div>
      </motion.a>
    </div>
  )
}
