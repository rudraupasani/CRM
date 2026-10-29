export type RecordStatus =
  | 'New lead'
  | 'Discovery'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'In Development'
  | 'Active'
  | 'Open'
  | 'Won / Closed'
  | 'Lost'
  | 'Complete'
  | string

export type LeadSource =
  | 'Google Sheets'
  | 'Meta Ads'
  | 'Website Form'
  | 'LinkedIn Ads'
  | 'Inbound Call'
  | 'Custom Webhook'
  | 'Direct / Manual'
  | string

export type LeadQuality = 'Hot' | 'Warm' | 'Cold'

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
  source?: LeadSource
  serviceType?: string
  leadQuality?: LeadQuality
  notes?: string
  campaign?: string
  currency?: 'INR' | 'USD'
}

export type CRMSection =
  | 'Overview'
  | 'Leads'
  | 'Lead Sources'
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
