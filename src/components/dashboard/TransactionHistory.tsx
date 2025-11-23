'use client'

import { format } from 'date-fns'

interface Transaction {
  amount: number
  source_type: string
  created_at: string
  source_user: {
    email: string
    full_name: string | null
    avatar_url: string | null
  } | null
  referral_path?: {
    email: string
    full_name: string | null
    avatar_url: string | null
  }[]
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  currentUser: {
    email: string
    full_name?: string | null
    avatar_url?: string | null
  }
}

import { ReferralChain } from './ReferralChain'

export function TransactionHistory({ transactions, currentUser }: TransactionHistoryProps) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white mb-6">Mileage History</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-zinc-500 text-sm font-mono uppercase tracking-wider">
              <th scope="col" className="pb-4 font-medium w-[140px]">Date</th>
              <th scope="col" className="pb-4 font-medium w-[160px]">Source</th>
              <th scope="col" className="pb-4 font-medium">From</th>
              <th scope="col" className="pb-4 font-medium text-right w-[100px]">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500">
                  No transactions yet. Start driving or inviting friends!
                </td>
              </tr>
            ) : (
              transactions.map((tx, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 text-zinc-400 text-sm font-mono">
                    {format(new Date(tx.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${tx.source_type === 'signup' ? 'bg-blue-500/10 text-blue-400' : 
                        tx.source_type === 'referral' ? 'bg-emerald-500/10 text-emerald-400' : 
                        'bg-purple-500/10 text-purple-400'}`}>
                      {tx.source_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 text-zinc-300 text-sm">
                    {tx.source_type === 'recursive_referral' && tx.referral_path ? (
                      <ReferralChain path={tx.referral_path} currentUser={currentUser} />
                    ) : tx.source_user ? (
                      <div className="flex items-center gap-2">
                        {tx.source_user.avatar_url ? (
                          <img src={tx.source_user.avatar_url} alt="" className="w-5 h-5 rounded-full" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px]">
                            {tx.source_user.email[0].toUpperCase()}
                          </div>
                        )}
                        <span className="truncate max-w-[150px]">
                          {tx.source_user.full_name || tx.source_user.email.split('@')[0]}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-600 italic">System</span>
                    )}
                  </td>
                  <td className="py-4 text-right font-mono font-medium text-white">
                    +{tx.amount} mi
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
