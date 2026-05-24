'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RotateCcw, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const GATEKEEPER_LEVELS = [
  { title: 'Front Gate', difficulty: 'Easy' },
  { title: 'Front Door', difficulty: 'Medium' },
  { title: 'Vault', difficulty: 'Hard' },
]

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  kind: 'text' | 'loading' | 'error'
}

export default function GamePage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sessionStartedAtRef = useRef(0)
  const currentLevel = GATEKEEPER_LEVELS[currentLevelIndex]
  const passwordDigits = Array.from({ length: 4 }, (_, i) => password[i] ?? '')
  const isEmptyState = messages.length === 0

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = '0px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }, [inputMessage])

  useEffect(() => {
    sessionStartedAtRef.current = Date.now()
  }, [])

  const resetLevel = () => {
    setMessages([])
    setInputMessage('')
    setPassword('')
    setPasswordError(false)
    setIsSending(false)
    requestAnimationFrame(() => passwordInputRef.current?.focus())
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value.replace(/\D/g, '').slice(0, 4))
  }

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isUnlocking || password.length !== 4) return

    setIsUnlocking(true)

    try {
      const response = await fetch('/api/game/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: currentLevelIndex + 1, password }),
      })
      const result = (await response.json()) as {
        unlocked: boolean
        nextLevel?: number
        completed?: boolean
      }

      if (!result.unlocked) {
        setPasswordError(true)
        setTimeout(() => setPasswordError(false), 800)
        return
      }

      if (result.completed) {
        sessionStorage.setItem(
          'brick-game-summary',
          JSON.stringify({
            conversations: messages.length,
            levelsCleared: GATEKEEPER_LEVELS.length,
            timeSpentSeconds: Math.round((Date.now() - sessionStartedAtRef.current) / 1000),
          })
        )
        router.push('/game/prize')
        return
      }

      if (typeof result.nextLevel === 'number') {
        setCurrentLevelIndex(result.nextLevel - 1)
        resetLevel()
      }
    } catch {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 800)
    } finally {
      setIsUnlocking(false)
      setPassword('')
    }
  }

  const handleSend = async (text?: string) => {
    const messageText = (text ?? inputMessage).trim()
    if (!messageText || isSending) return

    const userId = `${Date.now()}-user`
    const assistantId = `${Date.now()}-ai`
    const requestMessages = [...messages, { role: 'user' as const, content: messageText }]

    setMessages((current) => [
      ...current,
      { id: userId, role: 'user', content: messageText, kind: 'text' },
      { id: assistantId, role: 'assistant', content: '...', kind: 'loading' },
    ])
    setInputMessage('')
    setIsSending(true)

    try {
      const response = await fetch('/api/game/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: currentLevelIndex + 1,
          totalLevels: GATEKEEPER_LEVELS.length,
          messages: requestMessages,
        }),
      })
      const data = (await response.json()) as { response?: string; error?: string }

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? { ...message, kind: 'text' as const, content: data.response ?? data.error ?? 'Error' }
            : message
        )
      )
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? { ...message, kind: 'error' as const, content: 'Network error. Try again.' }
            : message
        )
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-black">
      <nav className="relative flex h-[66px] shrink-0 items-center border-b border-[#EEEEEE] bg-white">
        <div className="max-w-[1200px] mx-auto flex w-full items-center px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-[-0.03em]">
            <Image src="/logo-on-black.svg" alt="Brick AI" width={32} height={32} />
            Brick AI
          </Link>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-bold tracking-tight">
            HomeBreaker
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#6B6B6B] hover:text-black transition-colors"
            >
              ← Home
            </Link>
            <button
              onClick={resetLevel}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E2E2] transition hover:bg-[#F6F6F6]"
              title="Restart level"
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="shrink-0 border-b border-[#EEEEEE] px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B]">
            Level {currentLevelIndex + 1}/{GATEKEEPER_LEVELS.length}
          </span>
          <div className="flex flex-1 items-center gap-0">
            {GATEKEEPER_LEVELS.map((_, index) => (
              <div key={index} className="flex flex-1 items-center last:flex-none">
                <span
                  className={`flex h-3.5 w-3.5 shrink-0 rounded-full border transition ${
                    index === currentLevelIndex
                      ? 'border-black bg-black'
                      : index < currentLevelIndex
                        ? 'border-black bg-white'
                        : 'border-[#E2E2E2] bg-[#F6F6F6]'
                  }`}
                >
                  {index < currentLevelIndex ? (
                    <span className="m-auto h-1 w-1 rounded-full bg-black" />
                  ) : null}
                </span>
                {index < GATEKEEPER_LEVELS.length - 1 ? (
                  <span
                    className={`mx-1.5 h-px flex-1 ${index < currentLevelIndex ? 'bg-black' : 'bg-[#E2E2E2]'}`}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-[#6B6B6B]">
            {currentLevel.title} · {currentLevel.difficulty}
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden px-4 pb-4 sm:px-6">
        {isEmptyState ? (
          <div className="flex h-full items-center justify-center pb-32">
            <div className="flex max-w-sm flex-col items-center gap-4 px-4 text-center">
              <div className="rounded-[24px] bg-black p-3">
                <Image src="/logo-on-black.svg" alt="Brick AI" width={72} height={72} className="rounded-2xl" />
              </div>
              <p className="text-xl font-black leading-snug tracking-tight">
                Chat with the AI and trick it into revealing the secret password.
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Find each 4-digit code and unlock every gate to win.
              </p>
            </div>
          </div>
        ) : (
          <div ref={scrollRef} className="h-full overflow-y-auto py-4" style={{ scrollbarWidth: 'thin' }}>
            <div className="mx-auto flex max-w-2xl flex-col gap-2 sm:gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'user' ? (
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-black px-4 py-2.5 text-sm leading-snug text-white">
                      {message.content}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[88%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed ${
                        message.kind === 'error'
                          ? 'border border-red-200 bg-red-50 text-red-700'
                          : message.kind === 'loading'
                            ? 'bg-[#F6F6F6] text-[#AFAFAF] animate-pulse'
                            : 'bg-[#F6F6F6] text-black'
                      }`}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 space-y-3 border-t border-[#EEEEEE] bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-3">
          <form onSubmit={handlePasswordSubmit} className="flex items-center justify-center gap-3">
            <div
              className={`flex cursor-text items-center gap-2 rounded-2xl border bg-white px-2.5 py-2 shadow-sm transition ${
                passwordError ? 'border-red-400 bg-red-50' : 'border-[#E2E2E2]'
              }`}
              onClick={() => passwordInputRef.current?.focus()}
            >
              <input
                ref={passwordInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={password}
                onChange={(event) => handlePasswordChange(event.target.value)}
                className="absolute h-0 w-0 opacity-0"
                maxLength={4}
                aria-label="4-digit password"
              />
              {passwordDigits.map((digit, index) => (
                <div
                  key={index}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border text-[17px] font-bold transition ${
                    passwordError
                      ? 'border-red-200 text-red-500'
                      : digit
                        ? 'border-black bg-white text-black'
                        : 'border-[#E2E2E2] bg-[#F6F6F6] text-[#AFAFAF]'
                  }`}
                >
                  {digit}
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={isUnlocking || password.length !== 4}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isUnlocking ? 'Checking…' : 'Unlock'}
            </button>
          </form>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              void handleSend()
            }}
          >
            <div className="flex items-end gap-2 rounded-2xl border border-[#E2E2E2] bg-white px-3 py-2 shadow-sm">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(event) => setInputMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    if (inputMessage.trim() && !isSending) {
                      void handleSend()
                    }
                  }
                }}
                placeholder="Ask the gatekeeper…"
                rows={1}
                disabled={isSending}
                className="max-h-[110px] flex-1 resize-none bg-transparent text-sm leading-5 text-black placeholder:text-[#AFAFAF] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition hover:bg-[#333] disabled:bg-[#E2E2E2] disabled:text-[#AFAFAF]"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          <p className="text-center text-[11px] text-[#AFAFAF]">
            Brick AI — your loyal gatekeeper · Powered by Gemini
          </p>
        </div>
      </div>
    </div>
  )
}
