'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'
import type { RecordItem, LeadQuality } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateRecordModalProps {
  type: string
  onClose: () => void
  onSave: (item: RecordItem) => void
}

export function CreateRecordModal({ type, onClose, onSave }: CreateRecordModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: '100000',
    status:
      type === 'Tasks'
        ? 'Open'
        : type === 'Leads'
          ? 'New lead'
          : 'Active',
    source: 'Direct / Manual',
    serviceType: 'Custom Software & ERP',
    leadQuality: 'Hot' as LeadQuality,
    notes: '',
  })

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const numericVal = Number(form.value.replace(/[^0-9]/g, ''))
    const formattedVal = numericVal ? `₹${numericVal.toLocaleString('en-IN')}` : ''

    onSave({
      ...form,
      id: crypto.randomUUID(),
      owner: siteConfig.currentUser.name,
      value: formattedVal,
      createdAt: new Date().toISOString(),
    })
  }

  const setPresetBudget = (amount: number) => {
    setForm((prev) => ({ ...prev, value: String(amount) }))
  }

  const entityName = type === 'Companies' ? 'company' : type.slice(0, -1).toLowerCase()

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-title"
        style={{ maxWidth: '580px' }}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Workspace / {type}</p>
            <h2 id="create-title">Add {entityName}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close form">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="create-form">
          <div className="form-row">
            <label style={{ flex: 1 }}>
              Name *
              <input
                required
                autoFocus
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Vikram Malhotra"
              />
            </label>

            <label style={{ flex: 1 }}>
              {type === 'Companies' ? 'Industry' : 'Company Name *'}
              <input
                required={type !== 'Tasks'}
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder="e.g. FinTrack Logistics Ltd."
              />
            </label>
          </div>

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="vikram@company.in"
              />
            </label>

            <label style={{ flex: 1 }}>
              Phone / WhatsApp
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </label>
          </div>

          {type === 'Leads' && (
            <div className="form-row">
              <label style={{ flex: 1 }}>
                Lead Source
                <select
                  value={form.source}
                  onChange={(e) => update('source', e.target.value)}
                >
                  <option>Meta Ads</option>
                  <option>Google Sheets</option>
                  <option>Website Form</option>
                  <option>LinkedIn Ads</option>
                  <option>Custom Webhook</option>
                  <option>Direct / Manual</option>
                </select>
              </label>

              <label style={{ flex: 1 }}>
                Software Solution Required
                <select
                  value={form.serviceType}
                  onChange={(e) => update('serviceType', e.target.value)}
                >
                  <option>Custom Software & ERP</option>
                  <option>Mobile App (Flutter / React Native)</option>
                  <option>SaaS MVP Platform</option>
                  <option>Client CRM & Billing Portal</option>
                  <option>AI / Chatbot Automation</option>
                </select>
              </label>
            </div>
          )}

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Pipeline Status
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
              >
                <option>New lead</option>
                <option>Discovery</option>
                <option>Qualified</option>
                <option>Proposal</option>
                <option>Negotiation</option>
                <option>In Development</option>
                <option>Won / Closed</option>
                <option>Lost</option>
                <option>Active</option>
                <option>Open</option>
                <option>Complete</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Project Value / Budget (₹)
              <input
                inputMode="numeric"
                value={form.value}
                onChange={(e) =>
                  update('value', e.target.value.replace(/[^0-9]/g, ''))
                }
                placeholder="100000"
              />
            </label>
          </div>

          {/* Quick budget presets for IT Companies */}
          {type === 'Leads' && (
            <div style={{ marginTop: '-4px', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Quick Deal Presets:
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[50000, 100000, 150000, 250000, 500000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPresetBudget(amt)}
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: form.value === String(amt) ? '1px solid #7257e9' : '1px solid #cbd5e1',
                      background: form.value === String(amt) ? '#f5f3ff' : '#f8fafc',
                      color: form.value === String(amt) ? '#7257e9' : '#475569',
                      fontWeight: form.value === String(amt) ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <label>
            Project Requirement / Client Notes
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="e.g. Client needs cloud inventory ERP with WhatsApp billing integration. Target delivery 45 days."
              style={{
                width: '100%',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '12px',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="primary-button" type="submit">
              Create {entityName}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
