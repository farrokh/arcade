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
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background with gradient/placeholder since image gen failed */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black" />
        {/* Animated grid lines for "futuristic" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Turn Your Car Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              The Future
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the revolution. Earn autonomous mileage credits for every friend you invite.
            The more you share, the further you go.
          </p>

          <div className="mb-16">
            <div className="text-sm text-cyan-400 mb-2 font-mono tracking-widest uppercase">Available Mileage Credits</div>
            <div className="text-6xl md:text-8xl font-mono font-bold text-white tabular-nums">
              <span ref={mileageRef}>0</span>
              <span className="text-2xl text-gray-500 ml-4">mi</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="h-12 px-8 text-lg w-full sm:w-auto">
                Start Driving
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" className="h-12 px-8 text-lg w-full sm:w-auto">
                How It Works
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
