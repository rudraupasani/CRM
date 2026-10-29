'use client'

import type { LucideIcon } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  accent: 'accent-purple' | 'accent-blue' | 'accent-green' | 'accent-orange'
}

export function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  accent,
}: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-topline">
        <span className={`metric-icon ${accent}`}>
          <Icon size={18} />
        </span>
        <button className="icon-button" aria-label={`${label} options`}>
          <MoreHorizontal size={18} />
        </button>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
        <span className="metric-change">{change}</span>
      </div>
    </div>
  )
}
