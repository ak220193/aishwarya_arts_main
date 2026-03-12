import React from 'react'

const InsightCard = ({ label, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm flex items-center justify-between group transition-all hover:border-zinc-300">
    <div className="space-y-1.5">
      {/* Small, subtle secondary text */}
      <p className="text-[10px] font-semibold uppercase text-zinc-400 tracking-[0.15em]">
        {label}
      </p>
      {/* Strong, primary semibold text */}
      <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight leading-none">
        {value}
      </h3>
    </div>
    
    {/* Icon container with hover effect */}
    <div className="w-11 h-11 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300 shadow-sm">
      {icon}
    </div>
  </div>
  )
}

export default InsightCard