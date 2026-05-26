'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Square } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
  isStreaming: boolean
  onStop?: () => void
}

const QUICK_PROMPTS = [
  '🏠 Analyse a property',
  '🎁 Check my grants',
  '💰 Test my budget',
  '🌊 Check flood risk',
  '📊 Suburb report',
]

export default function ChatInput({ onSend, isStreaming, onStop }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isStreaming) inputRef.current?.focus()
  }, [isStreaming])

  function handleSend(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setHasStarted(true)
    setValue('')
  }

  function handleSubmit() {
    if (isStreaming) { onStop?.(); return }
    handleSend(value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); handleSubmit() }
  }

  return (
    <div className="bg-white">
      {/* Quick prompt chips — hide after first message */}
      {!hasStarted && (
        <div className="flex flex-wrap gap-1.5 border-t border-[#EEEEEE] bg-white px-4 pb-2.5 pt-2">
          {QUICK_PROMPTS.map(prompt => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              disabled={isStreaming}
              className="whitespace-nowrap rounded-full border border-[#EEEEEE] bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-[#F6F6F6] disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input row — matches Hero exactly */}
      <div className="flex items-center gap-2 border-t border-[#EEEEEE] bg-white px-4 py-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about suburbs, budgets, grants…"
          disabled={isStreaming}
          className="flex-1 rounded-full bg-[#F6F6F6] px-4 py-2 text-sm outline-none placeholder-[#AFAFAF] disabled:opacity-60"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isStreaming && !value.trim()}
          aria-label={isStreaming ? 'Stop' : 'Send'}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#333] disabled:bg-[#CCCCCC]"
        >
          {isStreaming
            ? <Square className="h-3.5 w-3.5 fill-current" />
            : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
