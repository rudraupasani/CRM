'use client'

import { useState } from 'react'
import { X, BriefcaseBusiness, Check, Sparkles } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateDealModalProps {
  onClose: () => void
  onSave: (item: RecordItem) => void
  records?: RecordItem[]
}

export function CreateDealModal({ onClose, onSave, records = [] }: CreateDealModalProps) {
  const [dealName, setDealName] = useState('')
  const [company, setCompany] = useState('')
  const [value, setValue] = useState('150000')
  const [dealStage, setDealStage] = useState('Proposal')
  const [probability, setProbability] = useState(70)
  const [expectedCloseDate, setExpectedCloseDate] = useState(
    new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 10)
  )
  const [serviceType, setServiceType] = useState('Custom Software & ERP')
  const [notes, setNotes] = useState('')

  const clientCompanies = Array.from(new Set(records.map((r) => r.company).filter(Boolean)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dealName.trim() || !company.trim()) return

    const num = Number(value.replace(/[^0-9]/g, '')) || 100000

    onSave({
      id: crypto.randomUUID(),
      name: dealName.trim(),
      company: company.trim(),
      status: dealStage,
      value: `₹${num.toLocaleString('en-IN')}`,
      owner: siteConfig.currentUser.name,
      dealStage,
      probability,
      expectedCloseDate,
      serviceType,
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
        style={{ width: 'min(100%, 560px)', padding: '24px' }}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>
              <BriefcaseBusiness size={14} /> Software Sales Pipeline Deal
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Create New Deal</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Track high-ticket IT client opportunity velocity, deal probability, and projected revenue.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label>
            Deal Title *
            <input
              required
              autoFocus
              placeholder="e.g. Apex Fleet ERP & Driver Dispatch Portal"
              value={dealName}
              onChange={(e) => setDealName(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Client Organization *
              <input
                required
                list="deals-companies"
                placeholder="e.g. Apex Logistics Tech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <datalist id="deals-companies">
                {clientCompanies.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>

            <label>
              Software Solution Type
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="Custom Software & ERP">Custom Software & ERP</option>
                <option value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</option>
                <option value="SaaS MVP Platform">SaaS MVP Platform</option>
                <option value="FinTech / Banking Automation">FinTech / Banking Automation</option>
                <option value="AI / Workflow Automation">AI / Workflow Automation</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Deal Stage
              <select
                value={dealStage}
                onChange={(e) => setDealStage(e.target.value)}
              >
                <option value="Discovery">Discovery & Initial Scoping</option>
                <option value="Qualified">Qualified Technical Requirement</option>
                <option value="Proposal">Formal Proposal & Architecture Sent</option>
                <option value="Negotiation">Commercial & SOW Negotiation</option>
                <option value="Won / Closed">Contract Signed & Advance Received (Won)</option>
                <option value="Lost">Closed Lost</option>
              </select>
            </label>

            <label>
              Expected Close Date
              <input
                type="date"
                value={expectedCloseDate}
                onChange={(e) => setExpectedCloseDate(e.target.value)}
              />
            </label>
          </div>

          {/* Deal Value in INR */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px' }}>
              Deal Investment Value (₹) *
              <input
                required
                inputMode="numeric"
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="150000"
              />
            </label>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {[50000, 100000, 150000, 225000, 500000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setValue(String(amt))}
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: value === String(amt) ? '1px solid #2563eb' : '1px solid #cbd5e1',
                    background: value === String(amt) ? '#eff6ff' : '#f8fafc',
                    color: value === String(amt) ? '#2563eb' : '#475569',
                    fontWeight: value === String(amt) ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Probability Slider */}
          <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              <span>Win Probability:</span>
              <strong style={{ color: '#2563eb' }}>{probability}%</strong>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={probability}
              onChange={(e) => setProbability(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <label>
            Deal Strategy / Commercial Scope Notes
            <textarea
              rows={2}
              placeholder="e.g. Client needs 50% advance before kickoff. Board approval expected on 5th."
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
            <button className="primary-button" type="submit" style={{ background: '#2563eb' }}>
              <Check size={16} /> Save Deal to Pipeline
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

