'use client'

import { useState } from 'react'
import { X, Building2, Globe, Check, Shield } from 'lucide-react'
import type { RecordItem } from '@/types/crm'
import { siteConfig } from '@/config/site'

interface CreateCompanyModalProps {
  onClose: () => void
  onSave: (item: RecordItem) => void
}

export function CreateCompanyModal({ onClose, onSave }: CreateCompanyModalProps) {
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('Logistics & Supply Chain')
  const [companySize, setCompanySize] = useState('51-200 Employees')
  const [gstin, setGstin] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [budgetCapacity, setBudgetCapacity] = useState('₹1,50,000')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onSave({
      id: crypto.randomUUID(),
      name: name.trim(),
      company: name.trim(),
      status: 'Active',
      value: budgetCapacity,
      owner: siteConfig.currentUser.name,
      email: email.trim(),
      phone: phone.trim(),
      industry,
      companySize,
      gstin: gstin.trim(),
      website: website.trim(),
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
        style={{ width: 'min(100%, 560px)', padding: '24px' }}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase' }}>
              <Building2 size={14} /> Corporate Account Profile
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800 }}>Register Company</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Store client corporate billing hierarchy, GST details, and enterprise capacity.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label>
            Company Legal / Trade Name *
            <input
              required
              autoFocus
              placeholder="e.g. Apex Logistics Tech Pvt. Ltd."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Industry Sector
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                <option value="FinTech & Banking">FinTech & Banking</option>
                <option value="Healthcare & Telemedicine">Healthcare & Telemedicine</option>
                <option value="EdTech & E-Learning">EdTech & E-Learning</option>
                <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                <option value="Manufacturing & ERP">Manufacturing & ERP</option>
                <option value="Real Estate & Construction">Real Estate & Construction</option>
              </select>
            </label>

            <label>
              Company Scale / Size
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              >
                <option value="1-10 Employees">1-10 Employees (Startup)</option>
                <option value="11-50 Employees">11-50 Employees</option>
                <option value="51-200 Employees">51-200 Employees (Mid-Market)</option>
                <option value="201-500 Employees">201-500 Employees</option>
                <option value="500+ Employees">500+ Employees (Enterprise)</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Company Website URL
              <input
                type="url"
                placeholder="https://company.in"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>

            <label>
              GSTIN / Corporate Tax ID
              <input
                placeholder="e.g. 27AABCA1234F1Z8"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Corporate Billing Email
              <input
                type="email"
                placeholder="billing@company.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Boardline / Office Phone
              <input
                type="tel"
                placeholder="+91 22 4000 1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <label>
            Estimated Software & IT Budget Capacity
            <input
              placeholder="e.g. ₹1,50,000 - ₹3,00,000 / project"
              value={budgetCapacity}
              onChange={(e) => setBudgetCapacity(e.target.value)}
            />
          </label>

          <label>
            Corporate Overview & Background
            <textarea
              rows={2}
              placeholder="e.g. 120 logistics vehicles operating in western corridor. Modernizing manual paper manifests into cloud ERP."
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
            <button className="primary-button" type="submit" style={{ background: '#0284c7' }}>
              <Check size={16} /> Save Organization
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

