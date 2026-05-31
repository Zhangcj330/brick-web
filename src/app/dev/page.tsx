'use client'

import PropertyCard from '@/components/gen-ui/PropertyCard'
import SuburbStats from '@/components/gen-ui/SuburbStats'
import Affordability from '@/components/gen-ui/Affordability'
import RiskSummary from '@/components/gen-ui/RiskSummary'
import Grants from '@/components/gen-ui/Grants'
import Comparison from '@/components/gen-ui/Comparison'
import StreetView from '@/components/gen-ui/StreetView'

// ─── Mock data ────────────────────────────────────────────────────────────────

const PROPERTY_CARD = {
  address: '22 Addison Avenue',
  suburb: 'Roseville',
  state: 'NSW',
  postcode: '2069',
  price: '$2,450,000',
  bedrooms: 4,
  bathrooms: 2,
  carspaces: 2,
  land_size: '612m²',
  property_type: 'House',
  images: [
    'https://images.allhomes.com.au/property/photo/3128381b4e0d0b5db3ee48d16340b05c_hd.jpg',
    'https://images.allhomes.com.au/property/photo/7899dc7c7875fd29f806971043355d72_hd.jpg',
    'https://images.allhomes.com.au/property/photo/c0a6d3dff427d960fb135ecb4260c461_hd.jpg',
    'https://images.allhomes.com.au/property/photo/5fe9d43b44ee37ab22c3092921d2f695_hd.jpg',
  ],
  listing_url: 'https://www.allhomes.com.au/22-addison-avenue-roseville-nsw-2069',
  warnings: ['Heritage overlay may restrict renovations'],
  // Street check
  on_main_road: false,
  main_road_note: 'Quiet tree-lined residential street — minimal traffic',
  powerlines_nearby: false,
  powerlines_note: 'No high-voltage infrastructure identified',
  t_junction: false,
  t_junction_note: 'No T-junction concern',
  orientation: 'North-facing',
  sunlight_note: 'North-facing rear garden — excellent natural light year-round (ideal in Australia)',
  // Condition
  kitchen_condition: 'Fair',
  bathroom_condition: 'Poor',
  renovation_needed: true,
  renovation_note: 'Original 1970s bathroom tiles and dated kitchen — budget $60–90k for full refresh',
  // Risk
  land_slope: 'Gentle Slope',
  land_slope_note: 'Slight rear slope — check retaining walls and drainage',
  noise_level: 'Low',
  noise_sources: ['Some traffic from Pacific Hwy 400m west'],
  noise_note: 'Generally quiet — no flight path or rail line impact',
  builder_name: undefined,
  builder_quality: 'Unknown',
  builder_note: 'Older 1970s brick construction — no known builder defects',
  property_history_flags: ['Heritage conservation area — check council DCP before any works'],
  property_history_note: 'No flood risk; heritage overlay may limit renovation scope',
  needs_inspection: true,
  needs_pest_control: true,
  due_diligence_note: 'Pre-purchase building + pest inspection strongly recommended — older brick construction with unknown structural history',
}

const SUBURB_STATS = {
  suburb: 'Surry Hills',
  state: 'NSW',
  postcode: '2010',
  median_price: 1_450_000,
  growth_12mo: 7.4,
  clearance_rate: 74,
  days_on_market: 22,
  rental_yield: 3.2,
  vacancy_rate: 1.44,
  stock_on_market: 161,
  crime_rate: 58,
  crime_label: 'Low',
  growth_1yr: 7.3,
  growth_5yr: 48.1,
  growth_10yr: 66.5,
  short_term_outlook: 'Strong',
  short_term_reason: 'Low vacancy rate and tight days-on-market signal strong renter and buyer demand.',
  long_term_outlook: 'Strong',
  long_term_reason: 'Impressive 48% 5-year growth and inner-city land scarcity underpin resilient long-term capital appreciation.',
  economic_verdict: 'Strong',
  economic_reason: 'Walking distance to Sydney CBD employment hub; planned light rail expansion and tech precinct at Surry Hills increasing job density.',
  affordability_verdict: 'Challenging',
  affordability_reason: 'Median price-to-income ratio of ~11x sits above the 7–8x affordability threshold; high rental costs also strain first-home buyers.',
  lifestyle_education_verdict: 'Strong',
  lifestyle_education_reason: 'Cleveland Street Selective catchment, excellent walkability score (98), thriving café and arts culture, strong public transport connectivity.',
  buyer_profile: 'Popular with young professionals and first-home buyers seeking inner-city lifestyle.',
}

const AFFORDABILITY = {
  purchase_price: 1_200_000,
  deposit: 240_000,
  loan_amount: 960_000,
  monthly_repayment: 5_800,
  annual_income_required: 145_000,
  stamp_duty: 48_500,
  upfront_costs: 310_000,
  lvr: 80,
  lmi_applicable: false,
}

const RISK_SUMMARY = {
  overall_rating: 'medium' as const,
  risks: [
    { category: 'Flood risk', severity: 'low' as const, description: 'Property is outside the 1-in-100 year flood zone.' },
    { category: 'Bushfire', severity: 'low' as const, description: 'Not in a mapped bushfire prone area.' },
    { category: 'Heritage overlay', severity: 'high' as const, description: 'Heritage conservation area — council approval required for exterior changes.' },
    { category: 'Contract risk', severity: 'medium' as const, description: 'Section 149 certificate shows minor stormwater easement.' },
    { category: 'Zoning overlay', severity: 'low' as const, description: 'R2 Low Density Residential — standard single dwelling.' },
  ],
  recommendation: 'The heritage overlay is the main watch-out. Get legal advice before planning any renovations.',
}

const GRANTS = {
  state: 'NSW',
  buyer_type: 'first_home_buyer',
  grants: [
    { name: 'First Home Owner Grant', amount: '$10,000', eligible: true, condition: 'New builds under $750k' },
    { name: 'First Home Buyer Assistance', amount: '$24,740', eligible: true, condition: 'Stamp duty exemption under $800k' },
    { name: 'Help to Buy Scheme', amount: 'Equity top-up', eligible: true, condition: 'Income under $90k single / $120k couple' },
    { name: 'First Home Super Saver', amount: 'Up to $50,000', eligible: true, condition: 'Voluntary super contributions released' },
    { name: 'Foreign Investor Surcharge', amount: '—', eligible: false, condition: 'Not applicable — Australian citizen' },
  ],
  total_potential_savings: '$34,740',
}

const COMPARISON = {
  properties: [
    {
      address: '22 Addison Ave, Roseville',
      price: 2_450_000,
      bedrooms: 4,
      bathrooms: 2,
      land_size: '612m²',
      score: 85,
      pros: ['Large backyard', 'Quiet street', 'Good school zone'],
      cons: ['Heritage overlay', 'Dated kitchen'],
    },
    {
      address: '14 Boundary Rd, Wahroonga',
      price: 2_300_000,
      bedrooms: 4,
      bathrooms: 3,
      land_size: '550m²',
      score: 78,
      pros: ['Updated bathrooms', 'Corner block'],
      cons: ['Busy road noise', 'Smaller yard'],
    },
    {
      address: '8 Pacific Hwy, Pymble',
      price: 2_150_000,
      bedrooms: 3,
      bathrooms: 2,
      land_size: '490m²',
      score: 71,
      pros: ['Best value', 'Near train'],
      cons: ['Only 3 bed', 'Highway proximity'],
    },
  ],
  recommended_index: 0,
}

const STREET_VIEW = {
  address: '22 Addison Avenue, Roseville NSW 2069',
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8a8a]">{title}</div>
      <div className="overflow-hidden rounded-[12px] border border-[#f0f0f0] bg-white p-4 shadow-sm">
        {children}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DevComponentsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-10">
      <div className="mx-auto max-w-[420px]">
        <div className="mb-8">
          <div className="text-[22px] font-bold tracking-[-0.02em] text-[#0d0d0d]">Component Preview</div>
          <div className="mt-1 text-[13px] text-[#8a8a8a]">All gen-ui widgets with mock data · dev only</div>
        </div>

        <div className="flex flex-col gap-6">
          <Section title="Property Card — show_property_card">
            <PropertyCard {...PROPERTY_CARD} />
          </Section>

          <Section title="Suburb Stats — show_suburb_stats">
            <SuburbStats {...SUBURB_STATS} />
          </Section>

          <Section title="Affordability — show_affordability">
            <Affordability {...AFFORDABILITY} />
          </Section>

          <Section title="Risk Summary — show_risk_summary">
            <RiskSummary {...RISK_SUMMARY} />
          </Section>

          <Section title="Grants & Schemes — show_grants">
            <Grants {...GRANTS} />
          </Section>

          <Section title="Property Comparison — show_comparison">
            <Comparison {...COMPARISON} />
          </Section>

          <Section title="Street View — show_street_view">
            <StreetView {...STREET_VIEW} />
          </Section>
        </div>

        <div className="mt-8 text-center text-[11px] text-[#cccccc]">
          /dev/components · not linked in production
        </div>
      </div>
    </div>
  )
}
