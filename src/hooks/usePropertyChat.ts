'use client'

import { useState, useCallback, useRef } from 'react'
import type { ChatMessage, GenUIBlock, WarningEvent, SSEEvent } from '@/types/chat'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export function usePropertyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [genUIBlocks, setGenUIBlocks] = useState<GenUIBlock[]>([])
  const [activeWarnings, setActiveWarnings] = useState<WarningEvent[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionId = useRef(crypto.randomUUID())
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    setError(null)
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMsg])

    const assistantId = crypto.randomUUID()
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, assistantMsg])
    setIsStreaming(true)

    abortRef.current = new AbortController()

    try {
      const allMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages, session_id: sessionId.current }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (!raw) continue

          let event: SSEEvent
          try {
            event = JSON.parse(raw)
          } catch {
            continue
          }

          if (event.type === 'text_delta') {
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId
                  ? { ...m, content: m.content + event.content }
                  : m
              )
            )
          } else if (event.type === 'tool_call') {
            const block: GenUIBlock = {
              id: event.id,
              name: event.name,
              args: event.args,
              updatedAt: Date.now(),
            }
            // Replace existing block of same tool type, or append
            setGenUIBlocks(prev => {
              const idx = prev.findIndex(b => b.name === event.name)
              if (idx >= 0) {
                const next = [...prev]
                next[idx] = block
                return next
              }
              return [...prev, block]
            })
          } else if (event.type === 'sources') {
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId
                  ? { ...m, sources: event.items }
                  : m
              )
            )
          } else if (event.type === 'warning') {
            setActiveWarnings(prev => [...prev, { level: event.level, text: event.text }])
          } else if (event.type === 'error') {
            setError(event.message)
          } else if (event.type === 'done') {
            break
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }, [messages, isStreaming])

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const clearWarnings = useCallback(() => {
    setActiveWarnings([])
  }, [])

  return {
    messages,
    genUIBlocks,
    activeWarnings,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
    clearWarnings,
  }
}
