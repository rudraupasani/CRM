'use client'

import { FileDown, Plus, Download } from 'lucide-react'
import { InvoiceTemplates } from './invoice-templates'
import { InvoicePreview } from './invoice-preview'
import { exportExcel } from '@/lib/export'

interface InvoicePageProps {
  onAdd: () => void
}

export function InvoicePage({ onAdd }: InvoicePageProps) {
  const downloadTemplate = (templateName: string) => {
    exportExcel(`${templateName.toLowerCase().replaceAll(' ', '-')}-template`, [
      {
        invoice_number: 'INV-0001',
        customer: 'Customer name',
        issue_date: new Date().toISOString().slice(0, 10),
        due_date: '',
        item: 'Service or product',
        quantity: '1',
        unit_price: '0',
        tax: '0',
        notes: '',
      },
    ])
  }

  const downloadPdf = () => {
    window.print()
  }

  return (
    <>
      <div className="page-heading no-print">
        <div>
          <p className="eyebrow">Workspace / Invoices</p>
          <h1>Invoices</h1>
          <p className="subheading">
            Create polished invoices and keep payments organized.
          </p>
        </div>
        <div className="heading-actions">
          <button className="secondary-button" onClick={downloadPdf}>
            <FileDown size={16} /> Download PDF
          </button>
          <button className="primary-button" onClick={onAdd}>
            <Plus size={17} /> Create invoice
          </button>
        </div>
      </div>

      <InvoiceTemplates onUse={downloadTemplate} />

      <InvoicePreview />

      <section className="panel invoice-help no-print">
        <div className="help-icon">
          <FileDown size={20} />
        </div>
        <div>
          <h3>Need a starting point?</h3>
          <p>
            Download an Excel template, edit it in Excel or Sheets, then use it as your invoice checklist.
          </p>
        </div>
        <button
          className="secondary-button"
          onClick={() => downloadTemplate('classic-invoice')}
        >
          <Download size={16} /> Download Excel template
        </button>
      </section>
    </>
  )
}
