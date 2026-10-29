'use client'

import { ChevronDown, ChevronRight, Menu, Settings, MoreHorizontal } from 'lucide-react'
import type { CRMSection } from '@/types/crm'
import { primaryNavItems, workspaceNavItems } from '@/config/navigation'
import { siteConfig } from '@/config/site'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeSection: CRMSection
  onSelectSection: (section: CRMSection) => void
}

export function Sidebar({
  isOpen,
  onToggle,
  activeSection,
  onSelectSection,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <div className="brand-row">
        <div className="brand-mark">{siteConfig.brandInitial}</div>
        {isOpen && <span className="brand-name">{siteConfig.name}</span>}
        <button
          className="collapse-button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronRight size={17} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="workspace-switcher">
          <div className="workspace-avatar">{siteConfig.brandInitial}</div>
          <div>
            <strong>{siteConfig.workspaceName}</strong>
            <span>{siteConfig.workspaceTier}</span>
          </div>
          <ChevronDown size={15} />
        </div>
      )}

      {/* Primary Navigation */}
      <nav className="nav-section" aria-label="Primary navigation">
        {primaryNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.label
          return (
            <button
              key={item.label}
              onClick={() => onSelectSection(item.label)}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              <Icon size={17} />
              <span>{isOpen && item.label}</span>
              {isOpen && item.count && <small>{item.count}</small>}
            </button>
          )
        })}
      </nav>

      {isOpen && <p className="nav-label">Workspace</p>}

      {/* Workspace Navigation */}
      <nav className="nav-section" aria-label="Workspace navigation">
        {workspaceNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.label
          return (
            <button
              key={item.label}
              onClick={() => onSelectSection(item.label)}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              <Icon size={17} />
              <span>{isOpen && item.label}</span>
              {isOpen && item.count && <small>{item.count}</small>}
            </button>
          )
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="sidebar-bottom">
        <button
          className={`nav-item ${activeSection === 'Settings' ? 'nav-item-active' : ''}`}
          onClick={() => onSelectSection('Settings')}
        >
          <Settings size={17} />
          <span>{isOpen && 'Settings'}</span>
        </button>

        {isOpen && (
          <div className="user-card">
            <div className="user-avatar">{siteConfig.currentUser.initials}</div>
            <div>
              <strong>{siteConfig.currentUser.name}</strong>
              <span>{siteConfig.currentUser.role}</span>
            </div>
            <MoreHorizontal size={16} />
          </div>
        )}
      </div>
    </aside>
  )
}
