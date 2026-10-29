import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  CircleDollarSign,
  LifeBuoy,
  TrendingUp,
  Share2,
} from 'lucide-react'
import type { NavItemConfig } from '@/types/navigation'

export const primaryNavItems: NavItemConfig[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Leads', icon: Users, count: '6' },
  { label: 'Lead Sources', icon: Share2, count: 'Live' },
  { label: 'Deals', icon: BriefcaseBusiness, count: '₹8.6L' },
  { label: 'Contacts', icon: Users },
  { label: 'Companies', icon: Building2 },
  { label: 'Tasks', icon: ClipboardCheck, count: '8' },
]

export const workspaceNavItems: NavItemConfig[] = [
  { label: 'Quotations', icon: FileText },
  { label: 'Invoices', icon: CircleDollarSign },
  { label: 'Support', icon: LifeBuoy, count: '6' },
  { label: 'Reports', icon: TrendingUp },
]
