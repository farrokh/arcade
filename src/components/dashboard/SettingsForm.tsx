'use client'

import { useActionState } from 'react'
import { updateProfile } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Hash, Save } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

const initialState = {
  error: '',
  success: false
}

interface SettingsFormProps {
  fullName: string
  email: string
  referralCode: string
}

export function SettingsForm({ fullName, email, referralCode }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success('Profile updated successfully')
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl max-w-2xl">
      <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
      
      <form action={formAction} className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              name="fullName"
              defaultValue={fullName || ''}
              placeholder="Enter your name"
              className="pl-10 bg-black/50 border-white/10 text-white focus:ring-white/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              value={email}
              disabled
              className="pl-10 bg-white/5 border-white/5 text-zinc-400 cursor-not-allowed"
            />
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            Email address cannot be changed.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
            Referral Code
          </label>
          <div className="relative">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              value={referralCode}
              disabled
              className="pl-10 bg-white/5 border-white/5 text-zinc-400 cursor-not-allowed font-mono"
            />
          </div>
          <p className="mt-2 text-xs text-zinc-600">
            This is your unique identifier in the network.
          </p>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full sm:w-auto h-12 px-8 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl transition-all"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Saving Changes...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
