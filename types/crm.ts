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
  | 'To Do'
  | 'In Progress'
  | 'Under Review'
  | 'Resolved'
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
export type PriorityLevel = 'Urgent' | 'High' | 'Medium' | 'Low'
export type TicketSeverity = 'P1 - Critical Blocker' | 'P2 - Major Issue' | 'P3 - Minor / Polish' | 'Feature Request'

export interface MilestoneItem {
  id: string
  title: string
  amount: string
  deliverables?: string
}

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

  // Quotation specific
  quoteNumber?: string
  projectScope?: string
  techStack?: string
  milestones?: MilestoneItem[]
  paymentTerms?: string
  validityDays?: string
  gstRate?: number

  // Task specific
  priority?: PriorityLevel
  taskCategory?: string
  dueDate?: string
  assignee?: string
  completed?: boolean

  // Deal specific
  dealStage?: string
  probability?: number
  expectedCloseDate?: string

  // Contact specific
  designation?: string
  decisionMaker?: boolean
  linkedIn?: string

  // Company specific
  industry?: string
  companySize?: string
  gstin?: string
  website?: string

  // Support specific
  severity?: TicketSeverity
  affectedModule?: string
  slaTarget?: string
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
