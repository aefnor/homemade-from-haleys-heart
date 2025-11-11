import { loadStripe } from '@stripe/stripe-js'
import type { Stripe as StripeClient } from '@stripe/stripe-js'

let stripePromise: Promise<StripeClient | null> | null = null

export function getStripe(): Promise<StripeClient | null> {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      console.warn(
        'Stripe publishable key is missing. Set VITE_STRIPE_PUBLISHABLE_KEY in your environment.',
      )
    }
    stripePromise = publishableKey
      ? loadStripe(publishableKey)
      : Promise.resolve(null)
  }
  return stripePromise
}
