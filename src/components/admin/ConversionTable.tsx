'use client'

import { useState } from 'react'

interface ConversionTableProps {
  users: Array<{
    email: string
    fullName: string | null
    invitesSent: number
    successfulReferrals: number
    conversionRate: number
    totalCredits: number
    joinedAt: string
  }>
}

type SortField = 'email' | 'invitesSent' | 'successfulReferrals' | 'conversionRate' | 'totalCredits' | 'joinedAt'
type SortDirection = 'asc' | 'desc'

const SortIcon = ({ 
  field, 
  sortField, 
  sortDirection 
}: { 
  field: SortField
  sortField: SortField
  sortDirection: SortDirection
}) => {
  if (sortField !== field) return <span className="text-gray-600">↕</span>
  return sortDirection === 'asc' ? <span>↑</span> : <span>↓</span>
}

export function ConversionTable({ users }: ConversionTableProps) {
  const [sortField, setSortField] = useState<SortField>('conversionRate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    const aNum = Number(aValue) || 0
    const bNum = Number(bValue) || 0
    return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
  })

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">User Conversion Rates</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-zinc-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th 
                className="text-left py-3 px-4 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-2">
                  User <SortIcon field="email" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('invitesSent')}
              >
                <div className="flex items-center justify-end gap-2">
                  Invites Sent <SortIcon field="invitesSent" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('successfulReferrals')}
              >
                <div className="flex items-center justify-end gap-2">
                  Successful <SortIcon field="successfulReferrals" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('conversionRate')}
              >
                <div className="flex items-center justify-end gap-2">
                  Conversion <SortIcon field="conversionRate" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('totalCredits')}
              >
                <div className="flex items-center justify-end gap-2">
                  Credits <SortIcon field="totalCredits" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('joinedAt')}
              >
                <div className="flex items-center justify-end gap-2">
                  Joined <SortIcon field="joinedAt" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr 
                key={user.email} 
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                  index % 2 === 0 ? 'bg-white/[0.02]' : ''
                }`}
              >
                <td className="py-3 px-4">
                  <div>
                    <div className="text-white font-medium">{user.fullName || 'Unknown'}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-white">{user.invitesSent}</td>
                <td className="py-3 px-4 text-right text-white">{user.successfulReferrals}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`font-semibold ${
                    user.conversionRate >= 50 ? 'text-green-400' :
                    user.conversionRate >= 25 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {user.conversionRate}%
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-white">{user.totalCredits.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-400 text-sm">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedUsers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
