'use client'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const MapPanel = dynamic(() => import('./MapPanel'), { ssr: false })

type Message = { role: 'ai' | 'user'; text: string; waitlistLink?: boolean }

export default function Hero() {
  const [tab, setTab] = useState<'buy' | 'invest'>('buy')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "👋 Hi! I'm Brick. Tell me about the home you're looking for — suburb, budget, must-haves." }
  ])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, typing])

  function sendChat() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, {
        role: 'ai',
        text: "This feature is currently in development — we're working hard to bring it to you soon. 🚀 Join the waitlist to get early access the moment Brick launches.",
        waitlistLink: true,
      }])
    }, 1200)
  }

  return (
    <section id="hero" className="pt-[66px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#F6F6F6] border border-[#EEEEEE] rounded-full px-4 py-2 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Now in build · Join the waitlist
          </div>

          <h1 className="text-[52px] md:text-[64px] font-black leading-[1.0] tracking-[-0.03em] mb-6">
            Australia's AI buyer's agent<br />for first-home buyers.
          </h1>
          <p className="text-[#6B6B6B] text-lg leading-relaxed mb-8 max-w-md">
            Brick AI gives first-home buyers the clarity, data, and negotiation edge to buy right — without the guesswork.
          </p>

          {/* Tab switch */}
          <div className="flex gap-2 mb-6">
            {(['buy', 'invest'] as const).map(t => (
              <button key={t} id={`tab-${t}`}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === t ? 'bg-black text-white' : 'bg-[#F6F6F6] text-black hover:bg-[#EEEEEE]'}`}
              >
                {t === 'buy' ? 'Buy' : 'Invest'}
              </button>
            ))}
          </div>

          {/* Chat widget */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#EEEEEE]">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold tracking-tight">Brick AI</span>
              <span className="ml-auto text-[10px] text-[#AFAFAF]">Online</span>
            </div>
            <div ref={chatRef} className="h-[140px] overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                    m.role === 'ai' ? 'bg-[#F6F6F6] text-black rounded-tl-sm' : 'bg-black text-white rounded-tr-sm'
                  }`}>
                    {m.text}
                    {m.waitlistLink && (
                      <Link href="/waitlist" className="block mt-1.5 font-semibold underline underline-offset-2 hover:text-[#333]">
                        Join the waitlist →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[#F6F6F6] px-3 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0,1,2].map(i => <span key={i} className="tdot" />)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-3 border-t border-[#EEEEEE]">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Ask about suburbs, budgets, grants…"
                className="flex-1 bg-[#F6F6F6] rounded-full px-4 py-2 text-sm outline-none placeholder-[#AFAFAF]"
              />
              <button onClick={sendChat} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#333] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Link href="/waitlist" className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-[#333] transition-colors text-sm">
              Join waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 border border-[#EEEEEE] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#F6F6F6] transition-colors text-sm">
              See how it works
            </a>
          </div>
        </div>

        {/* Right — Map */}
        <div className="min-h-[560px]">
          <MapPanel />
        </div>

      </div>
    </section>
  )
}
