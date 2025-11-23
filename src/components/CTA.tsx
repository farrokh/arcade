import Link from 'next/link'
import { Button } from './ui/button'

export function CTA() {
  return (
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
          <Link href="/">
            <Button className="h-14 px-10 rounded-full bg-white hover:bg-zinc-200 text-black text-lg font-semibold tracking-wide transition-all w-full sm:w-auto">
              Get Started Now
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="h-14 px-10 rounded-full border-white/20 hover:bg-white/10 text-white text-lg font-medium backdrop-blur-sm transition-all w-full sm:w-auto">
              View Documentation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
