'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { LayoutDashboard, Menu, RefreshCw } from 'lucide-react'
import { usePropertyChat } from '@/hooks/usePropertyChat'
import { getSupabase } from '@/lib/supabase'
import MessageList from '@/components/chat/MessageList'
import ChatInput from '@/components/chat/ChatInput'
import WarningBanner from '@/components/chat/WarningBanner'
import GenUIPanel from '@/components/gen-ui/GenUIPanel'

function ChatPageContent({ onReset }: { onReset: () => void }) {
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    getSupabase().auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email || ''
      setUserName(name)
      setUserAvatar(user.user_metadata?.avatar_url || user.user_metadata?.picture || '')
    })
  }, [])

  const initials = userName
    ? userName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const {
    messages,
    genUIBlocks,
    activeWarnings,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
    clearWarnings,
  } = usePropertyChat()

  const panelsRef = useRef<HTMLDivElement>(null)
  const chatPanelRef = useRef<HTMLElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const [mobileReportFocus, setMobileReportFocus] = useState(false)

  useEffect(() => {
    const handle = handleRef.current
    const panels = panelsRef.current
    const chatPanel = chatPanelRef.current
    if (!handle || !panels || !chatPanel) return

    let dragging = false

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      dragging = true
      handle.classList.add('dragging')
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      const rect = panels.getBoundingClientRect()
      let newW = e.clientX - rect.left
      newW = Math.min(Math.max(newW, 280), rect.width * 0.7)
      panels.style.setProperty('--chat-w', `${newW}px`)
      chatPanel.style.width = `${newW}px`
    }

    const onMouseUp = () => {
      dragging = false
      handle.classList.remove('dragging')
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    handle.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      handle.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --black: #0d0d0d;
          --white: #ffffff;
          --bg: #ffffff;
          --line: #e5e5e5;
          --grey-50: #f9f9f9;
          --grey-100: #f0f0f0;
          --grey-200: #e5e5e5;
          --grey-300: #d0d0d0;
          --grey-400: #ababab;
          --grey-500: #8a8a8a;
          --grey-800: #1a1a1a;
          --accent: #19c37d;
          --accent-soft: #f0fdf7;
          --accent-mid: #d1fae5;
          --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color-scheme: light;
        }

        html,
        body {
          background: var(--white);
          color: var(--black);
          font-family: var(--font);
        }

        body {
          overflow: hidden;
        }

        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--white);
          color: var(--black);
          font-family: var(--font);
        }

        .topbar {
          height: 52px;
          background: var(--white);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          border-bottom: 1px solid var(--line);
          flex-shrink: 0;
        }

        .topbar-left,
        .topbar-right {
          display: flex;
          align-items: center;
          min-width: 0;
        }

        .topbar-left {
          gap: 10px;
        }

        .topbar-right {
          gap: 10px;
        }

        .topbar-fill {
          flex: 1;
        }

        .menu-btn,
        .refresh-btn,
        .mobile-swap-button {
          transition: all 160ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-btn {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--grey-500);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .menu-btn:hover,
        .refresh-btn:hover,
        .mobile-swap-button:hover {
          background: var(--grey-100);
          color: var(--black);
        }

        .menu-btn:focus-visible,
        .refresh-btn:focus-visible,
        .mobile-swap-button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--black);
        }

        .topbar-brand {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--black);
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .topbar-brand::before {
          content: '';
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: var(--black);
          flex-shrink: 0;
        }

        .report-label {
          font-size: 12px;
          color: var(--grey-500);
          white-space: nowrap;
        }

        .topbar-divider {
          color: var(--line);
          font-size: 14px;
        }

        .topbar-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--grey-800);
          white-space: nowrap;
        }

        .topbar-avatar {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #9b5de5 0%, #f15bb5 100%);
          color: var(--white);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .panels {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          --chat-w: 42%;
        }

        .chat-panel {
          width: var(--chat-w);
          min-width: 280px;
          max-width: 70%;
          flex-shrink: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--white);
          min-height: 0;
          border-right: 1px solid var(--line);
        }

        .chat-header {
          height: 52px;
          padding: 0 16px;
          background: var(--white);
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .chat-header-copy {
          flex: 1;
          min-width: 0;
        }

        .chat-header-title {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--black);
          padding: 4px 8px;
          border-radius: 8px;
          cursor: default;
        }

        .chat-header-title::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid var(--grey-400);
          margin-left: 2px;
        }

        .refresh-btn {
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--grey-500);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .chat-alerts {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 12px 16px 0;
          background: var(--white);
          flex-shrink: 0;
        }

        .chat-alerts > div {
          border-radius: 10px;
          border-color: var(--line) !important;
          background: #fff8e7 !important;
          color: var(--grey-800) !important;
        }

        .chat-alerts > div button {
          color: var(--grey-500);
        }

        .chat-error {
          margin: 12px 16px 0;
          border-radius: 10px;
          border: 1px solid #f3d0d0;
          background: #fff5f5;
          color: #a52a2a;
          padding: 10px 12px;
          font-size: 12px;
          line-height: 1.5;
          flex-shrink: 0;
        }

        .chat-feed {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          background: var(--white);
        }

        .chat-feed strong {
          color: var(--black) !important;
        }

        .chat-feed code {
          background: var(--grey-100) !important;
          color: var(--black) !important;
        }

        .chat-feed [class*='bg-\[#E8522A\]'] {
          background: var(--black) !important;
        }

        .chat-input-shell {
          flex-shrink: 0;
          background: var(--white);
        }

        .resize-handle {
          width: 5px;
          flex-shrink: 0;
          background: var(--grey-100);
          cursor: col-resize;
          position: relative;
          z-index: 10;
          transition: background 120ms;
        }

        .resize-handle:hover,
        .resize-handle.dragging {
          background: var(--grey-300);
        }

        .resize-handle::after {
          content: '';
          position: absolute;
          inset: 0 -4px;
        }

        .report-canvas-wrap {
          flex: 1;
          min-width: 0;
          min-height: 0;
          background: var(--white);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .mobile-swap-button {
          display: none;
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--grey-100);
          background: var(--white);
          padding: 10px 16px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--grey-500);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          flex-shrink: 0;
        }

        .mobile-swap-grip {
          width: 40px;
          height: 4px;
          border-radius: 999px;
          background: var(--grey-200);
          display: inline-block;
        }

        .report-canvas {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
          background: var(--grey-50);
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--line);
          flex-shrink: 0;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--grey-500);
        }

        .report-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 4px;
          color: var(--black);
        }

        .report-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-soft);
          border: 1px solid var(--accent-mid);
          border-radius: 20px;
          padding: 4px 12px;
          white-space: nowrap;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--accent);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.8);
          }
        }

        .report-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--grey-400);
          text-align: center;
          padding: 40px;
          min-height: 240px;
        }

        .report-empty p {
          margin: 0;
          font-size: 14px;
        }

        .report-generated {
          min-height: 0;
        }

        .report-generated > div {
          padding: 0 !important;
          overflow: visible !important;
          height: auto !important;
          gap: 14px !important;
        }

        .report-generated > div > div > div {
          border-radius: 12px;
          border: 1px solid var(--line) !important;
          background: var(--white) !important;
          color: var(--black) !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .report-generated [class*='text-white'] {
          color: var(--grey-800) !important;
        }

        .report-generated [class*='border-white'] {
          border-color: var(--line) !important;
        }

        .report-generated [class*='bg-black/70'] {
          background: rgba(13, 13, 13, 0.72) !important;
        }

        .report-generated a {
          color: var(--black) !important;
        }

        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--grey-200);
          border-radius: 999px;
        }

        @media (max-width: 767px) {
          .panels {
            flex-direction: column;
          }

          .resize-handle {
            display: none;
          }

          .chat-panel {
            width: 100% !important;
            min-width: 0;
            max-width: none;
            height: 50%;
            border-right: 0;
            border-bottom: 1px solid var(--grey-100);
          }

          .report-canvas-wrap {
            height: 50%;
          }

          .mobile-swap-button {
            display: inline-flex;
          }

          .app.mobile-report-focus .chat-panel {
            height: 35%;
          }

          .app.mobile-report-focus .report-canvas-wrap {
            height: 65%;
          }

          .report-label,
          .topbar-divider {
            display: none;
          }

          .report-canvas {
            padding: 16px;
          }

          .report-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className={`app${mobileReportFocus ? ' mobile-report-focus' : ''}`}>
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-btn" type="button" aria-label="Open menu">
              <Menu size={18} />
            </button>
            <div className="topbar-brand">Brick AI</div>
          </div>

          <div className="topbar-fill" />

          <div className="topbar-right">
            <div className="report-label">Property Report</div>
            <div className="topbar-divider">|</div>
            <div className="topbar-name">{userName || '…'}</div>
            {userAvatar
              ? <img src={userAvatar} alt={initials} className="topbar-avatar" style={{ objectFit: 'cover' }} />
              : <div className="topbar-avatar" aria-hidden="true">{initials}</div>
            }
          </div>
        </header>

        <div className="panels" ref={panelsRef} style={{ '--chat-w': '42%' } as CSSProperties}>
          <section className="chat-panel" ref={chatPanelRef} aria-label="Chat panel">
            <div className="chat-header">
              <div className="chat-header-copy">
                <div className="chat-header-title" style={{ gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#22c55e', flexShrink: 0, display: 'inline-block' }} />
                  Brick AI
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--grey-500)', whiteSpace: 'nowrap' }}>Online</div>
              <button className="refresh-btn" type="button" aria-label="Reset conversation" onClick={onReset}>
                <RefreshCw size={16} />
              </button>
            </div>

            {activeWarnings.length > 0 && (
              <div className="chat-alerts">
                <WarningBanner warnings={activeWarnings} onDismiss={clearWarnings} />
              </div>
            )}

            {error && <div className="chat-error">⚠️ {error}</div>}

            <div className="chat-feed">
              <MessageList messages={messages} isStreaming={isStreaming} />
            </div>

            <div className="chat-input-shell">
              <ChatInput onSend={sendMessage} isStreaming={isStreaming} onStop={stopStreaming} />
            </div>
          </section>

          <div className="resize-handle" ref={handleRef} title="Drag to resize" />

          <section className="report-canvas-wrap" aria-label="Report canvas">
            <button
              className="mobile-swap-button"
              type="button"
              aria-label="Swap panel focus"
              onClick={() => setMobileReportFocus(current => !current)}
            >
              <span className="mobile-swap-grip" />
              <span>Swap report focus</span>
            </button>

            <div className="report-canvas">
              {genUIBlocks.length === 0 && (
                <div className="report-empty">
                  <LayoutDashboard size={36} strokeWidth={1.5} />
                  <p>Visual insights appear here as you chat</p>
                </div>
              )}

              {genUIBlocks.length > 0 && (
                <div className="report-generated">
                  <GenUIPanel blocks={genUIBlocks} />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default function ChatPage() {
  const [resetKey, setResetKey] = useState(0)

  return <ChatPageContent key={resetKey} onReset={() => setResetKey(current => current + 1)} />
}
