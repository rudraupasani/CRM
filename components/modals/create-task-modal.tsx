'use client'

import { useState } from 'react'
import { X, ClipboardCheck, Calendar, User, Flag, Check, Building2 } from 'lucide-react'
import type { RecordItem, PriorityLevel } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateTaskModalProps {
  onClose: () => void
  onSave: (item: RecordItem) => void
  records?: RecordItem[]
}

export function CreateTaskModal({ onClose, onSave, records = [] }: CreateTaskModalProps) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [priority, setPriority] = useState<PriorityLevel>('High')
  const [taskCategory, setTaskCategory] = useState('Tech Review')
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10))
  const [assignee, setAssignee] = useState(siteConfig.currentUser.name)
  const [status, setStatus] = useState('To Do')
  const [notes, setNotes] = useState('')

  const clientCompanies = Array.from(new Set(records.map((r) => r.company).filter(Boolean)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      id: crypto.randomUUID(),
      name: title.trim(),
      company: company || 'General IT Task',
      status,
      value: '—',
      owner: assignee,
      priority,
      taskCategory,
      dueDate,
      assignee,
      notes,
      createdAt: new Date().toISOString(),
    })
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
        style={{ width: 'min(100%, 540px)', padding: '24px' }}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
              <ClipboardCheck size={14} /> Action Item & Engineering Task
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Create New Task</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Assign milestone work, discovery meetings, and deliverables across team members.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label>
            Task Title / Action Item *
            <input
              required
              autoFocus
              placeholder="e.g. Conduct Architecture Review with FinTrack CTO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Associated Client / Company
              <input
                list="companies-list"
                placeholder="e.g. Apex Logistics Tech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <datalist id="companies-list">
                {clientCompanies.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>

            <label>
              Task Category
              <select
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value)}
              >
                <option value="Tech Review">Tech Review</option>
                <option value="Client Call">Client Call / Demo</option>
                <option value="Scope Estimation">Scope & SOW Estimation</option>
                <option value="Milestone Delivery">Milestone Delivery</option>
                <option value="Code Review">Code Review & Architecture</option>
                <option value="Follow-up">Proposal Follow-up</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Priority Level
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
              >
                <option value="Urgent">🔴 Urgent (Immediate Action)</option>
                <option value="High">🟠 High Priority</option>
                <option value="Medium">🔵 Medium Priority</option>
                <option value="Low">⚪ Low Priority</option>
              </select>
            </label>

            <label>
              Initial Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Due Date
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>

            <label>
              Assigned Team Member
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value={siteConfig.currentUser.name}>{siteConfig.currentUser.name} (Lead Consultant)</option>
                <option value="Engineering Desk">Engineering Desk</option>
                <option value="Sales team">Sales Team</option>
                <option value="QA Specialist">QA & Testing Specialist</option>
              </select>
            </label>
          </div>

          <label>
            Detailed Instructions & Deliverable Checklist
            <textarea
              rows={3}
              placeholder="e.g. Review AWS multi-region configuration, verify API endpoints with client team..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #e1e6ed',
                borderRadius: '7px',
                padding: '9px 12px',
                fontSize: '12px',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-button" type="submit" style={{ background: '#f59e0b', color: '#000' }}>
              <Check size={16} /> Save Task
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

