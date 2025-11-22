import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      
      <section id="how-it-works" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-white">
              Accelerated Growth
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg font-light">
              A referral system designed for exponential scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Initialize",
                desc: "Receive 100 miles of credit immediately upon account activation.",
                step: "01"
              },
              {
                title: "Expand",
                desc: "Grant 50 miles for every direct invitation accepted.",
                step: "02"
              },
              {
                title: "Compound",
                desc: "Accumulate recursive credits through your extended network.",
                step: "03"
              }
            ].map((item, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-all duration-500">
                <div className="text-xs font-medium text-zinc-600 mb-6 tracking-widest">{item.step}</div>
                <h3 className="text-xl font-medium mb-3 text-white group-hover:text-zinc-200 transition-colors">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
