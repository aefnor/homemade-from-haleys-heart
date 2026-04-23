import { apiUrl } from './api'

export type CheckoutSessionStatus = {
  sessionId: string
  status: string | null
  paymentStatus: string | null
  paid: boolean
  amountTotal: number | null
  currency: string | null
  customerEmail: string | null
}

export function getCheckoutSessionId(search: string) {
  return new URLSearchParams(search).get('session_id')
}

export async function fetchCheckoutSessionStatus(sessionId: string) {
  const response = await fetch(
    apiUrl(
      `/api/checkout-session-status?session_id=${encodeURIComponent(sessionId)}`,
    ),
  )
  const payload = await response.json().catch(() => null)

  if (!response.ok || !payload) {
    throw new Error(payload?.error ?? 'Unable to verify the checkout session.')
  }

  return payload as CheckoutSessionStatus
}
