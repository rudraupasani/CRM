'use client'

import { useState, useEffect } from 'react'
import { X, Trash2, Check } from 'lucide-react'
import type { RecordItem } from '@/types/crm'

interface EditRecordModalProps {
  record: RecordItem | null
  type?: string
  onClose: () => void
  onSave: (updatedRecord: RecordItem) => void
  onDelete?: (id: string) => void
}

export function EditRecordModal({
  record,
  type = 'Record',
  onClose,
  onSave,
  onDelete,
}: EditRecordModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: '',
    status: 'Qualified',
    owner: 'Alex Rivera',
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (record) {
      setForm({
        name: record.name || '',
        company: record.company || '',
        email: record.email || '',
        phone: record.phone || '',
        value: record.value ? record.value.replace(/[^0-9]/g, '') : '',
        status: record.status || 'Qualified',
        owner: record.owner || 'Alex Rivera',
      })
      setConfirmDelete(false)
    }
  }, [record])

  if (!record) return null

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) return

    onSave({
      ...record,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
      owner: form.owner,
      value: form.value ? `$${Number(form.value).toLocaleString()}` : '',
    })
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    if (onDelete) {
      onDelete(record.id)
      onClose()
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Workspace / Edit</p>
            <h2 id="edit-title">Edit {record.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close edit modal">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="create-form">
          <label>
            Name
            <input
              required
              autoFocus
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Full name or company name"
            />
          </label>

          <label>
            Company / Organization
            <input
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="e.g. Acme Inc."
            />
          </label>

          <div className="form-row">
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="name@company.com"
              />
            </label>

            <label>
              Phone / WhatsApp
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+1 555-0199"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
              >
                <option value="New lead">New lead</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Active">Active</option>
                <option value="Open">Open</option>
                <option value="Complete">Complete</option>
              </select>
            </label>

            <label>
              Pipeline Value ($)
              <input
                inputMode="numeric"
                value={form.value}
                onChange={(e) =>
                  update('value', e.target.value.replace(/[^0-9]/g, ''))
                }
                placeholder="0"
              />
            </label>
          </div>

          <label>
            Assigned Owner
            <select
              value={form.owner}
              onChange={(e) => update('owner', e.target.value)}
            >
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Sales team">Sales team</option>
              <option value="Support desk">Support desk</option>
            </select>
          </label>

          <div className="modal-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            {onDelete ? (
              <button
                type="button"
                className="secondary-button"
                style={{
                  color: confirmDelete ? '#e53e3e' : '#8993a2',
                  borderColor: confirmDelete ? '#feb2b2' : undefined,
                  background: confirmDelete ? '#fff5f5' : undefined,
                }}
                onClick={handleDelete}
              >
                <Trash2 size={15} />
                {confirmDelete ? 'Confirm delete?' : 'Delete'}
              </button>
            ) : <span />}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="secondary-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="primary-button" type="submit">
                <Check size={16} /> Save changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
