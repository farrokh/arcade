'use client'

import { motion } from 'framer-motion'
import { Users, UserPlus, Award, TrendingUp } from 'lucide-react'

interface ReferralStatsProps {
  referrals: any[]
  totalEarned: number
}

export function ReferralStats({ referrals, totalEarned }: ReferralStatsProps) {
  const totalReferred = referrals.length
  // Assuming 'active' means they have earned some credits or logged in recently. 
  // For now, let's just say active if they have a full_name set (completed onboarding)
  const activeReferrals = referrals.filter(r => r.full_name).length
  const pendingReferrals = totalReferred - activeReferrals
  
  const stats = [
    {
      label: 'Total Referred',
      value: totalReferred,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      label: 'Active Nodes',
      value: activeReferrals,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      label: 'Pending',
      value: pendingReferrals,
      icon: UserPlus,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    },
    {
      label: 'Lifetime Earnings',
      value: `${totalEarned} mi`,
      icon: Award,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-2xl bg-zinc-900/50 border ${stat.border} backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            {index === 1 && (
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                +12%
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-zinc-500">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
