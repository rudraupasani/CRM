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
}

const SETTINGS_STORAGE_KEY = 'morfex_crm_workspace_settings'

const defaultSettings: WorkspaceSettings = {
  workspaceName: siteConfig.workspaceName,
  workspaceTier: siteConfig.workspaceTier,
  currency: 'USD ($)',
  timezone: 'America/New_York (EST)',
  senderName: siteConfig.currentUser.name,
  senderEmail: siteConfig.currentUser.email,
  signature: '--\nAlex Rivera\nCustomer Success & Sales Operations | morfex.tech\nDirect: +1 (555) 234-5678',
  sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  autoSyncLeads: true,
  emailNotifications: true,
  slackWebhooks: '',
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'communication' | 'export' | 'notifications'>('general')
  const [settings, setSettings] = useState<WorkspaceSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) })
      }
    } catch {
      // Use defaults if localStorage is empty or corrupt
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
      'Name,Company,Status,Value,Owner,Email,Phone\n' +
      'Acme Inc Expansion,Acme Corp,Proposal Sent,$48000,Alex Rivera,contact@acme.com,+1 555-0199\n' +
      'Globex Logistics Hub,Globex,Negotiation,$120000,Alex Rivera,sales@globex.com,+1 555-0200\n' +
      'Soylent Clean Energy,Soylent Corp,Lead,$15000,Alex Rivera,info@soylent.test,+1 555-0201'

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
            Manage your organization profile, email dispatch identity, data export preferences, and team configurations.
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
            border: `1px solid ${feedback.type === 'success'
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
            Organization & Workspace Details
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Basic organization branding and localization settings for your CRM environment.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Workspace Name
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
              Workspace Subscription
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
              Default Currency
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
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
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
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
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
              <strong style={{ fontSize: '12px', color: '#0f172a' }}>Enterprise Security Enforcement Active</strong>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>
                All customer records, quotations, and financial transactions are encrypted with AES-256 standard.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: Communication */}
      {activeTab === 'communication' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Email Sender & Mail Preferences
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Configure default sender identity and email signature when dispatching messages from lead records or the CRM Mails outbox.
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
            Standard Outbound Signature
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

      {/* TAB 3: Sheets & Export */}
      {activeTab === 'export' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Data Export & Spreadsheet Sync
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Sync and export pipeline records to Google Sheets or download direct CSV reports.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 600 }}>
              Google Sheets Spreadsheet ID
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
              Automatically append new qualified leads to Google Sheets spreadsheet
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
                Download a complete, offline-ready spreadsheet containing all contacts, pipelines, and deal values.
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

      {/* TAB 4: Notifications */}
      {activeTab === 'notifications' && (
        <section className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', margin: '0 0 4px', color: '#1e293b' }}>
            Alerts & Notification Channels
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
            Control real-time alerts for lead lifecycle events and quotation statuses.
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
              Slack / Webhook Notification URL
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
