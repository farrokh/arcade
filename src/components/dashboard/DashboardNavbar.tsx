'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react'

export function DashboardNavbar() {
  const pathname = usePathname()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="UAP Logo" width={24} height={24} className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wide text-white uppercase">
              UAP
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                className={`text-sm font-medium ${isActive('/dashboard') ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Overview
              </Button>
            </Link>
            <Link href="/dashboard/referrals">
              <Button 
                variant="ghost" 
                className={`text-sm font-medium ${isActive('/dashboard/referrals') ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Referrals
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button 
                variant="ghost" 
                className={`text-sm font-medium ${isActive('/dashboard/settings') ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleSignOut} 
            variant="ghost" 
            className="text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}
