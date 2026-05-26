'use client'

import { useState } from 'react'
import {
  BarChart3,
  Building2,
  Camera,
  Calculator,
  ChevronDown,
  Gift,
  Home,
  MapPinned,
  ShieldAlert,
} from 'lucide-react'
import type { GenUIBlock } from '@/types/chat'
import PropertyCard from './PropertyCard'
import MapView from './MapView'
import SuburbStats from './SuburbStats'
import Affordability from './Affordability'
import RiskSummary from './RiskSummary'
import StreetView from './StreetView'
import Grants from './Grants'
import Comparison from './Comparison'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>

type BlockMeta = {
  title: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  subtitle?: (args: AnyProps) => string | undefined
}

const COMPONENT_REGISTRY: Record<string, React.ComponentType<AnyProps>> = {
  show_property_card: PropertyCard,
  show_map: MapView,
  show_suburb_stats: SuburbStats,
  show_affordability: Affordability,
  show_risk_summary: RiskSummary,
  show_street_view: StreetView,
  show_grants: Grants,
  show_comparison: Comparison,
}

const BLOCK_META: Record<string, BlockMeta> = {
  show_property_card: { title: 'Property Snapshot', icon: Home, subtitle: args => args.address },
  show_map:           { title: 'Map View',           icon: MapPinned, subtitle: args => args.suburb },
  show_suburb_stats:  { title: 'Suburb Snapshot',    icon: Building2, subtitle: args => [args.suburb, args.state].filter(Boolean).join(' · ') || undefined },
  show_affordability: { title: 'Affordability',      icon: Calculator, subtitle: () => 'Based on your numbers' },
  show_risk_summary:  { title: 'Risk Assessment',    icon: ShieldAlert, subtitle: args => args.address ?? args.suburb },
  show_street_view:   { title: 'Street View',        icon: Camera, subtitle: args => args.address },
  show_grants:        { title: 'Grants & Concessions', icon: Gift, subtitle: args => [args.state, args.buyer_type?.replace(/_/g, ' ')].filter(Boolean).join(' · ') || undefined },
  show_comparison:    { title: 'Property Comparison', icon: BarChart3, subtitle: args => Array.isArray(args.properties) ? `${args.properties.length} properties` : undefined },
}

interface GenUIPanelProps {
  blocks: GenUIBlock[]
}

export default function GenUIPanel({ blocks }: GenUIPanelProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (blocks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 select-none text-[#CCCCCC]">
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="4" width="18" height="18" rx="3" fill="currentColor" opacity=".5" />
          <rect x="26" y="4" width="18" height="18" rx="3" fill="currentColor" opacity=".3" />
          <rect x="4" y="26" width="18" height="18" rx="3" fill="currentColor" opacity=".3" />
          <rect x="26" y="26" width="18" height="18" rx="3" fill="currentColor" opacity=".5" />
        </svg>
        <p className="text-sm text-[#AAAAAA]">Visual insights appear here as you chat</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map(block => {
        const Component = COMPONENT_REGISTRY[block.name]
        const meta = BLOCK_META[block.name]
        if (!Component || !meta) return null

        const Icon = meta.icon
        const subtitle = meta.subtitle?.(block.args)
        const isCollapsed = collapsed.has(block.id)

        return (
          <div
            key={block.id}
            className="animate-fade-in overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm"
            style={{ animationDuration: '250ms' }}
          >
            {/* Header — click to toggle */}
            <button
              type="button"
              onClick={() => toggle(block.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#FAFAFA]"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#F6F6F6] text-[#555]">
                <Icon size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-black">{meta.title}</div>
                {subtitle && <div className="truncate text-[11px] text-[#999]">{subtitle}</div>}
              </div>
              <ChevronDown
                size={15}
                className={`flex-shrink-0 text-[#BBBBBB] transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
              />
            </button>

            {/* Body — collapses */}
            {!isCollapsed && (
              <div className="border-t border-[#F0F0F0] p-4">
                <Component {...block.args} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
