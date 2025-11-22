'use client'

import { Shield, Zap, Globe, Cpu } from 'lucide-react'

export function WhyUAP() {
  return (
    <section className="py-32 px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Why UAP?</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Built on advanced cryptographic primitives to ensure security, privacy, and scalability for the autonomous future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Cryptographic Security",
              desc: "End-to-end encryption for all fleet communications and transaction data."
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Real-time coordination with sub-millisecond latency across the global network."
            },
            {
              icon: Globe,
              title: "Global Coverage",
              desc: "Distributed node infrastructure ensuring 99.99% uptime worldwide."
            },
            {
              icon: Cpu,
              title: "AI Optimized",
              desc: "Machine learning algorithms optimize route planning and resource allocation."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
