const STATS = [
  { num: '50k+', label: 'Homes analysed' },
  { num: '4.9★', label: 'Average rating' },
  { num: '$18k', label: 'Avg. savings found' },
  { num: '3 min', label: 'Time to first insight' },
]

export default function StatsBar() {
  return (
    <div className="border-y border-[#EEEEEE] px-10 py-0 bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} className={`py-5 text-center ${i < 3 ? 'border-r border-[#EEEEEE]' : ''}`}>
            <div className="text-2xl font-black tracking-tight">{s.num}</div>
            <div className="text-xs text-[#6B6B6B] mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
