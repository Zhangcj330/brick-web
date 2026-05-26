'use client'

import ReactMarkdown from 'react-markdown'
import type { ChatMessage } from '@/types/chat'

interface MessageBubbleProps {
  message: ChatMessage
  isStreaming?: boolean
}

export default function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const hasContent = message.content.trim().length > 0
  const showTypingIndicator = !isUser && isStreaming && !hasContent

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
          </>
        )}
      </div>
    </div>
  )
}
