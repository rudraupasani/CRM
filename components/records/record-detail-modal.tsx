'use client'

import { X, CalendarDays, Pencil, MessageSquare, PhoneCall, ExternalLink } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { getInitials } from '@/lib/formatters'
import { ContactActions } from './contact-actions'
import { siteConfig } from '@/config/site'

interface RecordDetailModalProps {
  record: RecordItem
  onClose: () => void
  onEdit: (record: RecordItem) => void
  onComposeEmail?: (record: RecordItem) => void
}

export function RecordDetailModal({
  record,
  onClose,
  onEdit,
  onComposeEmail,
}: RecordDetailModalProps) {
  const cleanPhone = record.phone ? record.phone.replace(/[^0-9]/g, '') : ''
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(record.name)},%20reaching%20out%20from%20${encodeURIComponent(siteConfig.name)}%20regarding%20your%20software%20requirement.` : null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="modal detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        style={{ maxWidth: '640px' }}
      >
        <div className="modal-header">
          <div className="detail-title">
            <span className="detail-avatar">{getInitials(record.name)}</span>
            <div>
              <p className="eyebrow">Record details</p>
              <h2 id="detail-title">{record.name}</h2>
              <p className="subheading">{record.company || 'No company assigned'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="secondary-button"
              onClick={() => onEdit(record)}
              style={{ padding: '6px 10px', fontSize: '11px' }}
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Close details"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Lead Source & Software Requirements Banner */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Channel Source & Requirement
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background:
                    record.source === 'Meta Ads'
                      ? '#e0e7ff'
                      : record.source === 'Google Sheets'
                        ? '#dcfce7'
                        : '#f1f5f9',
                  color:
                    record.source === 'Meta Ads'
                      ? '#3730a3'
                      : record.source === 'Google Sheets'
                        ? '#166534'
                        : '#334155',
                }}
              >
                {record.source || 'Direct / Manual'}
              </span>
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                {record.serviceType || 'Custom Software Solution'}
              </strong>
            </div>
          </div>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: '#25D366',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <MessageSquare size={14} /> WhatsApp Client
            </a>
          )}
        </div>

        <div className="detail-grid">
          <div>
            <span className="detail-label">Status</span>
            <strong className="status-pill">{record.status}</strong>
          </div>
          <div>
            <span className="detail-label">Deal Value</span>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>{record.value || '₹1,00,000'}</strong>
          </div>
          <div>
            <span className="detail-label">Account Owner</span>
            <strong>{record.owner}</strong>
          </div>
          <div>
            <span className="detail-label">Email</span>
            <strong>{record.email || 'Not provided'}</strong>
          </div>
          <div>
            <span className="detail-label">Phone</span>
            <strong>{record.phone || 'Not provided'}</strong>
          </div>
          <div>
            <span className="detail-label">Lead Quality</span>
            <strong style={{ color: record.leadQuality === 'Hot' ? '#b91c1c' : '#b45309' }}>
              {record.leadQuality === 'Hot' ? '🔥 Hot Lead' : '☀️ Warm Lead'}
            </strong>
          </div>
        </div>

        {record.notes && (
          <div style={{ marginTop: '16px', padding: '14px', borderRadius: '8px', background: '#fafafa', border: '1px solid #f0f0f0' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>
              Project Requirement Notes:
            </span>
            <p style={{ margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
              {record.notes}
            </p>
          </div>
        )}

        <ContactActions record={record} onComposeEmail={onComposeEmail} />

        <div className="detail-section">
          <div>
            <h3>Discovery & Proposal</h3>
            <p>Schedule a tech consultation or send a ₹1,00,000+ project quotation.</p>
          </div>
          <button className="secondary-button" onClick={onClose}>
            <CalendarDays size={16} /> Schedule Tech Call
          </button>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-dot" />
            <div>
              <strong>Lead captured via {record.source || 'Inbound'}</strong>
              <p>Registered in {siteConfig.name} engineering workspace</p>
            </div>
            <time>Recent</time>
          </div>
          <div className="activity-item">
            <span className="activity-dot" />
            <div>
              <strong>Assigned to {record.owner}</strong>
              <p>Technical solutioning & proposal phase</p>
            </div>
            <time>Recent</time>
          </div>
        </div>
      </section>
    </div>
  )
}
