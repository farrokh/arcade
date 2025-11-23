'use client'

import { useActionState } from 'react'
import { inviteUsers } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Send, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const initialState = {
  error: '',
  success: false,
  count: 0,
  failures: 0
}

export function BulkInviteForm({ referralCode }: { referralCode: string }) {
  const [state, formAction, isPending] = useActionState(inviteUsers, initialState)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast.success(`Successfully sent ${state.count} invites!`)
      if (state.failures > 0) {
        toast.warning(`Failed to send to ${state.failures} addresses.`)
      }
      // Refresh the page to show updated invite statuses
      router.refresh()
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state, router])

  const copyToClipboard = () => {
    const url = `${window.location.origin}/signup?ref=${referralCode}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Referral link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Form */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-2">Invite Network Nodes</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Expand your fleet by inviting multiple operators at once. Earn 50 miles for each successful activation.
          </p>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="referralCode" value={referralCode} />
            
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                Email Addresses (Comma separated)
              </label>
              <textarea
                name="emails"
                placeholder="alice@example.com, bob@example.com, charlie@example.com"
                className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                Custom Message (Optional)
              </label>
              <textarea
                name="message"
                placeholder="Join my fleet on UAP and get 100 bonus miles..."
                className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl transition-all"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Sending Invites...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Invites
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Right Side - Quick Link */}
        <div className="md:w-80 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
            <h3 className="text-sm font-medium text-white mb-4">Your Referral Link</h3>
            <div className="bg-black/50 rounded-xl p-3 border border-white/5 flex items-center justify-between gap-2 mb-4">
              <code className="text-xs text-zinc-400 truncate font-mono">
                {typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref={referralCode}
              </code>
            </div>
            <Button 
              onClick={copyToClipboard}
              variant="outline" 
              className="w-full border-white/10 hover:bg-white/5 text-zinc-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
            <h3 className="text-sm font-medium text-cyan-400 mb-2">Pro Tip</h3>
            <p>Users who sign up with your code become nodes in your network. You earn recursive activation bonuses for every user they invite, up to 10 levels deep.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
