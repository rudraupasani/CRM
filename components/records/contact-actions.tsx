'use client'

import { Mail, MessageCircle, Send } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { getWhatsAppHref } from '@/lib/formatters'

interface ContactActionsProps {
  record: RecordItem
  onComposeEmail?: (record: RecordItem) => void
}

export function ContactActions({ record, onComposeEmail }: ContactActionsProps) {
  const whatsappHref = getWhatsAppHref(record.name, record.phone)

  return (
    <div className="contact-actions" style={{ flexWrap: 'wrap', gap: '8px' }}>
      {onComposeEmail ? (
        <button
          type="button"
          className="secondary-button"
          style={{ background: '#f5f3ff', color: '#6d28d9', borderColor: '#ddd6fe' }}
          onClick={() => onComposeEmail(record)}
        >
          <Send size={15} /> Send Email
        </button>
      ) : (
        <a
          className="secondary-button"
          href={
            record.email
              ? `mailto:${record.email}?subject=${encodeURIComponent(`Following up with ${record.name}`)}`
              : '#'
          }
          onClick={(event) => !record.email && event.preventDefault()}
        >
          <Mail size={16} /> Email
        </a>
      )}

      <a
        className="secondary-button whatsapp-button"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  )
}
