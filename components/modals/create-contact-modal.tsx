'use client'

import { useState } from 'react'
import { X, UserCheck, Mail, Phone, Building2, Check, Linkedin } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateContactModalProps {
  onClose: () => void
  onSave: (item: RecordItem) => void
  records?: RecordItem[]
}

export function CreateContactModal({ onClose, onSave, records = [] }: CreateContactModalProps) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [designation, setDesignation] = useState('Managing Director & CEO')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [decisionMaker, setDecisionMaker] = useState(true)
  const [linkedIn, setLinkedIn] = useState('')
  const [notes, setNotes] = useState('')

  const clientCompanies = Array.from(new Set(records.map((r) => r.company).filter(Boolean)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onSave({
      id: crypto.randomUUID(),
      name: name.trim(),
      company: company.trim() || 'Independent Client',
      status: 'Active',
      value: '—',
      owner: siteConfig.currentUser.name,
      email: email.trim(),
      phone: phone.trim(),
      designation,
      decisionMaker,
      linkedIn: linkedIn.trim(),
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
              <UserCheck size={14} /> Stakeholder & Decision Maker
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Add New Contact</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Maintain verified direct communication with founders, CTOs, and procurement directors.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-row">
            <label>
              Full Name *
              <input
                required
                autoFocus
                placeholder="e.g. Vikram Malhotra"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Organization / Company
              <input
                list="contacts-companies"
                placeholder="e.g. FinTrack Wealth Advisory"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <datalist id="contacts-companies">
                {clientCompanies.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
          </div>

          <label>
            Role / Designation
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="Managing Director & CEO">Managing Director & CEO</option>
              <option value="Founder / Co-Founder">Founder / Co-Founder</option>
              <option value="Chief Technology Officer (CTO)">Chief Technology Officer (CTO)</option>
              <option value="VP of Engineering / IT Head">VP of Engineering / IT Head</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Procurement & Operations Head">Procurement & Operations Head</option>
            </select>
          </label>

          <div className="form-row">
            <label>
              Work Email Address
              <input
                type="email"
                placeholder="vikram@fintrack.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Direct Phone / WhatsApp *
              <input
                type="tel"
                placeholder="+91 98990 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <label>
            LinkedIn Profile URL
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <input
              type="checkbox"
              checked={decisionMaker}
              onChange={(e) => setDecisionMaker(e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <div>
              <strong style={{ fontSize: '12px', color: '#1e293b' }}>Authorized Budget Decision Maker</strong>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Can approve contracts and sanction advance wire transfers</span>
            </div>
          </label>

          <label>
            Relationship Notes
            <textarea
              rows={2}
              placeholder="e.g. Strongly prefers WhatsApp updates. Key technical authority for signing off milestone approvals."
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
            <button className="primary-button" type="submit" style={{ background: '#10b981' }}>
              <Check size={16} /> Save Contact
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
