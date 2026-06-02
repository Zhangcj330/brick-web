'use client'

import { useState, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import type { ChatMessage, GenUIBlock, WarningEvent, SSEEvent, SourceSupport, SourceItem } from '@/types/chat'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

/** Insert [n] citation markers into text after grounding-supported segments */
function injectCitations(content: string, supports: SourceSupport[], sources: SourceItem[]): string {
  if (!supports.length || !sources.length) return content

  // Build a deduped URL list to get stable [n] numbers
  const urlList = sources.map(s => s.url)

  // Sort by segment text length descending (replace longer matches first to avoid nested issues)
  const sorted = [...supports].sort((a, b) => b.text.length - a.text.length)

  let result = content
  for (const support of sorted) {
    if (!support.text || !support.source_indices.length) continue
    const idx = support.source_indices[0]
    if (idx >= urlList.length) continue
    const citNum = idx + 1
    const escaped = support.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Only replace first occurrence, append [n] if not already annotated
    result = result.replace(new RegExp(`(${escaped})(?!\\s*\\[${citNum}\\])`), `$1 [${citNum}]`)
  }
  return result
}

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
            if (event.thinking) {
              flushSync(() => setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, thinking: (m.thinking ?? '') + event.content }
                    : m
                )
              ))
            } else {
              flushSync(() => setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, content: m.content + event.content }
                    : m
                )
              ))
            }
          } else if (event.type === 'thinking_done') {
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId
                  ? { ...m, thinkingDuration: event.duration }
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
            flushSync(() => setGenUIBlocks(prev => [...prev, block]))
          } else if (event.type === 'sources') {
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId
                  ? { ...m, sources: [...(m.sources ?? []), ...event.items] }
                  : m
              )
            )
          } else if (event.type === 'supports') {
            setMessages(prev =>
              prev.map(m => {
                if (m.id !== assistantId) return m
                const updated = { ...m, supports: event.items }
                // Inject [n] citations into content using source_indices
                if (m.sources && m.sources.length > 0) {
                  updated.content = injectCitations(m.content, event.items, m.sources)
                }
                return updated
              })
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
