import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { getUser, getCredits } from '@/lib/dal'

export default async function Home() {
  const user = await getUser()
  const mileage = user ? await getCredits(user.id) : 0

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero user={user} mileage={mileage} />
      
      <section id="how-it-works" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
              System Architecture
            </h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              A decentralized network built for scale, security, and speed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 p-10 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors">
              <div className="text-sm font-mono text-cyan-500 mb-4">01. INITIALIZE</div>
              <h3 className="text-3xl font-bold text-white mb-4">Instant Access</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Connect your fleet in seconds. Receive 100 miles of network credit immediately upon protocol activation.
              </p>
            </div>

            {/* Tall Card */}
            <div className="md:row-span-2 p-10 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
              <div>
                <div className="text-sm font-mono text-purple-500 mb-4">03. COMPOUND</div>
                <h3 className="text-3xl font-bold text-white mb-4">Network Effects</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Leverage recursive rewards. Earn from your entire downstream network, up to 10 levels deep.
                </p>
              </div>
              <div className="mt-8 h-32 bg-gradient-to-t from-purple-500/20 to-transparent rounded-xl" />
            </div>

            {/* Medium Card */}
            <div className="md:col-span-2 p-10 rounded-3xl bg-white text-black border border-white/10">
              <div className="text-sm font-mono text-zinc-600 mb-4">02. EXPAND</div>
              <h3 className="text-3xl font-bold mb-4">Direct Growth</h3>
              <p className="text-zinc-700 text-lg leading-relaxed">
                Grant 50 miles for every direct invitation accepted. Build your fleet hierarchy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
