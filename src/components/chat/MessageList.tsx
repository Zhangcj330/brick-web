'use client'

import { useEffect, useRef } from 'react'
import { Home } from 'lucide-react'
import type { ChatMessage } from '@/types/chat'
import MessageBubble from './MessageBubble'

interface MessageListProps {
  messages: ChatMessage[]
  isStreaming: boolean
}

export default function MessageList({ messages, isStreaming }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: messages.length > 1 ? 'smooth' : 'auto' })
  }, [messages, isStreaming])

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-white py-4">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center select-none">
          <Home className="h-8 w-8 text-gray-300" strokeWidth={1.75} />
          <p className="text-[15px] font-medium text-[#0d0d0d]">Hi, I&apos;m Brick — your buyer&apos;s agent</p>
          <p className="text-sm text-[#8a8a8a]">Tell me what you&apos;re looking for</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
            />
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
