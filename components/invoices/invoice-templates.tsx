'use client'

import { FileText, ChevronRight } from 'lucide-react'
import { invoiceTemplates } from '@/data/invoice-templates'

interface InvoiceTemplatesProps {
  onUse: (templateName: string) => void
}

export function InvoiceTemplates({ onUse }: InvoiceTemplatesProps) {
  return (
    <section className="invoice-templates panel">
      <div className="panel-header">
        <div>
          <h2>Invoice templates</h2>
          <p>Choose a layout, then fill in your customer and line items.</p>
        </div>
        <FileText size={20} />
      </div>

      <div className="template-grid">
        {invoiceTemplates.map((template) => (
          <button
            key={template.name}
            className="template-card"
            onClick={() => onUse(template.name)}
          >
            <div className={`template-preview ${template.accent}`}>
              <span>INVOICE</span>
              <strong>$2,450.00</strong>
              <i />
            </div>
            <strong>{template.name}</strong>
            <p>{template.description}</p>
            <span className="template-action">
              Use template <ChevronRight size={14} />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
