'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EEEEEE] h-[66px] flex items-center">
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-[-0.03em]">
          <Image src="/logo-on-black.svg" alt="Brick AI" width={32} height={32} />
          Brick AI
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3A3A3A]">
          <a href="#suggestions" className="hover:text-black transition-colors">Features</a>
          <a href="#how" className="hover:text-black transition-colors">How it works</a>
          <a href="#proof" className="hover:text-black transition-colors">Reviews</a>
          
        </div>
        <Link
          href="/waitlist"
          className="hidden md:inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors"
        >
          Join waitlist
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="block w-5 h-0.5 bg-black mb-1" />
          <span className="block w-5 h-0.5 bg-black mb-1" />
          <span className="block w-5 h-0.5 bg-black" />
        </button>
      </div>
      {open && (
        <div className="absolute top-[66px] left-0 right-0 bg-white border-b border-[#EEEEEE] px-6 md:px-10 py-6 flex flex-col gap-4 md:hidden">
          <a href="#suggestions" className="text-sm font-medium" onClick={() => setOpen(false)}>Features</a>
          <a href="#how" className="text-sm font-medium" onClick={() => setOpen(false)}>How it works</a>
          <a href="#proof" className="text-sm font-medium" onClick={() => setOpen(false)}>Reviews</a>
          
          <Link href="/waitlist" className="text-sm font-semibold" onClick={() => setOpen(false)}>Join waitlist →</Link>
        </div>
      )}
    </nav>
  )
}
