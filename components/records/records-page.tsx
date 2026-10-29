'use client'

import { useState } from 'react'
import { Plus, Filter, CalendarDays, Download, ChevronRight, Pencil, FileSpreadsheet, Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { exportExcel } from '@/lib/export'
import { getInitials } from '@/lib/formatters'

interface RecordsPageProps {
  title: string
  description: string
  type: string
  records: RecordItem[]
  search: string
  onAdd: () => void
  onSelect: (record: RecordItem) => void
  onEdit: (record: RecordItem) => void
  onComposeEmail?: (record: RecordItem) => void
}

export function RecordsPage({
  title,
  description,
  type,
  records,
  search,
  onAdd,
  onSelect,
  onEdit,
  onComposeEmail,
}: RecordsPageProps) {
  const now = new Date()
  const [month, setMonth] = useState('all')
  const [year, setYear] = useState('all')
  const [syncingSheets, setSyncingSheets] = useState(false)
  const [sheetsMessage, setSheetsMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const visible = records.filter((r) => {
    const matchesSearch = `${r.name} ${r.company} ${r.email || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
    const date = new Date(r.createdAt || now.toISOString())
    const matchesMonth = month === 'all' || String(date.getMonth() + 1) === month
    const matchesYear = year === 'all' || String(date.getFullYear()) === year
    return matchesSearch && matchesMonth && matchesYear
  })

  const downloadData = () => {
    const filename = `${type.toLowerCase()}-${year === 'all' ? 'all-years' : year}-${month === 'all' ? 'all-months' : month}`
    exportExcel(
      filename,
      visible.map((r) => ({
        name: r.name,
        company: r.company,
        email: r.email || '',
        status: r.status,
        value: r.value,
        owner: r.owner,
        created_at: r.createdAt || '',
      }))
    )
  }

  const handleSyncGoogleSheets = async () => {
    if (visible.length === 0) return
    setSyncingSheets(true)
    setSheetsMessage(null)
    try {
      await new Promise((res) => setTimeout(res, 400))
      exportExcel(
        `${type.toLowerCase()}-google-sheets-export`,
        visible.map((r) => ({
          Name: r.name,
          Company: r.company,
          Email: r.email || '',
          Status: r.status,
          Value: r.value,
          Owner: r.owner,
          Phone: r.phone || '',
          Created_At: r.createdAt || '',
        }))
      )
      setSheetsMessage({
        type: 'success',
        text: `Exported ${visible.length} records formatted for Google Sheets!`,
      })
    } catch (err: any) {
      setSheetsMessage({
        type: 'error',
        text: err.message || 'Error exporting records for Google Sheets',
      })
    } finally {
      setSyncingSheets(false)
      setTimeout(() => setSheetsMessage(null), 5000)
    }
  }

  const entityName = type === 'Companies' ? 'company' : type.slice(0, -1).toLowerCase()

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace / {type}</p>
          <h1>{title}</h1>
          <p className="subheading">{description}</p>
        </div>
        <button className="primary-button" onClick={onAdd}>
          <Plus size={17} /> Add {entityName}
        </button>
      </div>

      {sheetsMessage && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: sheetsMessage.type === 'success' ? '#f0fdf4' : '#fef2f2',
            color: sheetsMessage.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${sheetsMessage.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          {sheetsMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{sheetsMessage.text}</span>
        </div>
      )}

      <section className="panel records-panel">
        <div className="panel-header">
          <div>
            <h2>{type} directory</h2>
            <p>{visible.length} records in this workspace</p>
          </div>
          <div className="table-actions">
            <label className="filter-control">
              <Filter size={14} /> Month
              <select
                aria-label="Filter by month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="all">All months</option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={String(index + 1)}>
                    {new Date(2024, index, 1).toLocaleString('default', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-control">
              <CalendarDays size={14} /> Year
              <select
                aria-label="Filter by year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="all">All years</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </label>

            {/* Google Sheets Export Button */}
            <button
              className="secondary-button"
              onClick={handleSyncGoogleSheets}
              disabled={syncingSheets || visible.length === 0}
              title="Export current records for Google Sheets"
            >
              <FileSpreadsheet size={15} color="#16a34a" />{' '}
              {syncingSheets ? 'Exporting...' : 'Export to Sheets'}
            </button>

            <button className="secondary-button" onClick={downloadData}>
              <Download size={15} /> Download filtered
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Value</th>
                <th>Owner</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((record) => (
                <tr
                  key={record.id}
                  className="clickable-row"
                  onClick={() => onSelect(record)}
                >
                  <td>
                    <div className="table-person">
                      <span className="activity-avatar bg-violet-100 text-violet-700">
                        {getInitials(record.name)}
                      </span>
                      <strong>{record.name}</strong>
                    </div>
                  </td>
                  <td>{record.company}</td>
                  <td>
                    <span className="status-pill">{record.status}</span>
                  </td>
                  <td>{record.value || '—'}</td>
                  <td>{record.owner}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      {onComposeEmail && record.email && (
                        <button
                          className="icon-button"
                          onClick={(event) => {
                            event.stopPropagation()
                            onComposeEmail(record)
                          }}
                          aria-label={`Send Email to ${record.name}`}
                          title="Send Email"
                        >
                          <Mail size={15} />
                        </button>
                      )}

                      <button
                        className="icon-button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onEdit(record)
                        }}
                        aria-label={`Edit ${record.name}`}
                        title="Edit record"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="icon-button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onSelect(record)
                        }}
                        aria-label={`View ${record.name}`}
                        title="View details"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 20px', color: '#9aa3b1' }}>
                    No records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
