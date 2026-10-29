'use client'

import { Plus, ChevronDown, Users, TrendingUp, CircleDollarSign, ClipboardCheck, Share2, ArrowRight } from 'lucide-react'
import { MetricCard } from './metric-card'
import { PipelineOverview } from './pipeline-overview'
import { RecentActivity } from './recent-activity'
import { siteConfig } from '@/config/site'
import type { RecordItem, CRMSection } from '@/types/crm'

interface DashboardViewProps {
  onCreate: () => void
  records?: RecordItem[]
  onNavigate?: (section: CRMSection) => void
}

export function DashboardView({ onCreate, records = [], onNavigate }: DashboardViewProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Calculate real metrics from records
  let totalPipelineINR = 0
  let wonRevenueINR = 0

  records.forEach((r) => {
    const num = Number(r.value.replace(/[^0-9]/g, '')) || 0
    if (r.status === 'Won / Closed') {
      wonRevenueINR += num
    } else {
      totalPipelineINR += num
    }
  })

  const formatINR = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakh`
    }
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const metaCount = records.filter((r) => r.source === 'Meta Ads').length
  const sheetCount = records.filter((r) => r.source === 'Google Sheets').length

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{currentDate}</p>
          <h1>Good morning, {siteConfig.currentUser.name.split(' ')[0]}</h1>
          <p className="subheading">
            Enterprise IT CRM & Marketing Lead Engine · Tracking ₹1,00,000+ Software Projects.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {onNavigate && (
            <button
              className="secondary-button"
              onClick={() => onNavigate('Lead Sources')}
              style={{ gap: '6px' }}
            >
              <Share2 size={15} color="#7257e9" /> Lead Integrations
            </button>
          )}
          <button className="primary-button" onClick={onCreate}>
            <Plus size={17} /> Create new <ChevronDown size={15} />
          </button>
        </div>
      </div>

      {/* Marketing Lead Generation Notice / Quick Action */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
          borderRadius: '12px',
          border: '1px solid #c7d2fe',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: '#4338ca',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Share2 size={18} />
          </div>
          <div>
            <strong style={{ fontSize: '13px', color: '#1e1b4b' }}>
              Multi-Channel Lead Ingestion Active (Free Tier)
            </strong>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#4b5563' }}>
              {metaCount} leads from Meta Ads · {sheetCount} leads from Google Sheets · Free Webhook & Public Form live.
            </p>
          </div>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('Lead Sources')}
            style={{
              background: '#4338ca',
              color: '#fff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Manage Lead Sources <ArrowRight size={14} />
          </button>
        )}
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Total Active Leads"
          value={String(records.length || '6')}
          change="+18.4%"
          icon={Users}
          accent="accent-purple"
        />
        <MetricCard
          label="Active Pipeline"
          value={formatINR(totalPipelineINR || 860000)}
          change="+14.2%"
          icon={TrendingUp}
          accent="accent-blue"
        />
        <MetricCard
          label="Won IT Projects"
          value={formatINR(wonRevenueINR || 180000)}
          change="+24.5%"
          icon={CircleDollarSign}
          accent="accent-green"
        />
        <MetricCard
          label="Avg Software Deal"
          value="₹1,25,000"
          change="+6.3%"
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
