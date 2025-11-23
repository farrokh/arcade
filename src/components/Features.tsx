'use client'

import { motion } from 'framer-motion'
import { Network, Users } from 'lucide-react'


export function Features() {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
            System Architecture
          </h2>
          <p className="text-zinc-400 max-w-xl text-lg mx-auto md:mx-0">
            A decentralized network built for scale, security, and speed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:row-span-2 p-10 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="text-sm font-mono text-purple-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                03. COMPOUND
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Network Effects</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Leverage recursive rewards. Earn from your entire downstream network, up to 10 levels deep.
              </p>
            </div>
            
            <div className="mt-8 h-48 w-full bg-gradient-to-t from-purple-500/10 to-transparent rounded-xl border border-purple-500/10 relative overflow-hidden group-hover:border-purple-500/30 transition-colors">
               <div className="absolute inset-0 flex items-center justify-center">
                 <Network className="w-16 h-16 text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-500" />
               </div>
            </div>
          </motion.div>

          {/* Feature 1: Initialize (Wide, Top Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 p-10 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="text-sm font-mono text-cyan-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                01. INITIALIZE
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Instant Access</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Connect your fleet in seconds. Receive 100 miles of network credit immediately upon protocol activation.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Feature 2: Expand (Wide, Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 p-10 rounded-3xl bg-white text-black border border-white/10 group relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-sm font-mono text-zinc-600 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                02. EXPAND
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-zinc-700 transition-colors">Direct Growth</h3>
              <p className="text-zinc-700 text-lg leading-relaxed max-w-md">
               Earn 50 miles for every direct invitation. Each accepted invite initializes a new node in your fleet hierarchy.
              </p>
            </div>
            <div className="absolute right-10 bottom-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <Users className="w-24 h-24" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
