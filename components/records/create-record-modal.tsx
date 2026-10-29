'use client'

import { CreateQuotationModal } from '@/components/modals/create-quotation-modal'
import { CreateTaskModal } from '@/components/modals/create-task-modal'
import { CreateDealModal } from '@/components/modals/create-deal-modal'
import { CreateContactModal } from '@/components/modals/create-contact-modal'
import { CreateCompanyModal } from '@/components/modals/create-company-modal'
import { CreateSupportModal } from '@/components/modals/create-support-modal'
import type { RecordItem, LeadQuality } from '@/types/crm'
import { siteConfig } from '@/config/site'
import { useState } from 'react'
import { X, Sparkles, Check } from 'lucide-react'

interface CreateRecordModalProps {
  type: string
  onClose: () => void
  onSave: (item: RecordItem) => void
  records?: RecordItem[]
}

export function CreateRecordModal({ type, onClose, onSave, records = [] }: CreateRecordModalProps) {
  // 1. Quotations Modal
  if (type === 'Quotations') {
    return <CreateQuotationModal onClose={onClose} onSave={onSave} />
  }

  // 2. Tasks Modal
  if (type === 'Tasks') {
    return <CreateTaskModal onClose={onClose} onSave={onSave} records={records} />
  }

  // 3. Deals Modal
  if (type === 'Deals') {
    return <CreateDealModal onClose={onClose} onSave={onSave} records={records} />
  }

  // 4. Contacts Modal
  if (type === 'Contacts') {
    return <CreateContactModal onClose={onClose} onSave={onSave} records={records} />
  }

  // 5. Companies Modal
  if (type === 'Companies') {
    return <CreateCompanyModal onClose={onClose} onSave={onSave} />
  }

  // 6. Support Modal
  if (type === 'Support') {
    return <CreateSupportModal onClose={onClose} onSave={onSave} records={records} />
  }

  // 7. Default: Leads & General Inbound Record Modal
  return <LeadCreateForm onClose={onClose} onSave={onSave} type={type} />
}

function LeadCreateForm({
  type,
  onClose,
  onSave,
}: {
  type: string
  onClose: () => void
  onSave: (item: RecordItem) => void
}) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: '100000',
    status: 'New lead',
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#7257e9', fontWeight: 700, textTransform: 'uppercase' }}>
              <Sparkles size={14} /> Inbound Lead Generation
            </div>
            <h2 id="create-title" style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Add New Lead</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Record client requirement, channel attribution, and project investment target.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close form">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="create-form">
          <div className="form-row">
            <label style={{ flex: 1 }}>
              Lead / Client Contact Name *
              <input
                required
                autoFocus
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Vikram Malhotra"
              />
            </label>

            <label style={{ flex: 1 }}>
              Organization / Company Name *
              <input
                required
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder="e.g. FinTrack Logistics Ltd."
              />
            </label>
          </div>

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Work Email Address
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="vikram@company.in"
              />
            </label>

            <label style={{ flex: 1 }}>
              Direct WhatsApp / Phone
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </label>
          </div>

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Lead Channel Source
              <select
                value={form.source}
                onChange={(e) => update('source', e.target.value)}
              >
                <option value="Meta Ads">Meta (Facebook & IG) Ads</option>
                <option value="Google Sheets">Google Sheets Sync</option>
                <option value="Website Form">Website Form</option>
                <option value="LinkedIn Ads">LinkedIn Campaign</option>
                <option value="Custom Webhook">Zapier / Webhook</option>
                <option value="Direct / Manual">Direct Referral / Manual</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Software Requirement
              <select
                value={form.serviceType}
                onChange={(e) => update('serviceType', e.target.value)}
              >
                <option value="Custom Software & ERP">Custom Software & ERP</option>
                <option value="Mobile App (Flutter / React Native)">Mobile App (Flutter / React Native)</option>
                <option value="SaaS MVP Platform">SaaS MVP Platform</option>
                <option value="Client CRM & Billing Portal">Client CRM & Billing Portal</option>
                <option value="AI / Chatbot Automation">AI / Chatbot Automation</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Lead Qualification Stage
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
              >
                <option value="New lead">New Lead</option>
                <option value="Discovery">Discovery Call</option>
                <option value="Qualified">Qualified Requirement</option>
                <option value="Proposal">Proposal Sent</option>
                <option value="Negotiation">Commercial Review</option>
                <option value="Won / Closed">Contract Won (Closed)</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Project Budget / Value (₹) *
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
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
              Quick Deal Presets:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[50000, 100000, 150000, 225000, 500000].map((amt) => (
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

          <label>
            Technical Requirements & Scope Notes
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="e.g. Client needs cloud inventory ERP with automated GST billing and WhatsApp integration."
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
            <button className="primary-button" type="submit" style={{ background: '#7257e9' }}>
              <Check size={16} /> Save Lead Record
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
