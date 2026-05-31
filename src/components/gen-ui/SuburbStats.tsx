'use client'

import { useEffect, useRef } from 'react'

interface SuburbStatsProps {
  suburb?: string
  state?: string
  median_price?: number
  median_rent?: number
  annual_growth?: number
  clearance_rate?: number
  days_on_market?: number
  stock_on_market?: number
  rental_yield?: number
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function SuburbStats({
  suburb,
  state,
  median_price,
  annual_growth,
  clearance_rate,
  days_on_market,
  rental_yield,
  stock_on_market,
  buyer_profile,
}: SuburbStatsProps) {
  const barRefs = useRef<Array<HTMLDivElement | null>>([])

  const bars = [
    {
      label: 'Days on market',
      width: days_on_market == null ? 0 : clamp((days_on_market / 90) * 100, 0, 100),
      value: days_on_market == null ? '—' : `${days_on_market} days`,
    },
    {
      label: 'Rental yield',
      width: rental_yield == null ? 0 : clamp((rental_yield / 8) * 100, 0, 100),
      value: rental_yield == null ? '—' : `${rental_yield.toFixed(1)}%`,
    },
    {
      label: 'Stock on market',
      width: stock_on_market == null ? 0 : clamp((stock_on_market / 500) * 100, 0, 100),
      value: stock_on_market == null ? '—' : `${stock_on_market}`,
    },
  ]

  useEffect(() => {
    barRefs.current.forEach(bar => {
      if (bar) {
        bar.style.width = '0%'
      }
    })

    const timeout = window.setTimeout(() => {
      barRefs.current.forEach((bar, index) => {
        if (bar) {
          bar.style.width = `${bars[index]?.width ?? 0}%`
        }
      })
    }, 40)

    return () => window.clearTimeout(timeout)
  }, [bars])

  const growthColor = annual_growth == null
    ? 'text-[#0d0d0d]'
    : annual_growth > 0
      ? 'text-[#19c37d]'
      : annual_growth < 0
        ? 'text-[#1a1a1a]'
        : 'text-[#8a8a8a]'

  return (
    <div className="text-[#0d0d0d]">
      <div className="text-[16px] font-bold tracking-[-0.01em] text-[#0d0d0d]">
        {suburb ?? 'Suburb'}
        {state ? <span className="ml-1 text-[#8a8a8a]">{state}</span> : null}
      </div>

      <div className="mt-[14px] grid grid-cols-4 overflow-hidden rounded-[6px] border border-[#f0f0f0]">
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className="text-[18px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatMillions(median_price)}</div>
          <div className="mt-0.5 text-[11px] text-[#8a8a8a]">Median price</div>
        </div>
        <div className="border-r border-[#f0f0f0] p-3 text-center last:border-r-0">
          <div className={`text-[18px] font-bold tracking-[-0.02em] ${growthColor}`}>{formatGrowth(annual_growth)}</div>
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
      </div>

      <div className="mt-[14px] flex flex-col gap-[10px]">
        {bars.map((bar, index) => (
          <div key={bar.label} className="flex items-center gap-[10px]">
            <div className="min-w-[130px] text-[13px] text-[#0d0d0d]">{bar.label}</div>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#f0f0f0]">
              <div
                ref={element => {
                  barRefs.current[index] = element
                }}
                className="h-full rounded-full bg-[#0d0d0d] transition-[width] duration-700 ease-out"
                style={{ width: 0 }}
              />
            </div>
            <div className="min-w-[52px] text-right text-[13px] font-semibold text-[#0d0d0d]">{bar.value}</div>
          </div>
        ))}
      </div>

      {buyer_profile && (
        <div className="mt-[14px] border-t border-[#f0f0f0] pt-3 text-[12px] text-[#8a8a8a]">
          {buyer_profile}
        </div>
      )}
    </div>
  )
}
