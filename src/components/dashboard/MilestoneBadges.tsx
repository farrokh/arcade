'use client'

import { motion } from 'framer-motion'
import { Trophy, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MilestoneBadgesProps {
  milestones: number[]
}

const MILESTONES = [2, 5, 10, 50, 100]

export function MilestoneBadges({ milestones = [] }: MilestoneBadgesProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {MILESTONES.map((milestone) => {
        const isUnlocked = milestones.includes(milestone)
        
        return (
          <motion.div
            key={milestone}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all",
              isUnlocked 
                ? "border-yellow-500/20 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
                : "border-zinc-800 bg-zinc-900/50 opacity-50 grayscale"
            )}
          >
            <div className={cn(
              "mb-3 flex h-12 w-12 items-center justify-center rounded-full",
              isUnlocked ? "bg-gradient-to-br from-yellow-400 to-orange-600 text-white" : "bg-zinc-800 text-zinc-500"
            )}>
              {isUnlocked ? <Trophy className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
            </div>
            
            <div className="font-bold text-white">
              {milestone} Invites
            </div>
            
            <div className="mt-1 text-xs text-zinc-400">
              {isUnlocked ? "Unlocked" : "Locked"}
            </div>

            {isUnlocked && (
              <motion.div
                layoutId="active-glow"
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 blur-xl"
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
