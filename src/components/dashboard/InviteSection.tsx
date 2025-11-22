'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

export function InviteSection({ referralCode }: { referralCode: string }) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/signup?ref=${referralCode}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInvite = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referralCode }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Invite sent!')
        setEmail('')
      } else {
        setMessage(data.error?.message || 'Failed to send invite')
      }
    } catch (error) {
      setMessage('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 h-full">
      <h3 className="text-xl font-bold text-white mb-2">Invite Friends</h3>
      <p className="text-gray-400 mb-6">
        Share your unique link. Earn 50 miles for every friend who joins, plus recursive bonuses.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Your Invite Link</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-2 rounded-md bg-black border border-white/10 text-gray-300 font-mono text-sm truncate">
              {inviteLink || 'Loading...'}
            </div>
            <Button onClick={handleCopy} variant="outline" className="w-12 px-0">
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <input
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-black border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
          />
          <Button onClick={handleInvite} disabled={loading || !email}>
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
        {message && <p className="text-sm text-green-400 mt-2">{message}</p>}
      </div>
    </div>
  )
}
