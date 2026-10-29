'use client'

import { useState } from 'react'
import { X, LifeBuoy, AlertTriangle, Check, Layers } from 'lucide-react'
import type { RecordItem, TicketSeverity } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateSupportModalProps {
  onClose: () => void
  onSave: (item: RecordItem) => void
  records?: RecordItem[]
}

export function CreateSupportModal({ onClose, onSave, records = [] }: CreateSupportModalProps) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [severity, setSeverity] = useState<TicketSeverity>('P2 - Major Issue')
  const [affectedModule, setAffectedModule] = useState('Client Web Portal')
  const [slaTarget, setSlaTarget] = useState('24 Hours')
  const [notes, setNotes] = useState('')

  const clientCompanies = Array.from(new Set(records.map((r) => r.company).filter(Boolean)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !company.trim()) return

    onSave({
      id: crypto.randomUUID(),
      name: title.trim(),
      company: company.trim(),
      status: 'Open',
      value: 'SLA Active',
      owner: 'Engineering Desk',
      severity,
      affectedModule,
      slaTarget,
      notes,
      createdAt: new Date().toISOString(),
    })
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
        style={{ width: 'min(100%, 540px)', padding: '24px' }}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#e11d48', fontWeight: 700, textTransform: 'uppercase' }}>
              <LifeBuoy size={14} /> Technical Support & Bug Ticket
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Log Support Ticket</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Track technical bug resolutions, production SLA commitments, and feature requests.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label>
            Ticket Summary / Incident Title *
            <input
              required
              autoFocus
              placeholder="e.g. Payment Gateway Webhook Timeout on Razorpay Callback"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Client / Account *
              <input
                required
                list="ticket-companies"
                placeholder="e.g. Zenith Real Estate Group"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <datalist id="ticket-companies">
                {clientCompanies.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>

            <label>
              Affected Component / Module
              <select
                value={affectedModule}
                onChange={(e) => setAffectedModule(e.target.value)}
              >
                <option value="Client Web Portal">Client Web Portal</option>
                <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                <option value="Payment Gateway API">Payment Gateway API</option>
                <option value="Database / Cloud Backend">Database / Cloud Backend</option>
                <option value="SMS / WhatsApp Delivery">SMS / WhatsApp Delivery</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Severity Level
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as TicketSeverity)}
              >
                <option value="P1 - Critical Blocker">🚨 P1 - Critical Blocker (System Down)</option>
                <option value="P2 - Major Issue">⚠️ P2 - Major Functional Issue</option>
                <option value="P3 - Minor / Polish">🔵 P3 - Minor Issue / UI Glitch</option>
                <option value="Feature Request">💡 Feature Request / Enhancement</option>
              </select>
            </label>

            <label>
              SLA Resolution Target
              <select
                value={slaTarget}
                onChange={(e) => setSlaTarget(e.target.value)}
              >
                <option value="4 Hours (Urgent)">4 Hours (P1 Critical)</option>
                <option value="24 Hours">24 Hours (Standard)</option>
                <option value="48 Hours">48 Hours</option>
                <option value="Next Release Sprint">Next Release Sprint</option>
              </select>
            </label>
          </div>

          <label>
            Incident Description & Steps to Reproduce
            <textarea
              rows={3}
              placeholder="Describe error logs, affected users, steps to reproduce, or stacktrace..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #e1e6ed',
                borderRadius: '7px',
                padding: '9px 12px',
                fontSize: '12px',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-button" type="submit" style={{ background: '#e11d48' }}>
              <Check size={16} /> Log Ticket
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

