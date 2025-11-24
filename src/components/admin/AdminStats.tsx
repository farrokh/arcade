import { Users, Mail, Clock, CheckCircle, TrendingUp, Target } from 'lucide-react'

interface AdminStatsProps {
  stats: {
    totalUsers: number
    totalInvites: number
    pendingInvites: number
    acceptedInvites: number
    totalCredits: number
    conversionRate: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-zinc-800/80 to-zinc-900/80 border-zinc-700/50',
    },
    {
      label: 'Total Invites',
      value: stats.totalInvites.toLocaleString(),
      icon: Mail,
      color: 'from-zinc-800/80 to-zinc-900/80 border-zinc-700/50',
    },
    {
      label: 'Pending Invites',
      value: stats.pendingInvites.toLocaleString(),
      icon: Clock,
      color: 'from-zinc-800/80 to-zinc-900/80 border-zinc-700/50',
    },
    {
      label: 'Accepted Invites',
      value: stats.acceptedInvites.toLocaleString(),
      icon: CheckCircle,
      color: 'from-zinc-800/80 to-zinc-900/80 border-zinc-700/50',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: 'from-zinc-800/80 to-zinc-900/80 border-zinc-700/50',
    },
    {
      label: 'Total Credits',
      value: stats.totalCredits.toLocaleString(),
      icon: Target,
      color: 'from-zinc-800/80 to-zinc-900/80 border-zinc-700/50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.color} backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-8 h-8 text-white" />
              <span className="text-3xl font-bold text-white">{card.value}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-300">{card.label}</h3>
          </div>
        )
      })}
    </div>
  )
}
