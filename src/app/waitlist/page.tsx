'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const BUYER_TYPES = ['Buy', 'Invest', 'Upgrade', 'Not sure']
const CITIES = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Other']
const BUDGETS = ['Under $500k', '$500k–$750k', '$750k–$1M', '$1M–$1.5M', '$1.5M–$2M', '$2M+']
const SOURCES = ['Google', 'Instagram', 'TikTok', 'Friend / family', 'Reddit', 'Other']

const STATS = [
  { num: '50k+', label: 'Homes analysed' },
  { num: '$18k', label: 'Avg. savings found' },
  { num: '4.9★', label: 'Beta rating' },
  { num: '3 min', label: 'Time to first insight' },
]

type FormData = {
  first_name: string
  last_name: string
  email: string
  buyer_type: string
  city: string
  budget: string
  source: string[]
}

export default function WaitlistPage() {
  const [form, setForm] = useState<FormData>({
    first_name: '', last_name: '', email: '',
    buyer_type: '', city: '', budget: '', source: [],
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const step = (() => {
    let s = 1
    if (form.email) s = 2
    if (form.buyer_type) s = 3
    return s
  })()

  function set(field: keyof FormData, val: string | string[]) {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  function toggleSource(s: string) {
    set('source', form.source.includes(s)
      ? form.source.filter(x => x !== s)
      : [...form.source, s]
    )
  }

  function validate() {
    const e: Partial<Record<'first_name' | 'email' | 'buyer_type', string>> = {}
    if (!form.first_name.trim()) e.first_name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.buyer_type) e.buyer_type = 'Please select one'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(prev => ({ ...prev, ...errs }))
      return
    }
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || 'Something went wrong.'); return }
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const position = Math.abs(
    form.email.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 300
  ) + 200

  if (submitted) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-3">You&apos;re in.</h1>
        <p className="text-[#6B6B6B] mb-2">We&apos;ll email you at <strong>{form.email}</strong> the moment Brick launches.</p>
        <p className="text-2xl font-black mb-8">Position <span className="text-[#6B6B6B]">#{position}</span></p>
        <div className="flex gap-3 justify-center">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just joined the Brick AI waitlist — an AI co-pilot for first-home buyers in Australia 🏠 brickai.com.au")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors"
          >
            Share on X
          </a>
          <button
            onClick={() => navigator.clipboard.writeText('https://brickai.com.au')}
            className="inline-flex items-center gap-2 border border-[#EEEEEE] text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#F6F6F6] transition-colors"
          >
            Copy link
          </button>
        </div>
        <Link href="/" className="block mt-6 text-sm text-[#AFAFAF] hover:text-black transition-colors">← Back to home</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">

      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-black p-14 sticky top-0 h-screen">
        <Link href="/" className="font-black text-xl text-white tracking-tight">Brick AI</Link>

        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs font-semibold text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Now in build · Closed beta
          </div>
          <h1 className="text-[44px] font-black leading-tight tracking-[-0.03em] text-white mb-4">
            You&apos;re early.<br />That&apos;s smart.
          </h1>
          <p className="text-[#AFAFAF] text-base leading-relaxed max-w-sm mb-10">
            Brick AI is the co-pilot first-home buyers deserve. Join the waitlist and get exclusive early access when we launch.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {STATS.map(s => (
              <div key={s.label} className="border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-black text-white">{s.num}</div>
                <div className="text-xs text-[#6B6B6B] mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-white/20 pl-4">
            <p className="text-sm text-[#AFAFAF] italic leading-relaxed">&ldquo;After one session I understood my borrowing power, what grants I qualified for, and exactly what to offer. We bought in 6 weeks.&rdquo;</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">SL</div>
              <span className="text-xs text-[#6B6B6B]">Sarah L. · Beta tester · Melbourne</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B6B6B]">© 2025 Brick AI</p>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-8 py-14 md:px-14">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-black transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h2 className="text-3xl font-black tracking-tight mb-1">Join the waitlist</h2>
        <p className="text-sm text-[#6B6B6B] mb-8">Takes 60 seconds. No spam, ever.</p>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${step >= s ? 'bg-black' : 'bg-[#EEEEEE]'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block">First name <span className="text-red-500">*</span></label>
              <input
                value={form.first_name} onChange={e => set('first_name', e.target.value)}
                placeholder="Alex"
                className={`w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20 ${errors.first_name ? 'ring-2 ring-red-400' : ''}`}
              />
              {errors.first_name && <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block">Last name</label>
              <input
                value={form.last_name} onChange={e => set('last_name', e.target.value)}
                placeholder="Smith"
                className="w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block">Email <span className="text-red-500">*</span></label>
            <input
              type="email" value={form.email} onChange={e => set('email', e.target.value)}
              placeholder="alex@email.com"
              className={`w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20 ${errors.email ? 'ring-2 ring-red-400' : ''}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Buyer type */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block">I&apos;m looking to <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {BUYER_TYPES.map(t => (
                <button type="button" key={t} onClick={() => set('buyer_type', t)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    form.buyer_type === t ? 'bg-black text-white border-black' : 'border-[#EEEEEE] text-black hover:bg-[#F6F6F6]'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
            {errors.buyer_type && <p className="text-xs text-red-500 mt-1">{errors.buyer_type}</p>}
          </div>

          {/* City + Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block">Target city</label>
              <select value={form.city} onChange={e => set('city', e.target.value)}
                className="w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20 appearance-none">
                <option value="">Select…</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block">Budget</label>
              <select value={form.budget} onChange={e => set('budget', e.target.value)}
                className="w-full bg-[#F6F6F6] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20 appearance-none">
                <option value="">Select…</option>
                {BUDGETS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block">How did you hear about us?</label>
            <div className="flex flex-wrap gap-2">
              {SOURCES.map(s => (
                <button type="button" key={s} onClick={() => toggleSource(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    form.source.includes(s) ? 'bg-black text-white border-black' : 'border-[#EEEEEE] text-black hover:bg-[#F6F6F6]'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{serverError}</div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-4 rounded-full hover:bg-[#333] transition-colors text-base disabled:opacity-60 mt-2">
            {submitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><span>Join waitlist</span><ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-xs text-[#AFAFAF] text-center">No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    </div>
  )
}
