'use client'

import { useState } from 'react'
import { X, Plus, Trash2, FileText, Sparkles, Check, Calculator } from 'lucide-react'
import type { RecordItem, MilestoneItem } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateQuotationModalProps {
  onClose: () => void
  onSave: (item: RecordItem) => void
}

export function CreateQuotationModal({ onClose, onSave }: CreateQuotationModalProps) {
  const [clientName, setClientName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [quoteNumber, setQuoteNumber] = useState(`QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`)
  const [projectScope, setProjectScope] = useState('Enterprise Cloud ERP & Mobile Application')
  const [techStack, setTechStack] = useState('Next.js 16, TypeScript, Node.js, PostgreSQL, Flutter, AWS')
  const [paymentTerms, setPaymentTerms] = useState('50% Advance on Kickoff, 30% UAT Approval, 20% Go-Live')
  const [validityDays, setValidityDays] = useState('30 Days')
  const [includeGst, setIncludeGst] = useState(true)

  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    { id: '1', title: 'System Architecture & Figma Wireframes', amount: '30000', deliverables: 'SRS Document & Clickable Prototype' },
    { id: '2', title: 'Core Development, APIs & Mobile App MVP', amount: '70000', deliverables: 'Flutter App & Backend Database' },
    { id: '3', title: 'UAT Testing, Cloud Deployment & Launch', amount: '50000', deliverables: 'Production AWS Cloud & Training' },
  ])

  const addMilestone = () => {
    setMilestones((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: `Phase ${prev.length + 1} Scope Milestone`,
        amount: '25000',
        deliverables: 'Deliverable documentation & Code release',
      },
    ])
  }

  const removeMilestone = (id: string) => {
    if (milestones.length <= 1) return
    setMilestones((prev) => prev.filter((m) => m.id !== id))
  }

  const updateMilestone = (id: string, key: keyof MilestoneItem, val: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [key]: val } : m))
    )
  }

  // Calculate Subtotal & GST
  const subtotal = milestones.reduce((sum, m) => sum + (Number(m.amount.replace(/[^0-9]/g, '')) || 0), 0)
  const gstAmount = includeGst ? Math.round(subtotal * 0.18) : 0
  const grandTotal = subtotal + gstAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName.trim() || !company.trim()) return

    onSave({
      id: crypto.randomUUID(),
      name: `${clientName} (${company})`,
      company,
      email,
      phone,
      status: 'Proposal',
      value: `₹${grandTotal.toLocaleString('en-IN')}`,
      owner: siteConfig.currentUser.name,
      quoteNumber,
      projectScope,
      techStack,
      paymentTerms,
      validityDays,
      gstRate: includeGst ? 18 : 0,
      milestones: milestones.map((m) => ({
        ...m,
        amount: `₹${Number(m.amount.replace(/[^0-9]/g, '') || 0).toLocaleString('en-IN')}`,
      })),
      notes: `Scope Proposal for ${company}. Tech: ${techStack}. Payment: ${paymentTerms}. Valid for ${validityDays}.`,
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
        style={{
          width: 'min(100%, 680px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '26px',
        }}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#7257e9', fontWeight: 700, textTransform: 'uppercase' }}>
              <FileText size={14} /> Formal IT Software Quotation
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Create New Quotation</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Generate a professional milestone-based quote for ₹1,00,000+ software projects with GST calculation.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-row">
            <label>
              Client Contact Name *
              <input
                required
                autoFocus
                placeholder="e.g. Rajesh Verma"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </label>

            <label>
              Company / Client Organization *
              <input
                required
                placeholder="e.g. Apex Logistics Tech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Client Work Email
              <input
                type="email"
                placeholder="rajesh@apexlogistics.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Phone / WhatsApp Number
              <input
                type="tel"
                placeholder="+91 98201 44321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Quotation Reference #
              <input
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
              />
            </label>

            <label>
              Validity Period
              <select
                value={validityDays}
                onChange={(e) => setValidityDays(e.target.value)}
              >
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days (Standard)</option>
                <option value="45 Days">45 Days</option>
                <option value="60 Days">60 Days</option>
              </select>
            </label>
          </div>

          <label>
            Project Scope Title *
            <input
              required
              value={projectScope}
              onChange={(e) => setProjectScope(e.target.value)}
              placeholder="e.g. Custom Fleet ERP, Driver Dispatch App & GST Invoicing Portal"
            />
          </label>

          <label>
            Recommended Tech Stack Architecture
            <input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g. Next.js 16, TypeScript, Node.js, PostgreSQL, Flutter, AWS"
            />
          </label>

          {/* Project Milestones & Pricing */}
          <div style={{ marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                Project Milestones & Deliverables Breakdown
              </span>
              <button
                type="button"
                onClick={addMilestone}
                className="secondary-button"
                style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
              >
                <Plus size={13} /> Add Milestone
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {milestones.map((m, idx) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7257e9', width: '24px' }}>
                    #{idx + 1}
                  </span>
                  <input
                    required
                    style={{ flex: 2, fontSize: '12px', padding: '6px 8px' }}
                    placeholder="Milestone title"
                    value={m.title}
                    onChange={(e) => updateMilestone(m.id, 'title', e.target.value)}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>₹</span>
                    <input
                      required
                      inputMode="numeric"
                      style={{ width: '100%', fontSize: '12px', padding: '6px 8px' }}
                      placeholder="Amount"
                      value={m.amount}
                      onChange={(e) => updateMilestone(m.id, 'amount', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(m.id)}
                      className="icon-button"
                      style={{ color: '#ef4444' }}
                      aria-label="Remove milestone"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & GST Calculation Box */}
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: '#f5f3ff',
              border: '1px solid #ddd6fe',
              marginTop: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563', marginBottom: '6px' }}>
              <span>Subtotal (Milestones):</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#4b5563', marginBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', margin: 0, fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={includeGst}
                  onChange={(e) => setIncludeGst(e.target.checked)}
                  style={{ width: '15px', height: '15px' }}
                />
                Apply 18% GST (Goods and Services Tax)
              </label>
              <strong>{includeGst ? `+ ₹${gstAmount.toLocaleString('en-IN')}` : '₹0'}</strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: 800,
                color: '#4338ca',
                borderTop: '1px dashed #c7d2fe',
                paddingTop: '8px',
              }}
            >
              <span>Total Quotation Investment:</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <label>
            Payment Terms
            <input
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="e.g. 50% Advance on Kickoff, 30% UAT Approval, 20% Go-Live"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-button" type="submit" style={{ background: '#7257e9' }}>
              <Check size={16} /> Save & Generate Quotation
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

