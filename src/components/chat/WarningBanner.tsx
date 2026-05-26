'use client'

import type { WarningEvent } from '@/types/chat'

interface WarningBannerProps {
  warnings: WarningEvent[]
  onDismiss: () => void
}

const LEVEL_STYLES: Record<WarningEvent['level'], string> = {
  high: 'border-[#ffc107] bg-[#fff3cd] text-[#856404]',
  medium: 'border-[#fde68a] bg-[#fff8e7] text-[#92400e]',
  low: 'border-[#a5d6a7] bg-[#e8f5e9] text-[#2e7d32]',
}

const LEVEL_LABELS: Record<WarningEvent['level'], string> = {
  high: 'Critical alert',
  medium: 'Notice',
  low: 'Info',
}

export default function WarningBanner({ warnings, onDismiss }: WarningBannerProps) {
  if (warnings.length === 0) return null

  const rank: Record<WarningEvent['level'], number> = { high: 0, medium: 1, low: 2 }
  const topWarning = warnings.reduce((a, b) => (rank[a.level] <= rank[b.level] ? a : b))

  return (
    <div className={`flex items-start gap-3 rounded-[8px] border px-3 py-2.5 text-[13px] ${LEVEL_STYLES[topWarning.level]}`}>
      <span className="mt-0.5 flex-shrink-0 text-sm">⚠️</span>
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 font-semibold">
          {LEVEL_LABELS[topWarning.level]}
          {warnings.length > 1 ? ` · ${warnings.length} issues` : ''}
        </p>
        <p className="leading-[1.5]">{topWarning.text}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss warnings"
        className="flex-shrink-0 text-base leading-none text-current/60 transition-opacity hover:text-current"
      >
        ✕
      </button>
    </div>
  )
}
