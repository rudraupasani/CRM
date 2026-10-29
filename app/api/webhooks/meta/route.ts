import { NextResponse } from 'next/server'

// Default verify token configured for free Meta Developer app
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'crm_meta_token_free'

/**
 * Meta Webhook verification handshake (GET)
 * Meta calls this endpoint when you register the webhook in the Meta App Dashboard.
 * Reference: https://developers.facebook.com/docs/graph-api/webhooks/getting-started
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json(
    {
      status: 'error',
      message: 'Verification failed. Token mismatch or missing hub parameters.',
      expectedToken: VERIFY_TOKEN,
      help: 'Configure this token in your Meta App Dashboard under Webhooks -> Leadgen',
    },
    { status: 403 }
  )
}

/**
 * Meta Lead Ads Event Receiver (POST)
 * Triggered by Meta when a user submits a Facebook / Instagram Lead Ad form.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Handle Meta real-time event
    const entries = body.entry || []
    const receivedLeads = []

    for (const entry of entries) {
      const changes = entry.changes || []
      for (const change of changes) {
        if (change.field === 'leadgen') {
          const leadgenId = change.value.leadgen_id
          const formId = change.value.form_id
          const pageId = change.value.page_id

          receivedLeads.push({
            id: `meta-${leadgenId || Date.now()}`,
            name: change.value.name || 'Meta Ad Lead',
            company: change.value.company || 'Inquiry via Facebook/IG',
            email: change.value.email || '',
            phone: change.value.phone || '',
            value: change.value.value || '₹1,00,000',
            source: 'Meta Ads',
            campaign: `Meta Lead Form #${formId || 'Campaign'}`,
            serviceType: change.value.serviceType || 'Custom Software Development',
            leadQuality: 'Hot',
            status: 'New lead',
            owner: 'Alex Rivera',
            notes: `Received via Meta Leadgen Webhook. Leadgen ID: ${leadgenId}, Page: ${pageId}`,
            createdAt: new Date().toISOString(),
          })
        }
      }
    }

    // Also support direct testing / payload simulation
    if (body.test || !body.entry) {
      const fallbackLead = {
        id: `meta-sim-${Date.now()}`,
        name: body.name || 'Priya Sharma (Sample Meta Lead)',
        company: body.company || 'NextGen Retail Solutions',
        email: body.email || 'priya@nextgenretail.in',
        phone: body.phone || '+91 98765 43210',
        value: body.value || '₹1,20,000',
        source: 'Meta Ads',
        campaign: body.campaign || 'Instagram Story Ad - IT Software Services',
        serviceType: body.serviceType || 'Custom ERP & Invoicing Software',
        leadQuality: 'Hot',
        status: 'New lead',
        owner: 'Alex Rivera',
        notes: body.notes || 'Interested in developing cloud ERP for multi-location inventory.',
        createdAt: new Date().toISOString(),
      }
      return NextResponse.json({
        success: true,
        message: 'Meta test lead processed successfully',
        lead: fallbackLead,
      })
    }

    return NextResponse.json({
      success: true,
      processed: receivedLeads.length,
      leads: receivedLeads,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook parsing error' },
      { status: 400 }
    )
  }
}

