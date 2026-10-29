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
} from 'lucide-react'
import type { NavItemConfig } from '@/types/navigation'

export const primaryNavItems: NavItemConfig[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Leads', icon: Users, count: '128' },
  { label: 'Contacts', icon: Users },
  { label: 'Companies', icon: Building2 },
  { label: 'Deals', icon: BriefcaseBusiness, count: '24' },
  { label: 'Tasks', icon: ClipboardCheck, count: '8' },
]

export const workspaceNavItems: NavItemConfig[] = [
  { label: 'Quotations', icon: FileText },
  { label: 'Invoices', icon: CircleDollarSign },
  { label: 'Support', icon: LifeBuoy, count: '6' },
  { label: 'Reports', icon: TrendingUp },
]
