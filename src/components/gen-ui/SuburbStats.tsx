'use client'

import type React from 'react'
import { TrendingUp, Activity, Briefcase, DollarSign, GraduationCap, Building2 } from 'lucide-react'

interface SuburbStatsProps {
  suburb?: string
  state?: string
  postcode?: string
  median_price?: number
  median_rent?: number
  annual_growth?: number
  growth_12mo?: number  // alias from Gemini tool call
  clearance_rate?: number
  days_on_market?: number
  stock_on_market?: number
  rental_yield?: number
  vacancy_rate?: number
  crime_rate?: number
  crime_label?: string
  growth_1yr?: number
  growth_5yr?: number
  growth_10yr?: number
  short_term_outlook?: string
  short_term_reason?: string
  long_term_outlook?: string
  long_term_reason?: string
  economic_verdict?: string
  economic_reason?: string
  affordability_verdict?: string
  affordability_reason?: string
  lifestyle_education_verdict?: string
  lifestyle_education_reason?: string
  supply_verdict?: string
  supply_reason?: string
  population?: number
  buyer_profile?: string
}

function formatMillions(value?: number) {
  if (value == null) return '—'
  return `$${(value / 1_000_000).toFixed(2)}M`
}

function formatPercent(value?: number, digits = 1) {
  if (value == null) return '—'
  return `${value.toFixed(digits)}%`
}

function formatGrowth(value?: number) {
  if (value == null) return '—'
  const arrow = value > 0 ? '↑' : value < 0 ? '↓' : '→'
  return `${arrow} ${Math.abs(value).toFixed(1)}%`
}

const OUTLOOK_COLOR: Record<string, string> = {
  Strong: 'text-[#0d0d0d]',
  Moderate: 'text-[#0d0d0d]',
  Neutral: 'text-[#6b6b6b]',
  Weak: 'text-[#b91c1c]',
  Caution: 'text-[#d97706]',
  Challenging: 'text-[#d97706]',
  'Low Risk': 'text-[#16a34a]',
  'High Risk': 'text-[#b91c1c]',
}

const VERDICT_DOT: Record<string, string> = {
  Strong: 'bg-[#16a34a]',
  Moderate: 'bg-[#0d0d0d]',
  Neutral: 'bg-[#c0c0c0]',
  Weak: 'bg-[#b91c1c]',
  Caution: 'bg-[#d97706]',
  Challenging: 'bg-[#d97706]',
  'Low Risk': 'bg-[#16a34a]',
  'High Risk': 'bg-[#b91c1c]',
}

function OutlookCard({
  icon: Icon,
  label,
  verdict,
  reason,
}: {
  icon: React.ElementType
  label: string
  verdict?: string
  reason?: string
}) {
  const color = verdict ? (OUTLOOK_COLOR[verdict] ?? 'text-[#0d0d0d]') : 'text-[#c0c0c0]'
  return (
    <div className="flex-1 rounded-[10px] border border-[#f0f0f0] bg-white p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0d0d]">
        <Icon size={18} strokeWidth={2} className="text-white" />
      </div>
      <div className="mb-1 text-[12px] font-semibold text-[#8a8a8a] uppercase tracking-[0.06em]">{label}</div>
      <div className={`text-[22px] font-black tracking-[-0.03em] leading-none ${color}`}>
        {verdict ?? '—'}
      </div>
      {reason && (
        <div className="mt-2 text-[11px] leading-[1.4] text-[#8a8a8a]">{reason}</div>
      )}
    </div>
  )
}

function FactorRow({
  icon: Icon,
  label,
  verdict,
  reason,
}: {
  icon: React.ElementType
  label: string
  verdict?: string
  reason?: string
}) {
  const textColor = verdict ? (OUTLOOK_COLOR[verdict] ?? 'text-[#0d0d0d]') : 'text-[#c0c0c0]'
  const dotColor = verdict ? (VERDICT_DOT[verdict] ?? 'bg-[#0d0d0d]') : 'bg-[#e0e0e0]'
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4]">
        <Icon size={14} strokeWidth={2} className="text-[#0d0d0d]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#0d0d0d]">{label}</span>
          {verdict && (
            <span className={`flex items-center gap-1 text-[11px] font-semibold ${textColor}`}>
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotColor}`} />
              {verdict}
            </span>
          )}
        </div>
        {reason && <p className="mt-0.5 text-[11px] leading-[1.4] text-[#8a8a8a]">{reason}</p>}
      </div>
    </div>
  )
}

export default function SuburbStats({
  suburb,
  state,
  median_price,
  annual_growth,
  growth_12mo,
  clearance_rate,
  days_on_market,
  rental_yield,
  vacancy_rate,
  stock_on_market,
  crime_rate,
  crime_label,
  growth_1yr,
  growth_5yr,
  growth_10yr,
  short_term_outlook,
  short_term_reason,
  long_term_outlook,
  long_term_reason,
  economic_verdict,
  economic_reason,
  affordability_verdict,
  affordability_reason,
  lifestyle_education_verdict,
  lifestyle_education_reason,
  supply_verdict,
  supply_reason,
  buyer_profile,
}: SuburbStatsProps) {
  const displayGrowth = growth_1yr ?? growth_12mo ?? annual_growth

  const growthColor = displayGrowth == null
    ? 'text-[#0d0d0d]'
    : displayGrowth > 0
      ? 'text-[#19c37d]'
      : displayGrowth < 0
        ? 'text-[#1a1a1a]'
        : 'text-[#8a8a8a]'

  return (
    <div className="text-[#0d0d0d]">
      <div className="text-[16px] font-bold tracking-[-0.01em] text-[#0d0d0d]">
        {suburb ?? 'Suburb'}
        {state ? <span className="ml-1 text-[#8a8a8a]">{state}</span> : null}
      </div>

      {/* Growth outlook cards */}
      <div className="mt-[12px] flex gap-[10px]">
        <OutlookCard
          icon={TrendingUp}
          label="1-5 Year Growth"
          verdict={short_term_outlook}
          reason={short_term_reason}
        />
        <OutlookCard
          icon={Activity}
          label="6-15 Year Growth"
          verdict={long_term_outlook}
          reason={long_term_reason}
        />
      </div>

      <div className="mt-[14px] grid grid-cols-4 overflow-hidden rounded-[6px] border border-[#f0f0f0]">
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatMillions(median_price)}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Median price</div>
        </div>
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className={`text-[18px] font-bold tracking-[-0.02em] ${growthColor}`}>{formatGrowth(displayGrowth)}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Annual growth</div>
        </div>
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatPercent(clearance_rate, 0)}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Clearance rate</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatPercent(rental_yield, 1)}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Rental yield</div>
        </div>
        <div className="col-span-4 border-t border-[#f0f0f0]" />
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{days_on_market != null ? `${days_on_market}d` : '—'}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Days on market</div>
        </div>
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{vacancy_rate != null ? `${vacancy_rate.toFixed(1)}%` : '—'}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Vacancy rate</div>
        </div>
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{stock_on_market != null ? `${stock_on_market}` : '—'}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Stock on market</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{crime_label ?? (crime_rate != null ? `${crime_rate}/1k` : '—')}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Crime rate</div>
        </div>
      </div>

      {/* Long-term factors */}
      {(economic_verdict || affordability_verdict || lifestyle_education_verdict || supply_verdict) && (
        <div className="mt-[10px] divide-y divide-[#f0f0f0] border-t border-[#f0f0f0]">
          <FactorRow icon={Briefcase} label="Economic" verdict={economic_verdict} reason={economic_reason} />
          <FactorRow icon={DollarSign} label="Affordability" verdict={affordability_verdict} reason={affordability_reason} />
          <FactorRow icon={GraduationCap} label="Lifestyle & Education" verdict={lifestyle_education_verdict} reason={lifestyle_education_reason} />
          <FactorRow icon={Building2} label="Supply Risk" verdict={supply_verdict} reason={supply_reason} />
        </div>
      )}

      {buyer_profile && (
        <div className="mt-[14px] border-t border-[#f0f0f0] pt-3 text-[12px] text-[#8a8a8a]">
          {buyer_profile}
        </div>
      )}
    </div>
  )
}
