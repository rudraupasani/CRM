'use client'

import { useState } from 'react'
import type { CRMSection, RecordItem } from '@/types/crm'
import { useCrmRecords } from '@/hooks/use-crm-records'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { DashboardView } from '@/components/dashboard/dashboard-view'
import { RecordsPage } from '@/components/records/records-page'
import { InvoicePage } from '@/components/invoices/invoice-page'
import { SettingsPage } from '@/components/settings/settings-page'
import { LeadSourcesView } from '@/components/integrations/lead-sources-view'
import { CreateRecordModal } from '@/components/records/create-record-modal'
import { RecordDetailModal } from '@/components/records/record-detail-modal'
import { EditRecordModal } from '@/components/records/edit-record-modal'

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [active, setActive] = useState<CRMSection>('Overview')
  const [search, setSearch] = useState('')
  const [modalType, setModalType] = useState<string | null>(null)
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null)
  const [editingRecord, setEditingRecord] = useState<RecordItem | null>(null)

  const { records, addRecord, addRecords, updateRecord, deleteRecord } = useCrmRecords()

  const handleCreate = (type: string) => {
    setModalType(type)
  }

  const handleSave = (item: RecordItem) => {
    addRecord(item)
    setModalType(null)
  }

  const handleUpdate = (updated: RecordItem) => {
    updateRecord(updated)
    setEditingRecord(null)
    if (selectedRecord?.id === updated.id) {
      setSelectedRecord(updated)
    }
  }

  const handleDelete = (id: string) => {
    deleteRecord(id)
    if (selectedRecord?.id === id) {
      setSelectedRecord(null)
    }
  }

  const getSectionDescription = (section: CRMSection) => {
    switch (section) {
      case 'Leads':
        return 'Capture, qualify, and convert your best opportunities from Meta Ads, Google Sheets & Webhooks.'
      case 'Lead Sources':
        return 'Connect marketing channels, Google Sheets, Meta Ads, and webhooks.'
      case 'Deals':
        return 'Track active IT software negotiations, client scope review, and expected revenue.'
      case 'Contacts':
        return 'Maintain relationships and communication history with decision makers.'
      case 'Companies':
        return 'Corporate accounts and client organization directory.'
      case 'Tasks':
        return 'Engineering follow-ups and priority items across team members.'
      case 'Quotations':
        return 'Software scope estimates and official project proposals.'
      case 'Support':
        return 'Customer requests, tickets, and bug resolution timelines.'
      case 'Reports':
        return 'Pipeline analytics, deal source attribution, and revenue forecasts.'
      case 'Settings':
        return 'Configure your organization profile, email sender, data export, and preferences.'
      default:
        return `Manage your ${section.toLowerCase()} in one place.`
    }
  }

  const renderContent = () => {
    if (active === 'Overview') {
      return (
        <DashboardView
          onCreate={() => handleCreate('Leads')}
          records={records}
          onNavigate={(sec) => setActive(sec)}
        />
      )
    }

    if (active === 'Lead Sources') {
      return <LeadSourcesView records={records} onAddLeads={addRecords} />
    }

    if (active === 'Invoices') {
      return <InvoicePage onAdd={() => handleCreate('Invoices')} />
    }

    if (active === 'Settings') {
      return <SettingsPage />
    }

    return (
      <RecordsPage
        title={active}
        description={getSectionDescription(active)}
        type={active}
        records={records}
        search={search}
        onAdd={() => handleCreate(active)}
        onSelect={setSelectedRecord}
        onEdit={(record) => setEditingRecord(record)}
      />
    )
  }

  return (
    <main className="crm-shell">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        activeSection={active}
        onSelectSection={(section) => setActive(section)}
      />

      <section className="main-content">
        <Topbar
          activeSection={active}
          searchQuery={search}
          onSearchChange={setSearch}
        />
        <div className="page-body">{renderContent()}</div>
      </section>

      {/* Creation Modal */}
      {modalType && (
        <CreateRecordModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSave={handleSave}
        />
      )}

      {/* Detail Slideover / Modal */}
      {selectedRecord && (
        <RecordDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onEdit={(record) => {
            setSelectedRecord(null)
            setEditingRecord(record)
          }}
        />
      )}

      {/* Edit Record Modal */}
      {editingRecord && (
        <EditRecordModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSave={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </main>
  )
}
