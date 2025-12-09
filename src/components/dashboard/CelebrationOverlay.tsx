'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { markMilestoneCelebrated } from '@/app/actions/milestones'
import { X } from 'lucide-react'

interface CelebrationOverlayProps {
  milestone: number | null
  shouldCelebrate: boolean
}

export function CelebrationOverlay({ milestone, shouldCelebrate }: CelebrationOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (shouldCelebrate && milestone) {
      // Use setTimeout to avoid synchronous state update warning
      setTimeout(() => setIsVisible(true), 0)
      // Fire confetti
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF4500', '#008000', '#0000FF', '#4B0082', '#EE82EE']
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF4500', '#008000', '#0000FF', '#4B0082', '#EE82EE']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [shouldCelebrate, milestone])

  const handleDismiss = async () => {
    setIsVisible(false)
    if (milestone) {
      await markMilestoneCelebrated(milestone)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-zinc-900 p-8 text-center shadow-2xl border border-zinc-800"
          >
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 shadow-lg"
            >
              <span className="text-4xl font-bold text-white">
                {milestone}
              </span>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-3xl font-bold text-white"
            >
              Congratulations!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-zinc-400"
            >
              You&apos;ve hit a major milestone! You have successfully invited {milestone} friends to the platform.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleDismiss}
              className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200 transition-colors"
            >
              Awesome!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
