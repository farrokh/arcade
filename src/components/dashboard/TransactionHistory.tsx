'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

function UserAvatar({ user, label, isSmall = false }: { user: any, label: string, isSmall?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 w-12">
      {user.avatar_url ? (
        <img 
          src={user.avatar_url} 
          alt="" 
          className={`${isSmall ? 'w-6 h-6' : 'w-8 h-8'} rounded-full border border-zinc-700`} 
        />
      ) : (
        <div className={`${isSmall ? 'w-6 h-6 text-[8px]' : 'w-8 h-8 text-[10px]'} rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400`}>
          {(user.email || '?')[0].toUpperCase()}
        </div>
      )}
      <span className="text-[9px] text-zinc-500 truncate w-full text-center">
        {label}
      </span>
    </div>
  )
}

function ReferralChain({ path, currentUser }: { path: any[], currentUser: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const fullPath = [currentUser, ...path]
  
  // If there are no intermediate nodes (just Head -> Tail), show expanded by default and disable interaction
  if (fullPath.length <= 2) {
    return (
      <div className="flex items-start gap-0 overflow-x-auto py-2 no-scrollbar">
        {fullPath.map((user, idx, arr) => (
          <div key={idx} className="flex items-start">
            <UserAvatar 
              user={user} 
              label={idx === 0 ? 'You' : user.full_name || user.email.split('@')[0]} 
            />
            {idx < arr.length - 1 && (
              <div className="w-4 border-t border-dashed border-zinc-700 mx-0 mt-[16px]" />
            )}
          </div>
        ))}
      </div>
    )
  }

  const head = fullPath[0]
  const tail = fullPath[fullPath.length - 1]
  const hiddenCount = fullPath.length - 2
  const restOfPath = fullPath.slice(1)

  return (
    <div className="flex items-start">
      {/* Static Head */}
      <UserAvatar user={head} label="You" />

      {/* Expandable Section */}
      <div 
        className="flex items-start cursor-pointer group/chain"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div 
          layout 
          className="flex items-start"
          initial={false}
        >
          {!isExpanded ? (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-start"
            >
               <div className="flex items-center mt-[4px]">
                 <div className="h-[1px] w-3 border-t border-dashed border-zinc-700 group-hover/chain:border-zinc-500 transition-colors" />
                 <div className="w-6 h-6 rounded-full bg-zinc-900/80 border border-zinc-700 group-hover/chain:border-zinc-500 group-hover/chain:bg-zinc-800 transition-all flex items-center justify-center z-10 -mx-1">
                   <span className="text-[9px] text-zinc-400 font-mono font-medium">+{hiddenCount}</span>
                 </div>
                 <div className="h-[1px] w-3 border-t border-dashed border-zinc-700 group-hover/chain:border-zinc-500 transition-colors" />
               </div>
               <UserAvatar user={tail} label={tail.full_name || tail.email.split('@')[0]} />
            </motion.div>
          ) : (
            <motion.div 
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start"
            >
              {restOfPath.map((user, idx) => (
                 <div key={idx} className="flex items-start">
                   {/* Connector */}
                   <div className="w-4 border-t border-dashed border-zinc-700 mx-0 mt-[16px]" />
                   
                   <UserAvatar 
                     user={user} 
                     label={user.full_name || user.email.split('@')[0]} 
                   />
                 </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export function TransactionHistory({ transactions, currentUser }: TransactionHistoryProps) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white mb-6">Mileage History</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-zinc-500 text-sm font-mono uppercase tracking-wider">
              <th className="pb-4 font-medium w-[140px]">Date</th>
              <th className="pb-4 font-medium w-[160px]">Source</th>
              <th className="pb-4 font-medium">From</th>
              <th className="pb-4 font-medium text-right w-[100px]">Amount</th>
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
