'use client'

import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@supabase/supabase-js'
import { Counter } from './Counter'

type Profile = {
  referral_code: string
  full_name: string
  avatar_url: string
  email: string
}

interface HeroProps {
  user: User | null
  profile: Profile | null
  mileage: number
  transactions: any[]
}

import { MiniChart } from './MiniChart'

export function Hero({ user, profile, mileage, transactions }: HeroProps) {
  console.log("user",user)
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.avif"
          alt="UAP Hero Image showing autonomous fleet"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl">
            {user ? (
              <div className="mb-6">
                <p className="text-zinc-400 text-lg mb-2 font-mono">WELCOME BACK</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {profile?.full_name || user.email}
                </h2>
              </div>
            ) : null}

            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-[0.9]">
              AUTONOMY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                REDEFINED.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 max-w-xl mb-10 font-light leading-relaxed">
              The world's first decentralized protocol for autonomous fleet coordination. Earn rewards for every mile your fleet drives.
            </p>

            {!user && (
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
            )}
          </div>

          {/* Right Side - Mileage Counter for Logged In Users */}
          {user && (
            <div className="flex flex-col items-end md:items-end">
              <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-right min-w-[300px]">
                <div className="text-sm font-mono text-zinc-500 mb-2 uppercase tracking-wider">Total Mileage</div>
                <div className="flex items-center justify-end gap-6">
                  {/* Mini Chart */}
                  <div className="hidden md:block opacity-80">
                    <MiniChart transactions={transactions} />
                  </div>
                  
                  <div className="text-6xl md:text-7xl font-bold text-white tracking-tighter tabular-nums">
                    <Counter value={mileage} />
                  </div>
                </div>
                <div className="text-emerald-500 text-sm font-medium mt-2 flex justify-end items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active Network
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  )
}
