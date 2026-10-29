'use client'

import { sampleInvoice } from '@/data/invoice-templates'
import type { InvoiceData } from '@/types/invoice'
import { siteConfig } from '@/config/site'

interface InvoicePreviewProps {
  invoice?: InvoiceData
}

export function InvoicePreview({ invoice = sampleInvoice }: InvoicePreviewProps) {
  return (
    <section className="invoice-preview panel" id="invoice-preview">
      <div className="invoice-header">
        <div>
          <div className="invoice-brand">
            <span className="brand-mark">{siteConfig.brandInitial}</span>
            <strong>{siteConfig.name}</strong>
          </div>
          <p>
            {siteConfig.workspaceName}
            <br />
            {siteConfig.companyAddress}
          </p>
        </div>
        <div className="invoice-meta">
          <span>INVOICE</span>
          <strong>{invoice.invoiceNumber}</strong>
          <p>
            Issued: {invoice.issueDate}
            <br />
            Due: {invoice.dueDate}
          </p>
        </div>
      </div>

      <div className="invoice-billto">
        <div>
          <span>BILLED TO</span>
          <strong>{invoice.customerName}</strong>
          <p>
            {invoice.customerContact}
            <br />
            {invoice.customerEmail}
          </p>
        </div>
        <div>
          <span>PAYMENT STATUS</span>
          <strong className="invoice-status">{invoice.status}</strong>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-totals">
        <div>
          <span>Subtotal</span>
          <strong>${invoice.subtotal.toFixed(2)}</strong>
        </div>
        <div>
          <span>Tax ({(invoice.taxRate * 100).toFixed(2)}%)</span>
          <strong>${invoice.taxAmount.toFixed(2)}</strong>
        </div>
        <div className="invoice-grand-total">
          <span>Total due</span>
          <strong>${invoice.totalDue.toFixed(2)}</strong>
        </div>
      </div>

      <div className="invoice-footer">
        <div>
          <strong>Payment instructions</strong>
          <p>Pay by bank transfer or card within 30 days. Thank you for your business.</p>
        </div>
        <span>{siteConfig.name}</span>
      </div>
    </section>
  )
}
