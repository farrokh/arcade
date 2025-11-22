import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      
      <section id="how-it-works" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Viral <span className="text-cyan-400">Velocity</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sign Up",
                desc: "Get 100 miles of autonomous driving credit instantly when you join.",
                step: "01"
              },
              {
                title: "Invite Friends",
                desc: "Earn 50 miles for every friend who joins using your unique code.",
                step: "02"
              },
              {
                title: "Earn Forever",
                desc: "Get recursive credits when your friends invite their friends. The chain never stops.",
                step: "03"
              }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors group">
                <div className="absolute -top-6 left-8 text-6xl font-bold text-white/5 group-hover:text-cyan-500/10 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">
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
