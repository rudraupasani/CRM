'use client'

import { useState } from 'react'
import {
  FileSpreadsheet,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  Globe,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Terminal,
} from 'lucide-react'
import type { RecordItem } from '@/types/crm'

interface LeadSourcesViewProps {
  onAddLeads: (newLeads: RecordItem[]) => void
  records: RecordItem[]
}

export function LeadSourcesView({ onAddLeads, records }: LeadSourcesViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [syncingSheets, setSyncingSheets] = useState(false)
  const [sheetUrl, setSheetUrl] = useState('')
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [simulatingMeta, setSimulatingMeta] = useState(false)
  const [simulatingWebhook, setSimulatingWebhook] = useState(false)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  // 1. Google Sheets Free Sync
  const handleSyncSheets = async () => {
    setSyncingSheets(true)
    setStatusMsg(null)

    try {
      const res = await fetch('/api/sheets/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheetUrl }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Sync failed')
      }

      onAddLeads(data.leads)
      setStatusMsg({
        type: 'success',
        text: `Successfully imported ${data.leads.length} lead(s) from Google Sheets!`,
      })
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: err.message || 'Error syncing Google Sheet',
      })
    } finally {
      setSyncingSheets(false)
      setTimeout(() => setStatusMsg(null), 6000)
    }
  }

  // 2. Meta Ads Simulation (Free 1-Click Test)
  const handleSimulateMetaLead = async () => {
    setSimulatingMeta(true)
    setStatusMsg(null)

    try {
      const sampleNames = ['Aakash Saxena', 'Rohan Mehra', 'Deepika Nair', 'Sanjay Bhattacharya']
      const sampleCompanies = ['TechnoSphere Dynamics', 'CloudScale Logix', 'Zenith Retail Apps', 'OmniPay FinTech']
      const sampleServices = ['Custom ERP & Cloud Dashboard', 'SaaS MVP Development', 'Mobile App (Flutter/React Native)', 'AI Workflow Automation']
      const sampleBudgets = ['₹1,50,000', '₹1,00,000', '₹2,50,000', '₹1,80,000']

      const randIdx = Math.floor(Math.random() * sampleNames.length)

      const res = await fetch('/api/webhooks/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          name: sampleNames[randIdx],
          company: sampleCompanies[randIdx],
          email: `${sampleNames[randIdx].toLowerCase().replace(' ', '.')}@example.com`,
          phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
          value: sampleBudgets[randIdx],
          serviceType: sampleServices[randIdx],
          campaign: 'Instagram Story Ad - ₹1 Lakh Software Solutions',
          notes: 'User submitted Meta Lead Ad instant form inquiring about high-scale custom software development.',
        }),
      })

      const data = await res.json()
      if (data.success && data.lead) {
        onAddLeads([data.lead])
        setStatusMsg({
          type: 'success',
          text: `🎉 Live Meta Ad Lead Received: ${data.lead.name} (${data.lead.company}) - Value: ${data.lead.value}`,
        })
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error simulating Meta lead' })
    } finally {
      setSimulatingMeta(false)
      setTimeout(() => setStatusMsg(null), 6000)
    }
  }

  // 3. Webhook Simulation
  const handleSimulateWebhook = async () => {
    setSimulatingWebhook(true)
    setStatusMsg(null)

    try {
      const res = await fetch('/api/leads/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Nitin Kapoor',
          company: 'Nexus Supply Chain Ltd.',
          email: 'nitin@nexussupply.in',
          phone: '+91 99887 66554',
          value: '₹1,60,000',
          serviceType: 'B2B Logistics Portal & Barcode Scanner App',
          source: 'Zapier / Landing Page',
          campaign: 'Google Ads Search - Custom Software Development',
          notes: 'Inquiry received via Zapier webhook trigger from landing page contact form.',
        }),
      })

      const data = await res.json()
      if (data.success && data.leads) {
        onAddLeads(data.leads)
        setStatusMsg({
          type: 'success',
          text: `⚡ Inbound Webhook Lead Created: Nitin Kapoor (Nexus Supply Chain) - Value: ₹1,60,000`,
        })
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Webhook simulation failed' })
    } finally {
      setSimulatingWebhook(false)
      setTimeout(() => setStatusMsg(null), 6000)
    }
  }

  const sampleCsvDownload = () => {
    const csvContent =
      'Name,Company,Email,Phone,Value,Status,Service,Notes\n' +
      'Vikram Seth,Seth Logistics,vikram@sethlogistics.com,+91 98111 22334,₹1,50,000,New lead,Fleet Tracking ERP,Looking for GPS dispatch portal\n' +
      'Pooja Hegde,CarePlus Clinic,pooja@careplus.in,+91 97222 33445,₹1,00,000,Qualified,Patient Management CRM,Needs appointment booking and WhatsApp reminders\n' +
      'Arun Kumar,FinVantage Tech,arun@finvantage.io,+91 99333 44556,₹2,00,000,Proposal,Wealth App Development,React Native mobile application'

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'crm_google_sheets_template.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://your-crm-domain.com'

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Marketing & Automation</p>
          <h1>Lead Sources & Integrations</h1>
          <p className="subheading">
            Connect Google Sheets, Meta (Facebook & Instagram) Ads, Webhooks, and Landing page forms to automatically generate leads for your software company (₹1,00,000+ IT deals).
          </p>
        </div>
      </div>

      {statusMsg && (
        <div
          style={{
            padding: '12px 18px',
            marginBottom: '24px',
            borderRadius: '10px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: statusMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
            color: statusMsg.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${statusMsg.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
            fontWeight: 500,
          }}
        >
          {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Integration Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* CARD 1: Google Sheets */}
        <div className="panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#dcfce7', display: 'grid', placeItems: 'center', color: '#16a34a' }}>
                  <FileSpreadsheet size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Google Sheets Sync</h3>
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>100% Free · No API Key Required</span>
                </div>
              </div>
              <span className="status-pill" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                Ready
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
              Import spreadsheet rows directly into your CRM. Simply make your Google Sheet viewable via link, or paste its public export URL.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                Google Sheet URL (or leave blank to load demo leads)
              </label>
              <input
                type="text"
                placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs.../edit"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '7px',
                  padding: '9px 12px',
                  fontSize: '12px',
                  width: '100%',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className="primary-button"
                onClick={handleSyncSheets}
                disabled={syncingSheets}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <RefreshCw size={14} className={syncingSheets ? 'animate-spin' : ''} />
                {syncingSheets ? 'Syncing Sheet...' : 'Sync Google Sheet'}
              </button>
              <button
                className="secondary-button"
                onClick={sampleCsvDownload}
                title="Download sample spreadsheet format"
                style={{ fontSize: '12px' }}
              >
                Sample CSV
              </button>
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HelpCircle size={13} />
              <span>Tip: Set Sheet to &quot;Anyone with link can view&quot; or &quot;Publish to web as CSV&quot;.</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Meta Lead Ads */}
        <div className="panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#e0e7ff', display: 'grid', placeItems: 'center', color: '#4338ca' }}>
                  <Share2 size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Meta (Facebook & IG) Ads</h3>
                  <span style={{ fontSize: '11px', color: '#4338ca', fontWeight: 600 }}>Real-Time Webhook · Free Tier</span>
                </div>
              </div>
              <span className="status-pill" style={{ background: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' }}>
                Active Webhook
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
              Receive instant leads whenever someone submits your Facebook or Instagram Lead Ad form.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Meta Webhook Callback URL:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <code style={{ flex: 1, background: '#f1f5f9', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', wordBreak: 'break-all' }}>
                    {origin}/api/webhooks/meta
                  </code>
                  <button
                    className="secondary-button"
                    style={{ padding: '6px 8px' }}
                    onClick={() => copyToClipboard(`${origin}/api/webhooks/meta`, 'metaUrl')}
                  >
                    {copiedKey === 'metaUrl' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Verify Token:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <code style={{ flex: 1, background: '#f1f5f9', padding: '6px 10px', borderRadius: '6px', fontSize: '11px' }}>
                    crm_meta_token_free
                  </code>
                  <button
                    className="secondary-button"
                    style={{ padding: '6px 8px' }}
                    onClick={() => copyToClipboard('crm_meta_token_free', 'metaToken')}
                  >
                    {copiedKey === 'metaToken' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className="primary-button"
                onClick={handleSimulateMetaLead}
                disabled={simulatingMeta}
                style={{ flex: 1, justifyContent: 'center', background: '#4338ca' }}
              >
                <Zap size={14} />
                {simulatingMeta ? 'Injecting Lead...' : '⚡ Test Meta Lead (1-Click)'}
              </button>
              <a
                href="https://developers.facebook.com/tools/lead-ads-testing"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
                style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                Meta Test Tool <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* CARD 3: Universal Marketing Webhook */}
        <div className="panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef3c7', display: 'grid', placeItems: 'center', color: '#d97706' }}>
                  <Zap size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Universal Webhook API</h3>
                  <span style={{ fontSize: '11px', color: '#d97706', fontWeight: 600 }}>Zapier · Make.com · WordPress · Webflow</span>
                </div>
              </div>
              <span className="status-pill" style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}>
                REST POST
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
              Send leads from any landing page, custom form, LinkedIn Ad campaign, or Zapier/Make automation scenario.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
                Webhook Endpoint:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <code style={{ flex: 1, background: '#f1f5f9', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', wordBreak: 'break-all' }}>
                  {origin}/api/leads/webhook
                </code>
                <button
                  className="secondary-button"
                  style={{ padding: '6px 8px' }}
                  onClick={() => copyToClipboard(`${origin}/api/leads/webhook`, 'webhookUrl')}
                >
                  {copiedKey === 'webhookUrl' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className="secondary-button"
                onClick={handleSimulateWebhook}
                disabled={simulatingWebhook}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Zap size={14} color="#d97706" />
                {simulatingWebhook ? 'Triggering...' : '⚡ Simulate Inbound Lead'}
              </button>
              <a
                href="https://www.make.com/"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
                style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                Make.com Free <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* CARD 4: Public Software Requirement Lead Form */}
        <div className="panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f3e8ff', display: 'grid', placeItems: 'center', color: '#7e22ce' }}>
                  <Globe size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Public Client Inquiry Form</h3>
                  <span style={{ fontSize: '11px', color: '#7e22ce', fontWeight: 600 }}>Hosted Live · Share with Clients</span>
                </div>
              </div>
              <span className="status-pill" style={{ background: '#faf5ff', color: '#7e22ce', border: '1px solid #e9d5ff' }}>
                Public URL
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
              Share this dedicated project quote page directly with prospective clients. Submissions automatically appear in your CRM with full project scope & budget.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
                Shareable Link:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <code style={{ flex: 1, background: '#f1f5f9', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', wordBreak: 'break-all' }}>
                  {origin}/lead-form
                </code>
                <button
                  className="secondary-button"
                  style={{ padding: '6px 8px' }}
                  onClick={() => copyToClipboard(`${origin}/lead-form`, 'formUrl')}
                >
                  {copiedKey === 'formUrl' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="/lead-form"
                target="_blank"
                rel="noreferrer"
                className="primary-button"
                style={{ flex: 1, justifyContent: 'center', background: '#7e22ce', textDecoration: 'none' }}
              >
                <ExternalLink size={14} /> Open Public Form
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Guide & Setup Reference */}
      <section className="panel" style={{ padding: '24px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', margin: '0 0 6px', color: '#0f172a' }}>
          Free API Setup & Resource Links
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px' }}>
          Everything you need to link your marketing channels without paying any third-party subscription fees:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '14px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Share2 size={16} color="#4338ca" /> Meta Developers Portal
            </h4>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px', lineHeight: 1.4 }}>
              Register your Facebook App for free to receive Lead Ads webhooks directly.
            </p>
            <a
              href="https://developers.facebook.com/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '12px', color: '#4338ca', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              developers.facebook.com <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '14px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} color="#4338ca" /> Meta Lead Ads Testing Tool
            </h4>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px', lineHeight: 1.4 }}>
              Official free Meta sandbox to test lead form submissions to your webhook without spending ad budget.
            </p>
            <a
              href="https://developers.facebook.com/tools/lead-ads-testing"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '12px', color: '#4338ca', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              developers.facebook.com/tools/lead-ads-testing <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '14px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileSpreadsheet size={16} color="#16a34a" /> Google Cloud Console
            </h4>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px', lineHeight: 1.4 }}>
              Enable Google Sheets API for automated service account access (Free tier).
            </p>
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              console.cloud.google.com <ExternalLink size={12} />
            </a>
          </div>

        </div>
      </section>

      {/* Live Pipeline Feed of Leads by Source */}
      <section className="panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Inbound Lead Activity Across Channels</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Real-time records captured from Meta Ads, Google Sheets, Forms, and Webhooks
            </p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
            {records.length} Total Records
          </span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Lead / Client</th>
                <th>Company</th>
                <th>Channel Source</th>
                <th>Software Requirement</th>
                <th>Deal Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.slice(0, 8).map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.name}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{record.email || record.phone || '—'}</div>
                  </td>
                  <td>{record.company}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background:
                          record.source === 'Meta Ads'
                            ? '#e0e7ff'
                            : record.source === 'Google Sheets'
                              ? '#dcfce7'
                              : record.source === 'Website Lead Form'
                                ? '#f3e8ff'
                                : '#f1f5f9',
                        color:
                          record.source === 'Meta Ads'
                            ? '#3730a3'
                            : record.source === 'Google Sheets'
                              ? '#166534'
                              : record.source === 'Website Lead Form'
                                ? '#6b21a8'
                                : '#334155',
                      }}
                    >
                      {record.source || 'Direct'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {record.serviceType || 'IT / Software Solution'}
                  </td>
                  <td>
                    <strong style={{ color: '#0f172a' }}>{record.value || '₹1,00,000'}</strong>
                  </td>
                  <td>
                    <span className="status-pill">{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

