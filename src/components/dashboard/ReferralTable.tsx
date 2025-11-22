import { formatDistanceToNow } from 'date-fns'

interface Referral {
  email: string
  created_at: string
}

export function ReferralTable({ referrals }: { referrals: Referral[] }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 h-full">
      <h3 className="text-xl font-bold text-white mb-6">Recent Referrals</h3>
      
      {referrals.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No referrals yet. Start inviting!
        </div>
      ) : (
        <div className="space-y-4">
          {referrals.map((ref, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-black/50 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                  {ref.email.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-sm text-gray-200">{ref.email}</div>
              </div>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(ref.created_at), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
