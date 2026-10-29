'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateRecordModalProps {
  type: string
  onClose: () => void
  onSave: (item: RecordItem) => void
}

export function CreateRecordModal({ type, onClose, onSave }: CreateRecordModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    status:
      type === 'Tasks'
        ? 'Open'
        : type === 'Leads'
          ? 'New lead'
          : 'Active',
  })

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) return

    onSave({
      ...form,
      id: crypto.randomUUID(),
      owner: siteConfig.currentUser.name,
      value: form.value ? `$${Number(form.value).toLocaleString()}` : '',
      createdAt: new Date().toISOString(),
    })
  }

  const entityName = type === 'Companies' ? 'company' : type.slice(0, -1).toLowerCase()

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
        aria-labelledby="create-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Workspace / {type}</p>
            <h2 id="create-title">Add {entityName}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close form">
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
              placeholder={
                type === 'Tasks'
                  ? 'Prepare quarterly review'
                  : 'Full name or company name'
              }
            />
          </label>

          <label>
            {type === 'Companies' ? 'Industry' : 'Company'}
            <input
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Acme Corp."
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="name@company.com"
            />
          </label>

          <div className="form-row">
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
              >
                <option>New lead</option>
                <option>Qualified</option>
                <option>Proposal</option>
                <option>Negotiation</option>
                <option>Active</option>
                <option>Open</option>
                <option>Complete</option>
              </select>
            </label>

            <label>
              Value
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

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="primary-button" type="submit">
              Create {entityName}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
