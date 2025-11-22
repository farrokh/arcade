'use client'

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
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Large Card */}
          <div className="md:col-span-2 p-10 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors group">
            <div className="text-sm font-mono text-cyan-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              01. INITIALIZE
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Instant Access</h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Connect your fleet in seconds. Receive 100 miles of network credit immediately upon protocol activation.
            </p>
          </div>

          {/* Tall Card */}
          <div className="md:row-span-2 p-10 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between group">
            <div>
              <div className="text-sm font-mono text-purple-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                03. COMPOUND
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Network Effects</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Leverage recursive rewards. Earn from your entire downstream network, up to 10 levels deep.
              </p>
            </div>
            <div className="mt-8 h-32 bg-gradient-to-t from-purple-500/20 to-transparent rounded-xl border-b border-purple-500/20" />
          </div>

          {/* Medium Card */}
          <div className="md:col-span-2 p-10 rounded-3xl bg-white text-black border border-white/10 group">
            <div className="text-sm font-mono text-zinc-600 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-900" />
              02. EXPAND
            </div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-zinc-700 transition-colors">Direct Growth</h3>
            <p className="text-zinc-700 text-lg leading-relaxed">
              Grant 50 miles for every direct invitation accepted. Build your fleet hierarchy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
