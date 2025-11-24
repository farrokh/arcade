interface TopReferrersTableProps {
  referrers: Array<{
    email: string
    fullName: string | null
    avatarUrl: string | null
    referralCount: number
    creditsEarned: number
  }>
}

export function TopReferrersTable({ referrers }: TopReferrersTableProps) {
  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Top Referrers Leaderboard</h2>

      {referrers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No referral data available</div>
      ) : (
        <div className="space-y-3">
          {referrers.map((referrer, index) => (
            <div
              key={referrer.email}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-[1.02] ${
                index < 3
                  ? 'bg-gradient-to-r from-zinc-700/50 to-zinc-800/50 border border-white/20'
                  : 'bg-zinc-800/30 border border-white/10'
              }`}
            >
              {/* Rank */}
              <div className="text-2xl font-bold w-12 text-center">
                {index < 3 ? medals[index] : `#${index + 1}`}
              </div>

              {/* User info */}
              <div className="flex-1">
                <div className="text-white font-semibold">
                  {referrer.fullName || 'Unknown User'}
                </div>
                <div className="text-gray-400 text-sm">{referrer.email}</div>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="text-white font-bold text-xl">
                  {referrer.referralCount} referrals
                </div>
                <div className="text-gray-400 text-sm">
                  {referrer.creditsEarned.toLocaleString()} credits earned
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
