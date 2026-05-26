'use client'

interface Risk {
  category: string
  level: 'high' | 'medium' | 'low'
  detail: string
}

interface RiskSummaryProps {
  address?: string
  suburb?: string
  overall_rating?: 'high' | 'medium' | 'low'
  risks?: Risk[]
  recommendation?: string
}

const LEVEL_STYLES = {
  high: {
    badge: 'border-[#0d0d0d] bg-[#0d0d0d] text-white',
    dot: 'bg-[#0d0d0d]',
    label: 'High',
    status: 'text-[#8a8a8a]',
  },
  medium: {
    badge: 'border-[#f0f0f0] bg-[#f9f9f9] text-[#1a1a1a]',
    dot: 'bg-[#8a8a8a]',
    label: 'Medium',
    status: 'text-[#1a1a1a]',
  },
  low: {
    badge: 'border-[#b7ebd3] bg-[#ecfdf5] text-[#19c37d]',
    dot: 'bg-[#0d0d0d]',
    label: 'Low',
    status: 'text-[#8a8a8a]',
  },
} as const

export default function RiskSummary({
  overall_rating = 'medium',
  risks = [],
  recommendation,
}: RiskSummaryProps) {
  const overall = LEVEL_STYLES[overall_rating]

  return (
    <div className="text-[#0d0d0d]">
      <div className="mb-3 flex items-center justify-between">
        <div />
        <span className={`rounded-full border px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.05em] ${overall.badge}`}>
          {overall.label}
        </span>
      </div>

      <div className="flex flex-col gap-0">
        {risks.map((risk, index) => {
          const style = LEVEL_STYLES[risk.level]
          return (
            <div
              key={`${risk.category}-${index}`}
              className="flex items-center gap-3 border-b border-[#f9f9f9] py-3 last:border-b-0"
            >
              <span className={`h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[#0d0d0d]">{risk.category}</div>
                <div className="mt-px text-[12px] text-[#8a8a8a]">{risk.detail}</div>
              </div>
              <div className={`shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] ${style.status}`}>
                {style.label}
              </div>
            </div>
          )
        })}
      </div>

      {recommendation && (
        <div className="mt-1 border-t border-[#f0f0f0] pt-3 text-[13px] text-[#8a8a8a]">
          Brick&apos;s take: {recommendation}
        </div>
      )}
    </div>
  )
}
