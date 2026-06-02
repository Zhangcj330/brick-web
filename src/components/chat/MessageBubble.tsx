'use client'

import ReactMarkdown from 'react-markdown'
import type { ChatMessage } from '@/types/chat'
import ThinkingBlock from './ThinkingBlock'

interface MessageBubbleProps {
  message: ChatMessage
  isStreaming?: boolean
}

export default function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const hasContent = message.content.trim().length > 0
  const hasThinking = !!message.thinking
  const showTypingIndicator = !isUser && isStreaming && !hasContent && !hasThinking

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-1">
        <div className="max-w-[80%] break-words rounded-2xl rounded-tr-sm bg-black px-3 py-2 text-sm leading-snug text-white">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start px-4 py-1">
      <div className="max-w-[80%] break-words rounded-2xl rounded-tl-sm bg-[#F6F6F6] px-3 py-2 text-sm leading-snug text-black">
        {showTypingIndicator ? (
          <span className="inline-flex items-center gap-1 py-1">
            {[0, 150, 300].map(delay => (
              <span
                key={delay}
                className="tdot h-1.5 w-1.5 rounded-full bg-[#AFAFAF]"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </span>
        ) : (
          <>
            {/* Thinking block — shown during round 0 and collapses after */}
            {hasThinking && (
              <ThinkingBlock
                content={message.thinking!}
                duration={message.thinkingDuration}
              />
            )}
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="mb-2 list-disc pl-4 last:mb-0">{children}</ul>,
                ol: ({ children }) => <ol className="mb-2 list-decimal pl-4 last:mb-0">{children}</ol>,
                li: ({ children }) => <li className="mb-0.5 last:mb-0">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                a: ({ children, href }) => (
                  <a href={href} className="underline underline-offset-2">{children}</a>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-xs">{children}</code>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            {isStreaming && hasContent && (
              <span className="inline-block w-0.5 h-3.5 bg-black ml-0.5 align-middle animate-[chat-cursor-blink_0.8s_step-end_infinite]" />
            )}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-black/10">
              <p className="text-[10px] font-semibold text-[#AFAFAF] uppercase tracking-wide mb-1.5">Sources</p>
              <div className="flex flex-wrap gap-1.5">
                {message.sources.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white border border-[#E5E5E5] rounded-full px-2.5 py-1 text-[11px] font-medium text-[#3A3A3A] hover:border-black hover:text-black transition-colors"
                  >
                    <span className="text-[10px] font-bold text-[#AFAFAF]">[{i + 1}]</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40 flex-shrink-0">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {s.title || (s.url ? new URL(s.url).hostname.replace('www.', '') : 'Source')}
                  </a>
                ))}
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  )
}
