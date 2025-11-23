'use client'

import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Referral {
  email: string
  created_at: string
  full_name?: string | null
  avatar_url?: string | null
}

interface PendingInvite {
  email: string
  created_at: string
  status: string
}

export function ReferralTable({ referrals, pendingInvites = [] }: { referrals: Referral[], pendingInvites?: PendingInvite[] }) {
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active')

  const data = activeTab === 'active' ? referrals : pendingInvites

  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Referrals</h3>
        <div className="flex p-1 bg-zinc-800 rounded-lg">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              activeTab === 'active' 
                ? "bg-zinc-700 text-white shadow-sm" 
                : "text-zinc-400 hover:text-white"
            )}
          >
            Active ({referrals.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              activeTab === 'pending' 
                ? "bg-zinc-700 text-white shadow-sm" 
                : "text-zinc-400 hover:text-white"
            )}
          >
            Pending ({pendingInvites.length})
          </button>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {activeTab === 'active' 
            ? "No active referrals yet. Start inviting!" 
            : "No pending invites."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-white/5">
          <table className="w-full text-left">
            <thead className="sr-only">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((item, i) => (
                <tr key={i} className="bg-black/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white",
                        activeTab === 'active' 
                          ? "bg-gradient-to-br from-cyan-500 to-blue-600" 
                          : "bg-zinc-700"
                      )} aria-hidden="true">
                        {(item as any).avatar_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={(item as any).avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
                        ) : (
                          item.email.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">{item.email}</div>
                        {activeTab === 'active' && (item as any).full_name && (
                          <div className="text-xs text-gray-500">{(item as any).full_name}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right text-xs text-gray-500">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </td>
                  <td className="p-4 text-right">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      activeTab === 'active' 
                        ? "bg-emerald-500/10 text-emerald-500" 
                        : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {activeTab === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
