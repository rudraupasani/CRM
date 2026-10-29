export interface InvoiceTemplate {
  name: string
  description: string
  accent: 'template-purple' | 'template-blue' | 'template-green'
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface InvoiceData {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  customerName: string
  customerContact: string
  customerEmail: string
  companyName: string
  companyAddress: string
  items: InvoiceLineItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  totalDue: number
  status: 'Pending' | 'Paid' | 'Overdue'
}
