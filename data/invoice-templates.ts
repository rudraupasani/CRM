import type { InvoiceData, InvoiceTemplate } from '@/types/invoice'

export const invoiceTemplates: InvoiceTemplate[] = [
  {
    name: 'Classic invoice',
    description: 'Clean and professional for everyday billing.',
    accent: 'template-purple',
  },
  {
    name: 'Modern invoice',
    description: 'Bold summary layout for growing teams.',
    accent: 'template-blue',
  },
  {
    name: 'Simple receipt',
    description: 'Compact format for quick payments.',
    accent: 'template-green',
  },
]

export const sampleInvoice: InvoiceData = {
  invoiceNumber: 'INV-0001',
  issueDate: 'October 14, 2024',
  dueDate: 'November 13, 2024',
  customerName: 'Acme Inc.',
  customerContact: 'Olivia Martin',
  customerEmail: 'olivia@acme.test',
  companyName: 'morfex.tech Inc.',
  companyAddress: '123 Market Street\nSan Francisco, CA 94105',
  items: [
    {
      description: 'Annual CRM workspace',
      quantity: 1,
      unitPrice: 2450.0,
      total: 2450.0,
    },
    {
      description: 'Onboarding and setup',
      quantity: 1,
      unitPrice: 350.0,
      total: 350.0,
    },
  ],
  subtotal: 2800.0,
  taxRate: 0.0825,
  taxAmount: 231.0,
  totalDue: 3031.0,
  status: 'Pending',
}
