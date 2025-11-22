'use client'

import { motion, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export function Hero() {
  const [mileage, setMileage] = useState(0)
  const springMileage = useSpring(0, { stiffness: 50, damping: 20 })
  const displayMileage = useTransform(springMileage, (current) => Math.round(current).toLocaleString())
  const mileageRef = useRef<HTMLSpanElement>(null)

  useMotionValueEvent(displayMileage, "change", (latest) => {
    if (mileageRef.current) {
      mileageRef.current.textContent = latest
    }
  })

  useEffect(() => {
    // Simulate mileage increasing rapidly
    springMileage.set(12450)
  }, [springMileage])

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-end bg-zinc-950">
      {/* Abstract Windshield View */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950" />
        {/* Subtle Horizon Line */}
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Moving Road Lines (Subtle) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:linear-gradient(to_bottom,transparent_30%,black_100%)] transform perspective-[2000px] rotate-x-60 origin-bottom" />
      </div>

      {/* Dashboard Interface */}
      <div className="relative z-20 w-full h-[45vh] flex flex-col items-center justify-end pb-16">
        {/* Glass Dashboard Panel */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-zinc-900/0 blur-2xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Status Indicators */}
            <div className="flex gap-12 mb-12 text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
              <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> System Active</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500" /> Network Stable</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white" /> Ready</span>
            </div>

            {/* Main Instrument Cluster */}
            <div className="flex items-center gap-16">
              {/* Left Gauge (Placeholder) */}
              <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-transparent to-zinc-800 rounded-full" />
              
              {/* Central Mileage */}
              <div className="flex flex-col items-center">
                <div className="text-8xl md:text-9xl font-light text-white tracking-tighter tabular-nums drop-shadow-2xl">
                  <span ref={mileageRef}>0</span>
                </div>
                <div className="text-sm font-medium text-zinc-500 tracking-[0.3em] uppercase mt-4">Available Range (mi)</div>
              </div>

              {/* Right Gauge (Placeholder) */}
              <div className="hidden md:block w-32 h-1 bg-gradient-to-l from-transparent to-zinc-800 rounded-full" />
            </div>

            {/* Action Area */}
            <div className="mt-16 flex flex-col items-center gap-6">
              <Link href="/signup">
                <Button className="h-12 px-10 rounded-full bg-white hover:bg-zinc-200 text-black text-sm font-medium tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                  Initialize Protocol
                </Button>
              </Link>
              <p className="text-zinc-600 text-sm font-light">
                Universal Autonomous Protocol v1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
