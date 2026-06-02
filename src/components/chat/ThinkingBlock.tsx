'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface ThinkingBlockProps {
  content: string
  duration?: number   // undefined = still thinking
}

export default function ThinkingBlock({ content, duration }: ThinkingBlockProps) {
  const isThinking = duration === undefined
  // Auto-expand while thinking, auto-collapse when done
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (!isThinking) setExpanded(false)
  }, [isThinking])

  const showContent = expanded && !!content

  return (
    <div className="mb-2 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] overflow-hidden text-xs">
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[#888] hover:text-[#555] transition-colors"
      >
        {isThinking ? (
          <span className="inline-flex items-center gap-1">
            {[0, 150, 300].map(delay => (
              <span
                key={delay}
                className="tdot h-1 w-1 rounded-full bg-[#AFAFAF]"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
            <span className="ml-1">Thinking…</span>
          </span>
        ) : (
          <span>Thought for {duration < 1 ? '<1' : duration.toFixed(1)}s</span>
        )}
        {content && (
          <ChevronDown
            size={12}
            className={`ml-auto flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {showContent && (
        <div className="border-t border-[#EEEEEE] px-3 py-2 text-[#888] leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  )
}
