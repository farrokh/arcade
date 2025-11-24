import { User, Mail, CreditCard } from 'lucide-react'

interface ActivityTimelineProps {
  activities: Array<
    | { type: 'signup'; email: string; name: string | null; timestamp: string }
    | { type: 'invite'; email: string; status: string; timestamp: string }
    | { type: 'credit'; amount: number; sourceType: string; timestamp: string }
  >
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActivityIcon = (activity: ActivityTimelineProps['activities'][0]) => {
    switch (activity.type) {
      case 'signup':
        return <User className="w-5 h-5" />
      case 'invite':
        return <Mail className="w-5 h-5" />
      case 'credit':
        return <CreditCard className="w-5 h-5" />
    }
  }

  const getActivityColor = (activity: ActivityTimelineProps['activities'][0]) => {
    switch (activity.type) {
      case 'signup':
        return 'from-zinc-700/50 to-zinc-800/50 border-white/20'
      case 'invite':
        return 'from-zinc-700/50 to-zinc-800/50 border-white/20'
      case 'credit':
        return 'from-zinc-700/50 to-zinc-800/50 border-white/20'
    }
  }

  const getActivityText = (activity: ActivityTimelineProps['activities'][0]) => {
    switch (activity.type) {
      case 'signup':
        return (
          <>
            <span className="font-semibold text-white">{activity.name || 'New user'}</span>
            <span className="text-gray-400"> signed up</span>
            <div className="text-sm text-gray-500">{activity.email}</div>
          </>
        )
      case 'invite':
        return (
          <>
            <span className="text-gray-400">Invite sent to </span>
            <span className="font-semibold text-white">{activity.email}</span>
            <span className={`ml-2 text-xs px-2 py-1 rounded ${
              activity.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {activity.status}
            </span>
          </>
        )
      case 'credit':
        return (
          <>
            <span className="font-semibold text-white">{activity.amount} credits</span>
            <span className="text-gray-400"> awarded</span>
            <span className="text-sm text-gray-500 ml-2">({activity.sourceType})</span>
          </>
        )
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>

      {activities.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No recent activity</div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r ${getActivityColor(activity)} border transition-all hover:scale-[1.01]`}
            >
              {/* Icon */}
              <div className="text-2xl mt-1">{getActivityIcon(activity)}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-gray-300">{getActivityText(activity)}</div>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {formatTimestamp(activity.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
