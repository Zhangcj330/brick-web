'use client'

import { Check, X } from 'lucide-react'

interface Grant {
  name: string
  amount?: string
  eligible?: boolean
  condition?: string
}

interface GrantsProps {
  buyer_type?: string
  purchase_price?: number
  state?: string
  grants?: Grant[]
  total_potential_savings?: string
}

function formatBuyerType(value?: string) {
  if (!value) return ''
  return value.replace(/_/g, ' ')
}

export default function Grants({
  buyer_type,
  state = 'NSW',
  grants = [],
  total_potential_savings,
}: GrantsProps) {
  const info = [formatBuyerType(buyer_type), state].filter(Boolean).join(' · ')

  return (
    <div className="text-[#0d0d0d]">
      {info && <div className="mb-3 text-[12px] text-[#8a8a8a]">{info}</div>}

      <div className="flex flex-col gap-0">
        {grants.map((grant, index) => {
          const eligible = grant.eligible !== false
          return (
            <div
              key={`${grant.name}-${index}`}
              className={`flex items-center gap-3 border-b border-[#f9f9f9] py-3 last:border-b-0 ${eligible ? '' : 'opacity-50'}`}
            >
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] ${eligible ? 'bg-[#0d0d0d] text-white' : 'bg-[#f9f9f9] text-[#8a8a8a]'}`}
              >
                {eligible ? <Check size={14} /> : <X size={14} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[#0d0d0d]">{grant.name}</div>
                {grant.condition && <div className="mt-px text-[12px] text-[#8a8a8a]">{grant.condition}</div>}
              </div>
              {grant.amount && <div className="shrink-0 whitespace-nowrap text-[13px] font-bold text-[#0d0d0d]">{grant.amount}</div>}
            </div>
          )
        })}
      </div>

      {total_potential_savings && (
        <div className="mt-1 border-t border-[#f0f0f0] pt-3 text-[13px] text-[#8a8a8a]">
          Total savings: <strong className="text-[#0d0d0d]">{total_potential_savings}</strong>
        </div>
      )}
    </div>
  )
}
