'use client'

import { useSpring, useMotionValue, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
  value: number
  direction?: 'up' | 'down'
  className?: string
}

export function Counter({ value, direction = 'up', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(latest))
      }
    })
  }, [springValue])

  return <span className={className} ref={ref} />
}
