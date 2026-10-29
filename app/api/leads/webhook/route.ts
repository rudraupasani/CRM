import { NextResponse } from 'next/server'

/**
 * Universal Marketing & Lead Capture Webhook Endpoint (POST)
 * Used by Zapier, Make.com, WordPress, Webflow, Typeform, Tally, Google Forms,
 * LinkedIn Ads, and custom landing pages.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Accept either single lead object or array of leads
    const rawList = Array.isArray(data) ? data : [data]

    const leads = rawList.map((item, idx) => {
      const name = item.name || item.fullName || item.clientName || 'Inbound Web Lead'
      const company = item.company || item.organization || item.businessName || 'Software Client'
      const email = item.email || item.emailAddress || ''
      const phone = item.phone || item.mobileNumber || item.contact || ''
      let value = item.value || item.budget || '₹1,00,000'
      if (!value.toString().startsWith('₹') && !value.toString().startsWith('$')) {
        const num = Number(value.toString().replace(/[^0-9]/g, '')) || 100000
        value = `₹${num.toLocaleString('en-IN')}`
      }

      return {
        id: `webhook-${Date.now()}-${idx}`,
        name,
        company,
        email,
        phone,
        value,
        status: item.status || 'New lead',
        source: item.source || 'Custom Webhook',
        campaign: item.campaign || 'Inbound Marketing Webhook',
        serviceType: item.serviceType || item.requirement || 'Custom IT / Software Solution',
        leadQuality: item.leadQuality || 'Hot',
        owner: item.owner || 'Alex Rivera',
        notes: item.notes || item.message || item.projectDescription || 'Submitted via marketing webhook integration.',
        createdAt: new Date().toISOString(),
      }
    })

    return NextResponse.json({
      success: true,
      message: `Successfully captured ${leads.length} lead(s) into CRM`,
      leads,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Invalid webhook JSON payload' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/leads/webhook',
    supportedMethod: 'POST',
    description: 'Post JSON payload with name, email, phone, company, budget/value, and requirement.',
    samplePayload: {
      name: 'Amit Patel',
      company: 'Apex Tech Labs',
      email: 'amit@apextech.in',
      phone: '+91 98200 11223',
      value: '₹1,50,000',
      serviceType: 'Custom SaaS Portal & Mobile App',
      source: 'Zapier Webhook / Website Form',
      notes: 'Client needs custom billing and employee tracking platform.',
    },
  })
}

