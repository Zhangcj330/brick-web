'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

const FEATURES = [
  'AI-powered suburb & property analysis',
  'Grant eligibility checker',
  'Negotiation coach',
  'Settlement timeline & checklists',
]

export default function SignUpPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      const supabase = getSupabase()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName },
        },
      })
      if (authError) {
        setError(authError.message)
      } else {
        setDone(true)
        // If email confirmation is disabled in Supabase, redirect immediately
        setTimeout(() => router.push('/chat'), 1500)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-[400px] w-full text-center">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
              <path d="M2 10L8.5 16.5L22 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] mb-3">You&apos;re in.</h1>
          <p className="text-[#6B6B6B] text-sm leading-relaxed">
            Check your email to confirm your account, then we&apos;ll take you to Brick AI.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] bg-black flex-col justify-between p-12 shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-on-black.svg" alt="Brick AI" width={36} height={36} />
          <span className="text-white font-black text-xl tracking-[-0.03em]">Brick AI</span>
        </Link>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#AFAFAF] mb-6">
            Your AI buyer&apos;s agent
          </p>
          <h2 className="text-[40px] font-black leading-[1.05] tracking-[-0.03em] text-white mb-8">
            Start buying smarter<br />from day one.
          </h2>
          <ul className="space-y-4">
            {FEATURES.map(f => (
              <li key={f} className="flex items-center gap-3 text-[#AFAFAF] text-sm">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[#6B6B6B] text-xs">© 2026 Brick AI Pty Ltd</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <Image src="/logo-on-black.svg" alt="Brick AI" width={32} height={32} />
          <span className="font-black text-xl tracking-[-0.03em]">Brick AI</span>
        </Link>

        <div className="w-full max-w-[400px]">
          <h1 className="text-3xl font-black tracking-[-0.03em] mb-2">Create your account</h1>
          <p className="text-[#6B6B6B] text-sm mb-8">
            Join Brick AI and start buying with confidence.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3A3A3A] mb-1.5">
                  First name
                </label>
                <input
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Alex"
                  className="w-full border border-[#E2E2E2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#C0C0C0]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3A3A3A] mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full border border-[#E2E2E2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#C0C0C0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3A3A3A] mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-[#E2E2E2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#C0C0C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3A3A3A] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full border border-[#E2E2E2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-[#C0C0C0]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>

            <p className="text-center text-xs text-[#AFAFAF] leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="underline hover:text-black transition-colors">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-black transition-colors">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-sm text-[#6B6B6B] mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
