'use client'

import { useState, useEffect } from 'react'
import { X, Trash2, Check } from 'lucide-react'
import type { RecordItem, LeadQuality } from '@/types/crm'

interface EditRecordModalProps {
  record: RecordItem | null
  type?: string
  onClose: () => void
  onSave: (updatedRecord: RecordItem) => void
  onDelete?: (id: string) => void
}

export function EditRecordModal({
  record,
  type = 'Record',
  onClose,
  onSave,
  onDelete,
}: EditRecordModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: '',
    status: 'Qualified',
    owner: 'Alex Rivera',
    source: 'Direct / Manual',
    serviceType: 'Custom Software & ERP',
    leadQuality: 'Hot' as LeadQuality,
    notes: '',
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (record) {
      setForm({
        name: record.name || '',
        company: record.company || '',
        email: record.email || '',
        phone: record.phone || '',
        value: record.value ? record.value.replace(/[^0-9]/g, '') : '',
        status: record.status || 'Qualified',
        owner: record.owner || 'Alex Rivera',
        source: record.source || 'Direct / Manual',
        serviceType: record.serviceType || 'Custom Software & ERP',
        leadQuality: record.leadQuality || 'Hot',
        notes: record.notes || '',
      })
      setConfirmDelete(false)
    }
  }, [record])

  if (!record) return null

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const numVal = Number(form.value.replace(/[^0-9]/g, ''))
    const formatted = numVal ? `₹${numVal.toLocaleString('en-IN')}` : ''

    onSave({
      ...record,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
      owner: form.owner,
      source: form.source,
      serviceType: form.serviceType,
      leadQuality: form.leadQuality,
      notes: form.notes,
      value: formatted,
    })
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    if (onDelete) {
      onDelete(record.id)
      onClose()
    }
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
        aria-labelledby="edit-title"
        style={{ maxWidth: '580px' }}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Workspace / Edit</p>
            <h2 id="edit-title">Edit {record.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close edit modal">
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
                placeholder="Full name or company name"
              />
            </label>

            <label style={{ flex: 1 }}>
              Company / Organization
              <input
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder="e.g. Acme Inc."
              />
            </label>
          </div>

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="name@company.com"
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

          <div className="form-row">
            <label style={{ flex: 1 }}>
              Lead Source
              <select
                value={form.source}
                onChange={(e) => update('source', e.target.value)}
              >
                <option value="Meta Ads">Meta Ads</option>
                <option value="Google Sheets">Google Sheets</option>
                <option value="Website Form">Website Form</option>
                <option value="LinkedIn Ads">LinkedIn Ads</option>
                <option value="Custom Webhook">Custom Webhook</option>
                <option value="Direct / Manual">Direct / Manual</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Software Solution
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
              Status
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
              >
                <option value="New lead">New lead</option>
                <option value="Discovery">Discovery</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="In Development">In Development</option>
                <option value="Won / Closed">Won / Closed</option>
                <option value="Lost">Lost</option>
                <option value="Active">Active</option>
                <option value="Open">Open</option>
                <option value="Complete">Complete</option>
              </select>
            </label>

            <label style={{ flex: 1 }}>
              Deal Value (₹)
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

          <label>
            Assigned Account Owner
            <select
              value={form.owner}
              onChange={(e) => update('owner', e.target.value)}
            >
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Sales team">Sales team</option>
              <option value="Engineering Desk">Engineering Desk</option>
            </select>
          </label>

          <label>
            Notes & Project Requirements
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Requirement details..."
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

          <div className="modal-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            {onDelete ? (
              <button
                type="button"
                className="secondary-button"
                style={{
                  color: confirmDelete ? '#e53e3e' : '#8993a2',
                  borderColor: confirmDelete ? '#feb2b2' : undefined,
                  background: confirmDelete ? '#fff5f5' : undefined,
                }}
                onClick={handleDelete}
              >
                <Trash2 size={15} />
                {confirmDelete ? 'Confirm delete?' : 'Delete'}
              </button>
            ) : <span />}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="secondary-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="primary-button" type="submit">
                <Check size={16} /> Save changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
