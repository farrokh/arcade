'use client'

import { useFormState } from 'react-dom'
import { verifyAdminPassword } from '@/lib/actions'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(verifyAdminPassword, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/admin')
    }
  }, [state?.success, router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900/70 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter password to continue</p>
          </div>

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoFocus
                className="w-full px-4 py-3 bg-zinc-800/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                placeholder="Enter admin password"
              />
            </div>

            {state?.error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Unauthorized access is prohibited
          </div>
        </div>
      </div>
    </div>
  )
}
