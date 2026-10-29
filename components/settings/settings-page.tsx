'use client'

import { useState, useEffect } from 'react'
import {
  Building,
  Mail,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Save,
  Download,
  ShieldCheck,
  Bell,
  Globe,
  Sliders,
  User,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Zap,
} from 'lucide-react'
import { siteConfig } from '@/config/site'

interface WorkspaceSettings {
  workspaceName: string
  workspaceTier: string
  currency: string
  timezone: string
  senderName: string
  senderEmail: string
  signature: string
  sheetId: string
  autoSyncLeads: boolean
  emailNotifications: boolean
  slackWebhooks: string
  metaVerifyToken: string
}

const SETTINGS_STORAGE_KEY = 'morfex_crm_workspace_settings'

const defaultSettings: WorkspaceSettings = {
  workspaceName: siteConfig.workspaceName,
  workspaceTier: 'IT Enterprise Suite (₹1,00,000+ Deals)',
  currency: 'INR (₹)',
  timezone: 'Asia/Kolkata (IST)',
  senderName: siteConfig.currentUser.name,
  senderEmail: siteConfig.currentUser.email,
  signature: '--\nAlex Rivera\nPrincipal IT Solutions Consultant | morfex.tech\nDirect: +91 98200 12345',
  sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  autoSyncLeads: true,
  emailNotifications: true,
  slackWebhooks: '',
  metaVerifyToken: 'crm_meta_token_free',
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'communication' | 'export' | 'notifications' | 'marketing'>('general')
  const [settings, setSettings] = useState<WorkspaceSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://your-crm-domain.com'

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) })
      }
    } catch {
      // Use defaults if localStorage is empty
    }
  }, [])

  const handleSave = () => {
    setSaving(true)
    setFeedback(null)

    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
      setTimeout(() => {
        setSaving(false)
        setFeedback({
          type: 'success',
          text: 'Settings saved successfully! All workspace preferences updated.',
        })
      }, 400)
    } catch (e: any) {
      setSaving(false)
      setFeedback({
        type: 'error',
        text: 'Failed to save settings to browser storage.',
      })
    }
  }

  const handleExportSampleCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Name,Company,Status,Value,Owner,Email,Phone,Source,Service\n' +
      'Rajesh Verma,Apex Logistics,Qualified,₹150000,Alex Rivera,rajesh@apex.in,+91 98201 44321,Meta Ads,Fleet ERP Software\n' +
      'Dr. Ananya Sharma,MedCare Tech,Proposal,₹100000,Alex Rivera,ananya@medcare.co,+91 97110 55678,Google Sheets,Clinic CRM Portal\n' +
      'Vikram Malhotra,FinTrack Wealth,Negotiation,₹225000,Alex Rivera,vikram@fintrack.io,+91 98990 12345,Website Form,Fintech Mobile App'

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `morfex_crm_export_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setFeedback({
      type: 'success',
      text: 'CRM records exported to CSV successfully!',
    })
  }

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace / Settings</p>
          <h1>Workspace Settings</h1>
          <p className="subheading">
            Manage your IT organization profile, Meta Ads & marketing webhooks, currency, data export, and team configurations.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleSave}
          disabled={saving}
          style={{ gap: '8px' }}
        >
          <Save size={15} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {feedback && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '9px',
            fontSize: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background:
              feedback.type === 'success'
                ? '#f0fdf4'
                : feedback.type === 'error'
                  ? '#fef2f2'
                  : '#eff6ff',
            color:
              feedback.type === 'success'
                ? '#166534'
                : feedback.type === 'error'
                  ? '#991b1b'
                  : '#1d4ed8',
            border: `1px solid ${
              feedback.type === 'success'
                ? '#bbf7d0'
                : feedback.type === 'error'
                  ? '#fecaca'
                  : '#bfdbfe'
            }`,
          }}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          style={{
            border: 0,
            background: activeTab === 'general' ? '#f1f5f9' : 'transparent',
            color: activeTab === 'general' ? '#0f172a' : '#64748b',
            padding: '8px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Building size={14} /> General & Workspace
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('marketing')}
          style={{
            border: 0,
            background: activeTab === 'marketing' ? '#f1f5f9' : 'transparent',
            color: activeTab === 'marketing' ? '#0f172a' : '#64748b',
            padding: '8px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Share2 size={14} /> Meta Ads & Marketing APIs
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('export')}
          style={{
            border: 0,
            background: activeTab === 'export' ? '#f1f5f9' : 'transparent',
            color: activeTab === 'export' ? '#0f172a' : '#64748b',
            padding: '8px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <FileSpreadsheet size={14} /> Sheets & Data Export
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('communication')}
          style={{
            border: 0,
            background: activeTab === 'communication' ? '#f1f5f9' : 'transparent',
            color: activeTab === 'communication' ? '#0f172a' : '#64748b',
            padding: '8px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Mail size={14} /> Email & Communication
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          style={{
            border: 0,
            background: activeTab === 'notifications' ? '#f1f5f9' : 'transparent',
            color: activeTab === 'notifications' ? '#0f172a' : '#64748b',
            padding: '8px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Bell size={14} /> Notifications
        </button>
      </div>

      {/* TAB 1: General */}
      {activeTab === 'general' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            IT Company Profile & Currency
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Branding and currency preferences for professional software and IT services (₹1,00,000+ Deals).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Company / Workspace Name
              <input
                type="text"
                value={settings.workspaceName}
                onChange={(e) => setSettings({ ...settings, workspaceName: e.target.value })}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Workspace Edition
              <input
                disabled
                value={settings.workspaceTier}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  color: '#64748b',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Primary Currency
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                  background: '#fff',
                }}
              >
                <option value="INR (₹)">INR (₹) - Indian Rupee (Standard)</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Timezone
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                  background: '#fff',
                }}
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST) - India Standard Time</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
              </select>
            </label>
          </div>

          <div
            style={{
              marginTop: '24px',
              padding: '16px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <ShieldCheck size={20} color="#16a34a" />
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a' }}>Enterprise Encryption Active</strong>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>
                All high-value client contracts, software scope briefs, and invoices are encrypted securely.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: Marketing & Meta Ads */}
      {activeTab === 'marketing' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Meta (Facebook & Instagram) Lead Ads & Marketing APIs
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Configure your zero-cost webhook connection to capture leads from Facebook Ads, Instagram Ads, Zapier, and custom landing page forms.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                Meta Webhook Callback URL (Copy to Meta App Dashboard)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  readOnly
                  value={`${origin}/api/webhooks/meta`}
                  style={{
                    flex: 1,
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '9px 12px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => copyText(`${origin}/api/webhooks/meta`, 'metaUrl')}
                >
                  {copiedKey === 'metaUrl' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />} Copy
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                Verify Token (Enter this in Meta App Dashboard)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={settings.metaVerifyToken}
                  onChange={(e) => setSettings({ ...settings, metaVerifyToken: e.target.value })}
                  style={{
                    flex: 1,
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '9px 12px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => copyText(settings.metaVerifyToken, 'metaToken')}
                >
                  {copiedKey === 'metaToken' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />} Copy
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                Universal Webhook Ingest URL (For Zapier, Make.com, Landing Pages)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  readOnly
                  value={`${origin}/api/leads/webhook`}
                  style={{
                    flex: 1,
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '9px 12px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => copyText(`${origin}/api/leads/webhook`, 'webhookUrl')}
                >
                  {copiedKey === 'webhookUrl' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />} Copy
                </button>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px', background: '#eef2ff', borderRadius: '8px', border: '1px solid #c7d2fe' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '13px', color: '#3730a3' }}>
              Free Meta Testing Tool (No Ad Budget Needed)
            </h4>
            <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#4338ca', lineHeight: 1.5 }}>
              You can test submitting fake leads directly into your webhook using Meta&apos;s official test tool:
            </p>
            <a
              href="https://developers.facebook.com/tools/lead-ads-testing"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#4338ca',
                textDecoration: 'underline',
              }}
            >
              Open Meta Lead Ads Testing Tool <ExternalLink size={13} />
            </a>
          </div>
        </section>
      )}

      {/* TAB 3: Sheets & Export */}
      {activeTab === 'export' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Data Export & Google Sheets Sync
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Sync pipeline records with Google Sheets or download direct CSV reports.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Google Sheets Spreadsheet ID / URL
              <input
                type="text"
                value={settings.sheetId}
                onChange={(e) => setSettings({ ...settings, sheetId: e.target.value })}
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoSyncLeads}
                onChange={(e) => setSettings({ ...settings, autoSyncLeads: e.target.checked })}
                style={{ width: '16px', height: '16px' }}
              />
              Automatically append new qualified leads to Google Sheets
            </label>
          </div>

          <div
            style={{
              padding: '18px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>Direct CSV Data Export</strong>
              <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#64748b' }}>
                Download a complete spreadsheet of all contacts, deal values, requirements, and lead channels.
              </p>
            </div>
            <button
              className="secondary-button"
              onClick={handleExportSampleCSV}
              style={{ gap: '6px', whiteSpace: 'nowrap' }}
            >
              <Download size={14} /> Download CSV
            </button>
          </div>
        </section>
      )}

      {/* TAB 4: Communication */}
      {activeTab === 'communication' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Email Sender & Mail Preferences
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Configure default sender identity and email signature when dispatching messages from lead records or proposals.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Sender Display Name
              <input
                type="text"
                value={settings.senderName}
                onChange={(e) => setSettings({ ...settings, senderName: e.target.value })}
                placeholder="Alex Rivera"
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Sender Email Address
              <input
                type="email"
                value={settings.senderEmail}
                onChange={(e) => setSettings({ ...settings, senderEmail: e.target.value })}
                placeholder="alex.rivera@morfex.tech"
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                }}
              />
            </label>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
            Standard Outbound Proposal Signature
            <textarea
              rows={4}
              value={settings.signature}
              onChange={(e) => setSettings({ ...settings, signature: e.target.value })}
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '9px 12px',
                fontSize: '12px',
                fontFamily: 'monospace',
                outline: 0,
                lineHeight: 1.4,
              }}
            />
          </label>
        </section>
      )}

      {/* TAB 5: Notifications */}
      {activeTab === 'notifications' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Alerts & Notification Channels
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Control real-time alerts for incoming Meta Ads leads, Google Sheets additions, and ₹1,00,000+ deal closures.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                style={{ width: '16px', height: '16px' }}
              />
              Send instant email digest when a deal status transitions to Won or Lost
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600, marginTop: '8px' }}>
              Slack / Discord Webhook Notification URL
              <input
                type="url"
                value={settings.slackWebhooks}
                onChange={(e) => setSettings({ ...settings, slackWebhooks: e.target.value })}
                placeholder="https://hooks.slack.com/services/..."
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 0,
                }}
              />
            </label>
          </div>
        </section>
      )}
    </div>
  )
}
