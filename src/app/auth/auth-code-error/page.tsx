'use client'

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
        <p className="text-zinc-400 mb-8">
          There was a problem verifying your authentication code. This link may have expired or already been used.
        </p>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full bg-white text-black hover:bg-zinc-200">
              Return to Login
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full text-zinc-400 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
