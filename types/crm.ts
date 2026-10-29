export type RecordStatus =
  | 'New lead'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'Active'
  | 'Open'
  | 'Complete'
  | string

export interface RecordItem {
  id: string
  name: string
  company: string
  status: RecordStatus
  value: string
  owner: string
  email?: string
  phone?: string
  due?: string
  createdAt?: string
}

export type CRMSection =
  | 'Overview'
  | 'Leads'
  | 'Contacts'
  | 'Companies'
  | 'Deals'
  | 'Tasks'
  | 'Quotations'
  | 'Invoices'
  | 'Support'
  | 'Reports'
  | 'Settings'

export interface ActivityItem {
  id: string
  avatar: string
  avatarColor: string
  name: string
  action: string
  timeAgo: string
}

export interface MetricData {
  label: string
  value: string
  change: string
  accent: 'accent-purple' | 'accent-blue' | 'accent-green' | 'accent-orange'
}
