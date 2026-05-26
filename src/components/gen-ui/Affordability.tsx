'use client'

import { useEffect, useState } from 'react'

interface AffordabilityProps {
  purchase_price?: number
  deposit?: number
  loan_amount?: number
  interest_rate?: number
  monthly_repayment?: number
  annual_income_required?: number
  stamp_duty?: number
  upfront_costs?: number
  lvr?: number
  lmi_applicable?: boolean
}

function formatCurrency(value?: number) {
  if (value == null) return '—'
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  return `$${value.toLocaleString()}`
}

function formatMonthly(value?: number) {
  if (value == null) return '—'
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K/mo`
  return `$${value.toLocaleString()}/mo`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function Affordability({
  purchase_price,
  deposit,
  loan_amount,
  monthly_repayment,
  annual_income_required,
  stamp_duty,
  upfront_costs,
  lvr,
  lmi_applicable,
}: AffordabilityProps) {
  const [isReady, setIsReady] = useState(false)
  const lvrWidth = lvr == null ? 0 : clamp(lvr, 0, 100)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [lvrWidth])

  const breakdownRows = [
    stamp_duty != null ? { label: 'Stamp duty', value: formatCurrency(stamp_duty) } : null,
    upfront_costs != null ? { label: 'Upfront costs', value: formatCurrency(upfront_costs) } : null,
    annual_income_required != null ? { label: 'Annual income required', value: formatCurrency(annual_income_required) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  return (
    <div className="text-[#0d0d0d]">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[6px] bg-[#f9f9f9] p-3">
          <div className="text-[12px] text-[#8a8a8a]">Purchase price</div>
          <div className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatCurrency(purchase_price)}</div>
        </div>
        <div className="rounded-[6px] bg-[#f9f9f9] p-3">
          <div className="text-[12px] text-[#8a8a8a]">Deposit</div>
          <div className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatCurrency(deposit)}</div>
        </div>
        <div className="rounded-[6px] bg-[#f9f9f9] p-3">
          <div className="text-[12px] text-[#8a8a8a]">Monthly repayment</div>
          <div className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatMonthly(monthly_repayment)}</div>
        </div>
        <div className="rounded-[6px] bg-[#f9f9f9] p-3">
          <div className="text-[12px] text-[#8a8a8a]">Loan amount</div>
          <div className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-[#0d0d0d]">{formatCurrency(loan_amount)}</div>
        </div>
      </div>

      <div className="mt-[14px]">
        <div className="mb-[6px] flex items-center justify-between gap-3">
          <div className="text-[13px] text-[#0d0d0d]">Loan to value ratio</div>
          <div className="text-[13px] font-bold text-[#0d0d0d]">{lvr == null ? '—' : `${lvr}% LVR`}</div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#f0f0f0]">
          <div
            className="h-full rounded-full bg-[#0d0d0d] transition-[width] duration-700 ease-out"
            style={{ width: `${isReady ? lvrWidth : 0}%` }}
          />
        </div>
        <div className="mt-[6px] text-[12px] text-[#8a8a8a]">
          {lmi_applicable == null
            ? 'LMI outcome depends on lender policy and final structure.'
            : lmi_applicable
              ? 'LMI may apply at this LVR.'
              : 'No LMI is expected at this LVR.'}
        </div>
      </div>

      {breakdownRows.length > 0 && (
        <div className="mt-[14px] border-t border-[#f0f0f0] pt-[14px]">
          {breakdownRows.map((row, index) => (
            <div
              key={`${row.label}-${index}`}
              className="flex items-center justify-between gap-3 border-b border-[#f9f9f9] py-2 last:border-b-0"
            >
              <span className="text-[13px] text-[#8a8a8a]">{row.label}</span>
              <span className="text-right text-[14px] font-semibold text-[#0d0d0d]">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
