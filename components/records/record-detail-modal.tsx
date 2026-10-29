'use client'

import { X, CalendarDays, Pencil } from 'lucide-react'
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

        <div className="detail-grid">
          <div>
            <span className="detail-label">Status</span>
            <strong className="status-pill">{record.status}</strong>
          </div>
          <div>
            <span className="detail-label">Pipeline value</span>
            <strong>{record.value || 'Not set'}</strong>
          </div>
          <div>
            <span className="detail-label">Owner</span>
            <strong>{record.owner}</strong>
          </div>
          <div>
            <span className="detail-label">Email</span>
            <strong>{record.email || 'Not provided'}</strong>
          </div>
        </div>

        <ContactActions record={record} onComposeEmail={onComposeEmail} />

        <div className="detail-section">
          <div>
            <h3>Next steps</h3>
            <p>Keep this relationship moving with a clear follow-up.</p>
          </div>
          <button className="secondary-button" onClick={onClose}>
            <CalendarDays size={16} /> Schedule follow-up
          </button>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-dot" />
            <div>
              <strong>Record created</strong>
              <p>Added to your {siteConfig.name} workspace</p>
            </div>
            <time>Today</time>
          </div>
          <div className="activity-item">
            <span className="activity-dot" />
            <div>
              <strong>Owner assigned</strong>
              <p>{record.owner} is responsible for this record</p>
            </div>
            <time>Today</time>
          </div>
        </div>
      </section>
    </div>
  )
}
