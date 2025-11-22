import { getUser, getCredits, getTransactions } from '@/lib/dal'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Stats } from '@/components/Stats'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield, Zap, Globe, Cpu } from 'lucide-react'

export default async function Home() {
  const user = await getUser()
  const mileage = user ? await getCredits(user.id) : 0
  const transactions = user ? await getTransactions(user.id) : []

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero user={user} mileage={mileage} transactions={transactions} />
      
      <Stats />

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

      {/* Why UAP Section */}
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

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            Ready to join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              future of mobility?
            </span>
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Start earning miles today and be part of the largest decentralized autonomous fleet network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="h-14 px-10 rounded-full bg-white hover:bg-zinc-200 text-black text-lg font-semibold tracking-wide transition-all w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="h-14 px-10 rounded-full border-white/20 hover:bg-white/10 text-white text-lg font-medium backdrop-blur-sm transition-all w-full sm:w-auto">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
