'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#222] h-[66px] flex items-center px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-[-0.03em] text-white">
          <Image src="/logo-white.svg" alt="Brick AI" width={28} height={28} />
          Brick AI
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#AFAFAF]">
          <a href="#suggestions" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#proof" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <Link
          href="/waitlist"
          className="hidden md:inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#e0e0e0] transition-colors"
        >
          Join waitlist
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>
      {open && (
        <div className="absolute top-[66px] left-0 right-0 bg-black border-b border-[#222] px-6 md:px-10 py-6 flex flex-col gap-4 md:hidden">
          <a href="#suggestions" className="text-sm font-medium text-white" onClick={() => setOpen(false)}>Features</a>
          <a href="#how" className="text-sm font-medium text-white" onClick={() => setOpen(false)}>How it works</a>
          <a href="#proof" className="text-sm font-medium text-white" onClick={() => setOpen(false)}>Reviews</a>
          <Link href="/waitlist" className="text-sm font-semibold text-white" onClick={() => setOpen(false)}>Join waitlist →</Link>
        </div>
      )}
    </nav>
  )
}
