'use client'

interface InviteProgressChartProps {
  stats: {
    pending: number
    accepted: number
  }
}

export function InviteProgressChart({ stats }: InviteProgressChartProps) {
  const total = stats.pending + stats.accepted
  const pendingPercent = total > 0 ? (stats.pending / total) * 100 : 0
  const acceptedPercent = total > 0 ? (stats.accepted / total) * 100 : 0

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Invite Status Distribution</h2>

      {total === 0 ? (
        <div className="text-center py-12 text-gray-400">No invite data available</div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-12 bg-zinc-800/50 rounded-lg overflow-hidden flex">
              <div
                className="bg-gradient-to-r from-white to-zinc-300 flex items-center justify-center text-black font-semibold transition-all"
                style={{ width: `${acceptedPercent}%` }}
              >
                {acceptedPercent > 10 && `${acceptedPercent.toFixed(1)}%`}
              </div>
              <div
                className="bg-gradient-to-r from-zinc-500 to-zinc-600 flex items-center justify-center text-white font-semibold transition-all"
                style={{ width: `${pendingPercent}%` }}
              >
                {pendingPercent > 10 && `${pendingPercent.toFixed(1)}%`}
              </div>
            </div>
          </div>

          {/* Legend and stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 border border-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-gray-300 text-sm">Accepted</span>
              </div>
              <div className="text-white text-3xl font-bold">{stats.accepted}</div>
              <div className="text-gray-400 text-sm mt-1">{acceptedPercent.toFixed(1)}%</div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-zinc-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Pending</span>
              </div>
              <div className="text-white text-3xl font-bold">{stats.pending}</div>
              <div className="text-gray-400 text-sm mt-1">{pendingPercent.toFixed(1)}%</div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <div className="text-gray-400 text-sm">Total Invites</div>
            <div className="text-white text-4xl font-bold mt-1">{total.toLocaleString()}</div>
          </div>
        </>
      )}
    </div>
  )
}
