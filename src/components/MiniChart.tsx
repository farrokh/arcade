'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function MiniChart({ transactions }: { transactions: any[] }) {
  const data = useMemo(() => {
    // Calculate cumulative mileage over time
    // Reverse transactions to go from oldest to newest
    const sorted = [...transactions].reverse()
    let runningTotal = 0
    const points = sorted.map(t => {
      runningTotal += t.amount
      return runningTotal
    })
    
    // Add initial 0 point if empty or just to start from 0
    if (points.length === 0) return [0, 0]
    return [0, ...points]
  }, [transactions])

  // Normalize data for SVG path
  const max = Math.max(...data, 100) // Minimum scale of 100
  const width = 120
  const height = 40
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - (val / max) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="h-[60px] w-[140px] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M ${points}`}
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Glow effect */}
        <motion.path
          d={`M ${points}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blur-[4px] opacity-40"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}
