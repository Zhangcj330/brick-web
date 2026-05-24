import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CtaStrip() {
  return (
    <section id="cta" className="bg-black py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">Now in development</p>
          <h2 className="text-[40px] font-black tracking-[-0.02em] text-white mb-3">Be first when we launch.</h2>
          <p className="text-[#AFAFAF] text-base max-w-md">
            Brick AI is currently in build. Join the waitlist for early access and we&apos;ll let you know the moment it&apos;s ready.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-[#EEEEEE] transition-colors text-base whitespace-nowrap"
          >
            Join waitlist <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-[rgba(255,255,255,0.4)]">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
