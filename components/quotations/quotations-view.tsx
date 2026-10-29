'use client'

import { useState } from 'react'
import { Plus, FileText, Printer, ChevronRight, Download, Eye, Calendar, Sparkles, Building2, CheckCircle2 } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { QuotationPreviewModal } from './quotation-preview-modal'

interface QuotationsViewProps {
  records: RecordItem[]
  onAdd: () => void
  onEdit: (record: RecordItem) => void
  onSelect: (record: RecordItem) => void
}

export function QuotationsView({ records, onAdd, onEdit, onSelect }: QuotationsViewProps) {
  const [filter, setFilter] = useState('all')
  const [previewingQuote, setPreviewingQuote] = useState<RecordItem | null>(null)

  // Filter quotation records (items with quoteNumber or under Quotations section)
  const quotations = records.filter((r) => {
    // If it has quoteNumber or belongs to quotations
    const matchesFilter = filter === 'all' || r.status.toLowerCase() === filter.toLowerCase()
    return matchesFilter
  })

  // Calculate total quotation value
  const totalValueINR = quotations.reduce((sum, q) => {
    const num = Number(q.value.replace(/[^0-9]/g, '')) || 0
    return sum + num
  }, 0)

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Sales & Proposals</p>
          <h1>Project Quotations & SOW Scope</h1>
          <p className="subheading">
            Formal milestone-based technical quotations, tech stack architecture, and payment schedules for ₹1,00,000+ software deals.
          </p>
        </div>
        <button className="primary-button" onClick={onAdd} style={{ background: '#7257e9' }}>
          <Plus size={17} /> Create Quotation
        </button>
      </div>

      {/* Metrics Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="panel" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Total Quotations Value</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            ₹{totalValueINR.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>18% GST Applicable</span>
        </div>

        <div className="panel" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Active Proposals Sent</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#7257e9', marginTop: '4px' }}>
            {quotations.filter((q) => q.status === 'Proposal' || q.status === 'Negotiation').length}
          </div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Under client review</span>
        </div>

        <div className="panel" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Average IT Project Size</span>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
            ₹1,50,000
          </div>
          <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>Standard Enterprise Tier</span>
        </div>
      </div>

      {/* Quotations List */}
      <section className="panel records-panel">
        <div className="panel-header">
          <div>
            <h2>Quotation Proposals ({quotations.length})</h2>
            <p>Milestone schedules, deliverable SOWs, and contracts</p>
          </div>

          <div className="table-actions">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '7px 12px', borderRadius: '7px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            >
              <option value="all">All Quotation Statuses</option>
              <option value="proposal">Proposal Sent</option>
              <option value="negotiation">Under Negotiation</option>
              <option value="qualified">Qualified</option>
              <option value="won / closed">Won & Converted</option>
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Quote Reference</th>
                <th>Client / Organization</th>
                <th>Project Scope</th>
                <th>Payment Terms</th>
                <th>Total Value</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id} className="clickable-row" onClick={() => setPreviewingQuote(q)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f5f3ff', color: '#7257e9', display: 'grid', placeItems: 'center' }}>
                        <FileText size={15} />
                      </div>
                      <strong>{q.quoteNumber || 'QT-2026-042'}</strong>
                    </div>
                  </td>
                  <td>
                    <strong>{q.company}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{q.name}</div>
                  </td>
                  <td style={{ maxWidth: '240px', fontSize: '12px', color: '#334155' }}>
                    <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {q.projectScope || q.serviceType || 'Custom Software Development'}
                    </div>
                    {q.techStack && (
                      <div style={{ fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {q.techStack}
                      </div>
                    )}
                  </td>
                  <td style={{ fontSize: '11px', color: '#475569', maxWidth: '160px' }}>
                    {q.paymentTerms || '50% Advance, 30% UAT, 20% Delivery'}
                  </td>
                  <td>
                    <strong style={{ fontSize: '14px', color: '#0f172a' }}>{q.value || '₹1,50,000'}</strong>
                  </td>
                  <td>
                    <span className="status-pill">{q.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        className="secondary-button"
                        style={{ padding: '5px 10px', fontSize: '11px', gap: '4px' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewingQuote(q)
                        }}
                        title="View printable PDF quotation"
                      >
                        <Eye size={13} /> View Proposal
                      </button>

                      <button
                        className="icon-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(q)
                        }}
                        aria-label="Edit quotation"
                      >
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {quotations.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px 20px', color: '#9aa3b1' }}>
                    No quotations found. Click &quot;Create Quotation&quot; to generate your first technical proposal.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Printable Preview Modal */}
      {previewingQuote && (
        <QuotationPreviewModal
          quotation={previewingQuote}
          onClose={() => setPreviewingQuote(null)}
        />
      )}
    </>
  )
}

