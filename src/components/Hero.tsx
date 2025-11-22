'use client'

import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/UAP-hero.avif"
          alt="UAP Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-[0.9]">
            AUTONOMY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              REDEFINED.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 max-w-xl mb-10 font-light leading-relaxed">
            The world's first decentralized protocol for autonomous fleet coordination. Earn rewards for every mile your fleet drives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button className="h-14 px-8 rounded-full bg-white hover:bg-zinc-200 text-black text-base font-semibold tracking-wide transition-all">
                Start Driving
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white text-base font-medium backdrop-blur-sm transition-all">
                How it Works
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  )
}
