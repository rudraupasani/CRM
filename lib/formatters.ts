/**
 * Generates initials from a full name (e.g., "Olivia Martin" -> "OM")
 */
export function getInitials(name: string): string {
  if (!name) return ''
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('')
}

/**
 * Normalizes phone numbers for WhatsApp link generation
 */
export function getWhatsAppHref(name: string, phone?: string): string {
  const cleanPhone = phone?.replace(/[^0-9+]/g, '') || ''
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone.replace(/^\+/, '')}`
  }
  return `https://wa.me/?text=${encodeURIComponent(`Hi ${name}, following up from morfex.tech.`)}`
}

/**
 * Formats a currency number or string to a formatted dollar amount
 */
export function formatCurrency(value: string | number): string {
  const numeric = typeof value === 'string' ? Number(value.replace(/[^0-9.-]+/g, '')) : value
  if (isNaN(numeric) || numeric === 0) return ''
  return `$${numeric.toLocaleString()}`
}
