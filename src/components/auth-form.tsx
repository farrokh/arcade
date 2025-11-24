'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
  const [signupSuccess, setSignupSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Fallback: use prop or URL param
  const referralCode = referrer?.referral_code || searchParams.get('ref')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (type === 'signup') {
        const { data, error } = await supabase.auth.signUp({
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

        if (data.session) {
          // User is logged in immediately (e.g. email confirmation disabled)
          router.push('/dashboard')
          router.refresh()
        } else {
          // Email confirmation required
          setSignupSuccess(true)
          toast.success('Check your email for the confirmation link!')
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
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

  // Show success message after signup
  if (signupSuccess && type === 'signup') {
    return (
      <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-white mb-3">
            Check Your Email
          </h2>

          {/* Message */}
          <p className="text-zinc-400 mb-6 leading-relaxed">
            We&apos;ve sent a confirmation link to <span className="text-white font-medium">{email}</span>. 
            Please check your inbox and click the link to complete your registration.
          </p>

          {/* Additional Info */}
          <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-4 mb-6">
            <p className="text-sm text-zinc-400">
              <span className="text-cyan-400 font-medium">Tip:</span> If you don&apos;t see the email, check your spam folder.
            </p>
          </div>

          {/* Back to Login Link */}
          <Link 
            href="/login" 
            className="inline-block text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            Return to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
      {referrer && type === 'signup' && (
        <div className="mb-8 p-4 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-cyan-500/30">
            {referrer.avatar_url ? (
              <Image src={referrer.avatar_url} alt={referrer.full_name || 'Referrer'} width={48} height={48} className="object-cover w-full h-full" />
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            required
            aria-label="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            required
            aria-label="Password"
          />
        </div>
        <div className="flex justify-end">
          <Link 
            href="/forgot-password" 
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Forgot password?
          </Link>
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
          onClick={handleGoogleSignIn}
        >
          Google
        </Button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        {type === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
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
