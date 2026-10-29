'use client'

import { Plus, ChevronDown, Users, TrendingUp, CircleDollarSign, ClipboardCheck } from 'lucide-react'
import { MetricCard } from './metric-card'
import { PipelineOverview } from './pipeline-overview'
import { RecentActivity } from './recent-activity'
import { siteConfig } from '@/config/site'

interface DashboardViewProps {
  onCreate: () => void
}

export function DashboardView({ onCreate }: DashboardViewProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{currentDate}</p>
          <h1>Good morning, {siteConfig.currentUser.name.split(' ')[0]}</h1>
          <p className="subheading">
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>
        <button className="primary-button" onClick={onCreate}>
          <Plus size={17} /> Create new <ChevronDown size={15} />
        </button>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Total leads"
          value="1,284"
          change="+12.5%"
          icon={Users}
          accent="accent-purple"
        />
        <MetricCard
          label="Pipeline value"
          value="$482,500"
          change="+8.2%"
          icon={TrendingUp}
          accent="accent-blue"
        />
        <MetricCard
          label="Won revenue"
          value="$128,400"
          change="+18.7%"
          icon={CircleDollarSign}
          accent="accent-green"
        />
        <MetricCard
          label="Open tasks"
          value="24"
          change="-4.3%"
          icon={ClipboardCheck}
          accent="accent-orange"
        />
      </div>

      <div className="content-grid">
        <PipelineOverview />
        <RecentActivity />
      </div>
    </>
  )
}
