'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

type DemoRow = { label: string; val: string; badge?: string }
type DemoStep = {
  role: 'ai' | 'user'
  text: string
  delay: number
  typing?: number
  card?: { rows: DemoRow[] }
  _typing?: boolean
}

const DEMO_SCRIPT: DemoStep[] = [
  { role: 'ai', text: "Hi! I'm Brick. What home are you looking for?", delay: 600 },
  { role: 'user', text: "3 bed in Dee Why, budget $2M", delay: 1200, typing: 900 },
  { role: 'ai', text: "Found 8 matches in Dee Why. Median house price $1.94M — you're right at market. Clearance rate 74%.", delay: 1400, typing: 1600,
    card: { rows: [
      { label: 'Suburb median', val: '$1.94M' },
      { label: 'Clearance rate', val: '74%', badge: '🔥 Active' },
      { label: 'Your budget', val: '$2.0M' },
    ]}
  },
  { role: 'user', text: "What grants am I eligible for?", delay: 1200, typing: 800 },
  { role: 'ai', text: "As a NSW first-home buyer you qualify for:", delay: 1200, typing: 1400,
    card: { rows: [
      { label: 'First Home Buyer Assist', val: '$0 stamp duty', badge: '✓ Eligible' },
      { label: 'FHOG (new builds)', val: '$10,000' },
      { label: 'First Home Guarantee', val: '5% deposit' },
    ]}
  },
  { role: 'user', text: "Is 14 Fisher Rd a good buy?", delay: 1200, typing: 800 },
  { role: 'ai', text: "Comparable sales avg $2.08M (90 days). Sold Apr 2025 at $2.15M — 3.4% above median but 512m² block is premium for Dee Why. Solid buy.", delay: 1200, typing: 1800,
    card: { rows: [
      { label: 'Comp. sales avg', val: '$2.08M' },
      { label: 'Land size', val: '512m²', badge: '✓ Good buy' },
      { label: 'Sold price', val: '$2.15M' },
    ]}
  },
]

const STEPS = [
  { n: '01', title: 'Tell Brick what you want', desc: 'Share your suburb, budget, and must-haves in plain English. No forms, no filters.' },
  { n: '02', title: 'Brick runs the numbers', desc: 'Comparable sales, suburb trends, grant eligibility, and hidden costs — in seconds.' },
  { n: '03', title: 'Get your negotiation edge', desc: 'Walk into every inspection and auction knowing your exact ceiling and the right offer strategy.' },
  { n: '04', title: 'Stay on track to settlement', desc: 'Personalised checklist from deposit to keys, with deadline reminders at every step.' },
]

type Message = DemoStep & { id: number; _typing?: boolean }

export default function HowItWorks() {
  const [messages, setMessages] = useState<Message[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const msgId = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = () => {
    setTimeout(() => { if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight }, 50)
  }

  const runSequence = useCallback((steps: DemoStep[], idx: number) => {
    if (idx >= steps.length) {
      timerRef.current = setTimeout(() => { setMessages([]); runSequence(steps, 0) }, 4000)
      return
    }
    const step = steps[idx]
    const id = ++msgId.current

    if (step.role === 'ai' && step.typing) {
      timerRef.current = setTimeout(() => {
        setMessages(m => [...m, { ...step, id, _typing: true }])
        scroll()
        timerRef.current = setTimeout(() => {
          setMessages(m => m.map(x => x.id === id ? { ...x, _typing: false } : x))
          scroll()
          runSequence(steps, idx + 1)
        }, step.typing)
      }, step.delay)
    } else {
      timerRef.current = setTimeout(() => {
        setMessages(m => [...m, { ...step, id }])
        scroll()
        runSequence(steps, idx + 1)
      }, step.delay)
    }
  }, [])

  useEffect(() => {
    runSequence(DEMO_SCRIPT, 0)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [runSequence])

  return (
    <section id="how" className="bg-black py-20">
      <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Steps */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6B6B6B] mb-3">How it works</p>
          <h2 className="text-[40px] font-black tracking-[-0.02em] text-white mb-10">Simple. Powerful.<br />Built for buyers.</h2>
          <div className="flex flex-col gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-5">
                <span className="text-xs font-black text-[#6B6B6B] mt-1 w-6 flex-shrink-0">{s.n}</span>
                <div>
                  <div className="font-bold text-white mb-1">{s.title}</div>
                  <p className="text-sm text-[#AFAFAF] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat demo */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#EEEEEE]">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold">Brick AI</span>
            <span className="ml-auto text-[10px] text-[#AFAFAF]">Live demo</span>
          </div>
          <div ref={containerRef} className="h-[380px] overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m._typing ? (
                  <div className="bg-[#F6F6F6] px-3 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0,1,2].map(i => <span key={i} className="tdot" />)}
                  </div>
                ) : (
                  <div className={`max-w-[85%] ${m.role === 'user' ? '' : ''}`}>
                    <div className={`px-3 py-2 rounded-2xl text-sm leading-snug ${
                      m.role === 'ai' ? 'bg-[#F6F6F6] text-black rounded-tl-sm' : 'bg-black text-white rounded-tr-sm'
                    }`}>
                      {m.text}
                    </div>
                    {m.card && (
                      <div className="mt-2 bg-white border border-[#EEEEEE] rounded-xl overflow-hidden text-xs">
                        {m.card.rows.map((r, i) => (
                          <div key={i} className="flex items-center justify-between px-3 py-2 border-b border-[#EEEEEE] last:border-0">
                            <span className="text-[#6B6B6B]">{r.label}</span>
                            {r.badge
                              ? <span className="bg-[#E8F5E9] text-[#1B5E20] font-semibold px-2 py-0.5 rounded-full text-[10px]">{r.badge}</span>
                              : <span className="font-bold">{r.val}</span>
                            }
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-[#EEEEEE]">
            <div className="bg-[#F6F6F6] rounded-full px-4 py-2 text-sm text-[#AFAFAF]">Ask about any suburb or property…</div>
          </div>
        </div>

      </div>
    </section>
  )
}
