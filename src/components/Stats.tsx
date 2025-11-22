'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Miles Driven', value: '2.4M+', change: '+12% this week' },
  { label: 'Active Nodes', value: '8,420', change: '+5% this week' },
  { label: 'Network Treasury', value: '$14.2M', change: '+2.1% this week' },
  { label: 'Transactions', value: '145K', change: '+18% this week' },
]

export function Stats() {
  return (
    <section className="py-20 border-y border-white/5 bg-zinc-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="text-zinc-500 text-sm font-mono mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-emerald-500 text-xs font-medium bg-emerald-500/10 inline-block px-2 py-1 rounded-full">
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
