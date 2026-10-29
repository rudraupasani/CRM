import type { LucideIcon } from 'lucide-react'
import type { CRMSection } from './crm'

export interface NavItemConfig {
  label: CRMSection
  icon: LucideIcon
  count?: string
}
