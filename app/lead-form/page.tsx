'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Mail, Phone, Code2 } from 'lucide-react'

export default function LeadCapturePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: 'Custom Software & Web Application',
    budget: '₹1,00,000 - ₹2,50,000',
    timeline: 'Within 30 Days',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // POST to our free lead webhook API
      const res = await fetch('/api/leads/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          value: form.budget.split(' - ')[0] || '₹1,00,000',
          serviceType: form.serviceType,
          source: 'Website Lead Form',
          campaign: 'Direct Public Requirement Form',
          leadQuality: 'Hot',
          status: 'New lead',
          notes: `Budget: ${form.budget}. Timeline: ${form.timeline}. Requirements: ${form.notes}`,
        }),
      })

      const data = await res.json()
      if (data.success && data.leads?.[0]) {
        // Also persist to local storage for immediate visibility in CRM
        try {
          const STORAGE_KEY = 'morfex.tech-records'
          const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify([data.leads[0], ...existing]))
        } catch (err) {
          console.error(err)
        }
      }

      setSubmitted(true)
    } catch (err) {
      alert('Error submitting inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          padding: '36px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(114, 87, 233, 0.2)',
              border: '1px solid rgba(114, 87, 233, 0.4)',
              color: '#c4b5fd',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} /> Professional Software Development & IT Services
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Request Project Scope & Quote
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
            Tell us about your software requirement. Our senior engineering team will provide a detailed scope breakdown, architecture plan, and cost estimate within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#4ade80',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px' }}>Project Request Received!</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.6 }}>
              Thank you, <strong>{form.name}</strong>. Your project requirement has been pushed directly into our engineering CRM. A technical lead will contact you at <strong>{form.email}</strong> / <strong>{form.phone}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setForm({
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  serviceType: 'Custom Software & Web Application',
                  budget: '₹1,00,000 - ₹2,50,000',
                  timeline: 'Within 30 Days',
                  notes: '',
                })
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#7257e9',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                Full Name *
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                Company / Organization *
                <input
                  required
                  type="text"
                  placeholder="e.g. Apex Health Logistics"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                Work Email *
                <input
                  required
                  type="email"
                  placeholder="rahul@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                Phone / WhatsApp *
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                Software Solution Type
                <select
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  style={{
                    background: '#1e293b',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="Custom Software & Web Application">Custom Software & Web App</option>
                  <option value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</option>
                  <option value="Enterprise ERP & Custom CRM">Enterprise ERP & Custom CRM</option>
                  <option value="SaaS MVP Development">SaaS MVP Development</option>
                  <option value="AI / Automation & WhatsApp Bots">AI / Automation & WhatsApp Bots</option>
                  <option value="Cloud, DevOps & API Backend">Cloud, DevOps & API Backend</option>
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                Target Investment / Budget
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  style={{
                    background: '#1e293b',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (Starter / MVP)</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 (Standard IT Solution)</option>
                  <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000 (Scale & Enterprise)</option>
                  <option value="₹5,00,000+">₹5,00,000+ (Full Suite Development)</option>
                </select>
              </label>
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
              Project Overview & Key Requirements
              <textarea
                rows={3}
                placeholder="Describe what you want to build, key features, target users, or integrations needed..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #7257e9 0%, #4f46e5 100%)',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 10px 20px -5px rgba(114, 87, 233, 0.5)',
              }}
            >
              {loading ? 'Submitting to Engineering Team...' : 'Request Scope & Proposal'}
              <ArrowRight size={17} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                fontSize: '12px',
                color: '#64748b',
                marginTop: '6px',
              }}
            >
              <span>🔒 100% Confidential</span>
              <span>⚡ Free Scope Consultation</span>
              <span>💼 NDA Protected</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
