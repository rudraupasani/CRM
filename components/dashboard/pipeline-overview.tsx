'use client'

import { ChevronDown } from 'lucide-react'

export function PipelineOverview() {
  return (
    <section className="panel pipeline-panel">
      <div className="panel-header">
        <div>
          <h2>Pipeline overview</h2>
          <p>Track your deals across every stage.</p>
        </div>
        <button className="select-button">
          Last 30 days <ChevronDown size={14} />
        </button>
      </div>

      <div className="chart-area">
        <div className="y-axis">
          <span>$150k</span>
          <span>$100k</span>
          <span>$50k</span>
          <span>$0</span>
        </div>
        <div className="chart">
          <div className="grid-line line-1" />
          <div className="grid-line line-2" />
          <div className="grid-line line-3" />
          <div className="grid-line line-4" />
          <svg
            viewBox="0 0 700 190"
            preserveAspectRatio="none"
            aria-label="Pipeline trend chart"
          >
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".22" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,148 C55,136 75,151 120,120 S195,128 240,98 S310,110 355,76 S430,90 470,54 S530,70 580,42 S640,53 700,20 L700,190 L0,190Z"
              fill="url(#chart-fill)"
            />
            <path
              d="M0,148 C55,136 75,151 120,120 S195,128 240,98 S310,110 355,76 S430,90 470,54 S530,70 580,42 S640,53 700,20"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
