'use client'

import { X, Printer, Download, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface QuotationPreviewModalProps {
  quotation: RecordItem
  onClose: () => void
}

export function QuotationPreviewModal({ quotation, onClose }: QuotationPreviewModalProps) {
  const handlePrint = () => {
    window.print()
  }

  const milestones = quotation.milestones || [
    { id: '1', title: 'System Architecture & UI/UX Figma Wireframes', amount: '₹30,000', deliverables: 'SRS Document & Clickable Prototype' },
    { id: '2', title: 'Core Development, APIs & Mobile App MVP', amount: '₹70,000', deliverables: 'Flutter App & Backend Database' },
    { id: '3', title: 'UAT Testing, Cloud Deployment & Launch', amount: '₹50,000', deliverables: 'Production AWS Cloud & Training' },
  ]

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
          width: 'min(100%, 780px)',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#fff',
          padding: '36px',
          borderRadius: '16px',
        }}
      >
        {/* Actions bar (hidden in print) */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-pill" style={{ background: '#ecfdf5', color: '#047857' }}>
              Official Scope Quotation
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Reference: <strong>{quotation.quoteNumber || 'QT-2026-001'}</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="primary-button"
              onClick={handlePrint}
              style={{ padding: '8px 14px', fontSize: '12px', gap: '6px' }}
            >
              <Printer size={15} /> Print / Save PDF
            </button>
            <button className="icon-button" onClick={onClose} aria-label="Close preview">
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Printable Proposal Body */}
        <div style={{ color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#7257e9', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '16px' }}>
                  {siteConfig.brandInitial}
                </div>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  {siteConfig.name}
                </h1>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                Enterprise Software Development & Cloud Solutions<br />
                {siteConfig.companyAddress.replace('\n', ', ')}<br />
                Email: {siteConfig.supportEmail}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 800, color: '#7257e9' }}>
                COMMERCIAL PROPOSAL
              </h2>
              <div style={{ fontSize: '12px', color: '#475569' }}>
                <strong>Quote #:</strong> {quotation.quoteNumber || 'QT-2026-042'}<br />
                <strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}<br />
                <strong>Validity:</strong> {quotation.validityDays || '30 Days'}
              </div>
            </div>
          </div>

          {/* Client Recipient */}
          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px' }}>
                Prepared For:
              </span>
              <h3 style={{ margin: '4px 0 2px', fontSize: '15px', fontWeight: 700 }}>{quotation.name}</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#475569' }}>
                {quotation.company}<br />
                {quotation.email && <span>Email: {quotation.email}<br /></span>}
                {quotation.phone && <span>WhatsApp/Phone: {quotation.phone}</span>}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px' }}>
                Project Scope:
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: 600, color: '#1e293b', maxWidth: '320px' }}>
                {quotation.projectScope || 'Custom Enterprise Software Application'}
              </p>
              {quotation.techStack && (
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b', maxWidth: '320px' }}>
                  <strong>Tech Stack:</strong> {quotation.techStack}
                </p>
              )}
            </div>
          </div>

          {/* Scope Milestones Table */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700 }}>
              Milestone & Deliverables Schedule
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>#</th>
                  <th style={{ padding: '10px 12px' }}>Milestone Phase</th>
                  <th style={{ padding: '10px 12px' }}>Key Deliverables</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m, idx) => (
                  <tr key={m.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#64748b' }}>0{idx + 1}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#1e293b' }}>{m.title}</td>
                    <td style={{ padding: '12px', color: '#475569' }}>{m.deliverables || 'Phase release & verification'}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>{m.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Investment Summary & Commercials */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <div style={{ width: '280px', padding: '16px', background: '#faf5ff', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '6px' }}>
                <span>Subtotal:</span>
                <strong>{quotation.value || '₹1,50,000'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                <span>GST (18% Included):</span>
                <strong>Included</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#6b21a8', borderTop: '1px solid #d8b4fe', paddingTop: '8px' }}>
                <span>Total Investment:</span>
                <span>{quotation.value || '₹1,50,000'}</span>
              </div>
            </div>
          </div>

          {/* Terms & Payment Schedule */}
          <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '11px', color: '#475569', lineHeight: 1.6 }}>
            <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
              Payment Terms & Warranty
            </strong>
            <p style={{ margin: '0 0 6px' }}>
              • <strong>Payment Schedule:</strong> {quotation.paymentTerms || '50% Advance on Kickoff, 30% UAT Approval, 20% Production Go-Live'}<br />
              • <strong>Warranty:</strong> 90 Days post-launch comprehensive bug fix warranty included at zero charge.<br />
              • <strong>IP Ownership:</strong> 100% intellectual property, source code, and deployment scripts transfer to {quotation.company} upon final settlement.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

