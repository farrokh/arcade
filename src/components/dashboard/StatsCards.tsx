import { Car, Users, Zap } from 'lucide-react'

interface StatsCardsProps {
  mileage: number
  referralCount: number
}

export function StatsCards({ mileage, referralCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
            <Car className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-200">Total Mileage</h3>
        </div>
        <div className="text-4xl font-bold text-white tabular-nums">
          {mileage.toLocaleString()} <span className="text-lg text-gray-500 font-normal">mi</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-200">Friends Invited</h3>
        </div>
        <div className="text-4xl font-bold text-white tabular-nums">
          {referralCount}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-green-500/10 text-green-400">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-200">Status</h3>
        </div>
        <div className="text-xl font-bold text-green-400">
          Active Pilot
        </div>
      </div>
    </div>
  )
}
