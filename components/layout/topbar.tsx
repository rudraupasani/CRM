'use client'

import { Bell, ChevronRight, Search } from 'lucide-react'
import type { CRMSection } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface TopbarProps {
  activeSection: CRMSection
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Topbar({
  activeSection,
  searchQuery,
  onSearchChange,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong>{activeSection}</strong>
      </div>

      <div className="topbar-actions">
        <label className="search-box">
          <Search size={16} />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search records..."
          />
          <kbd>⌘ K</kbd>
        </label>

        <button className="top-icon notification" aria-label="Notifications">
          <Bell size={17} />
          <i />
        </button>

        <span className="top-avatar">{siteConfig.currentUser.initials}</span>
      </div>
    </header>
  )
}
