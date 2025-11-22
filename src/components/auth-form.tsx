'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface AuthFormProps {
  type: 'login' | 'signup'
  referrer?: {
    full_name: string | null
    avatar_url: string | null
    referral_code: string
  } | null
}

export function AuthForm({ type, referrer }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Fallback: use prop or URL param
  const referralCode = referrer?.referral_code || searchParams.get('ref')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    console.log('Submitting Signup with Referral Code:', referralCode)

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
            data: {
              referral_code: referralCode, // Use the resolved code
            },
          },
        })
        if (error) throw error
        toast.success('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    // Store referral code in cookie for callback
    if (referralCode) {
      // Set cookie for 30 days
      document.cookie = `referral_code=${referralCode}; path=/; max-age=2592000; SameSite=Lax`
    }

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // data: { referral_code: referralCode } // Removed as it's not reliably supported
      },
    })
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
      {referrer && type === 'signup' && (
        <div className="mb-8 p-4 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-cyan-500/30">
            {referrer.avatar_url ? (
              <img src={referrer.avatar_url} alt={referrer.full_name || 'Referrer'} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-400 font-bold">
                {(referrer.full_name?.[0] || 'R').toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-0.5">Invited by</div>
            <div className="text-white font-semibold">{referrer.full_name || 'A Friend'}</div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        {type === 'login' ? 'Welcome Back' : 'Join the Revolution'}
      </h2>
      <p className="text-zinc-400 text-center mb-8 text-sm">
        {type === 'login' ? 'Enter your credentials to access the dashboard.' : 'Create an account to start earning mileage.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : type === 'login' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full mt-4"
          onClick={handleGoogleLogin}
        >
          Google
        </Button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link href="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-400 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
