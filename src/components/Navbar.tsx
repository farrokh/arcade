'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from './ui/button' // We'll create this next
import { Car } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Image src="/logo.svg" alt="UAP Logo" width={24} height={24} className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wide text-white uppercase">
              UAP
            </span>
          </Link>
        
        <div className="flex items-center gap-8 font-mono">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Button onClick={handleSignOut} variant="ghost" className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-transparent px-0">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Log in
              </Link>
              <Link href="/signup">
                <Button className="rounded-full h-9 px-6 text-sm bg-white hover:bg-zinc-200 text-black font-medium transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
