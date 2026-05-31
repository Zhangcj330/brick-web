import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CtaStrip() {
  return (
    <section id="cta" className="bg-black py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <h2 className="text-[40px] font-black tracking-[-0.02em] text-white mb-3">Ready to buy with confidence?</h2>
          <p className="text-[#AFAFAF] text-base max-w-md">
            Sign in to Brick AI and get your AI buyer&apos;s agent working for you today.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-[#EEEEEE] transition-colors text-base whitespace-nowrap"
          >
            Sign in <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-[rgba(255,255,255,0.4)]">
            No account yet?{' '}
            <a href="/sign-up" className="underline hover:text-white transition-colors">Create one free</a>
          </p>
        </div>
      </div>
    </section>
  )
}
