'use client'

import { Landmark, Waves, Flame, FileText, Building2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react'

interface Risk {
  category: string
  name?: string
  level?: 'high' | 'medium' | 'low'
  severity?: 'high' | 'medium' | 'low'
  detail?: string
  description?: string
  status?: string
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
    dot: 'bg-[#ff4d4d]',
    label: 'High',
    status: 'text-[#ff4d4d]',
    icon: 'text-[#ff4d4d]',
  },
  medium: {
    badge: 'border-[#f0f0f0] bg-[#f9f9f9] text-[#1a1a1a]',
    dot: 'bg-[#f5a623]',
    label: 'Medium',
    status: 'text-[#f5a623]',
    icon: 'text-[#f5a623]',
  },
  low: {
    badge: 'border-[#b7ebd3] bg-[#ecfdf5] text-[#19c37d]',
    dot: 'bg-[#19c37d]',
    label: 'Low',
    status: 'text-[#19c37d]',
    icon: 'text-[#19c37d]',
  },
} as const

// Map risk category keywords → Lucide icon
function getRiskIcon(category: string) {
  const name = category.toLowerCase()
  if (name.includes('flood') || name.includes('water') || name.includes('storm'))
    return Waves
  if (name.includes('bush') || name.includes('fire') || name.includes('flame'))
    return Flame
  if (name.includes('heritage') || name.includes('historic') || name.includes('conservation'))
    return Landmark
  if (name.includes('contract') || name.includes('legal') || name.includes('title'))
    return FileText
  if (name.includes('overlay') || name.includes('zoning') || name.includes('planning'))
    return Building2
  if (name.includes('contamination') || name.includes('hazard') || name.includes('asbestos'))
    return AlertTriangle
  if (name.includes('clear') || name.includes('safe') || name.includes('good'))
    return ShieldCheck
  return HelpCircle
}

export default function RiskSummary({
  overall_rating = 'medium',
  risks = [],
  recommendation,
}: RiskSummaryProps) {
  const overall = LEVEL_STYLES[overall_rating]

  return (
    <div className="text-[#0d0d0d]">
      <div className="mb-3 flex items-center justify-end">
        <span className={`rounded-full border px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.05em] ${overall.badge}`}>
          Overall: {overall.label}
        </span>
      </div>

      <div className="flex flex-col gap-0">
        {risks.map((risk, index) => {
          const categoryName = risk.name ?? risk.category ?? ''
          const levelKey = (risk.level ?? risk.severity ?? 'medium').toLowerCase() as keyof typeof LEVEL_STYLES
          const style = LEVEL_STYLES[levelKey] ?? LEVEL_STYLES.medium
          const detail = risk.detail ?? risk.description ?? risk.status ?? ''
          const Icon = getRiskIcon(categoryName)
          return (
            <div
              key={`${categoryName}-${index}`}
              className="flex items-start gap-3 border-b border-[#f9f9f9] py-3 last:border-b-0"
            >
              <div className={`mt-0.5 flex-shrink-0 ${style.icon}`}>
                <Icon size={16} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[#0d0d0d]">{categoryName}</div>
                {detail && <div className="mt-px text-[12px] text-[#8a8a8a]">{detail}</div>}
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
