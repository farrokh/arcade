'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Twitter, Github, Disc, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.svg" alt="UAP Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-lg font-bold tracking-wide text-white uppercase">
                UAP
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-sm">
              The world's first decentralized protocol for autonomous fleet coordination. 
              Building the infrastructure for the future of mobility.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Disc className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Protocol</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-zinc-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest protocol updates and announcements.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-white/20"
              />
              <Button className="bg-white text-black hover:bg-zinc-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © 2025 UAP Protocol. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
