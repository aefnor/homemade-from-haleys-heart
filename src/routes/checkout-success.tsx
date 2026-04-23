import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  fetchCheckoutSessionStatus,
  getCheckoutSessionId,
} from '../lib/checkoutSession'

export const Route = createFileRoute('/checkout-success')({
  component: CheckoutSuccessPage,
})

function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const [status, setStatus] = useState<
    | { kind: 'loading' }
    | { kind: 'success'; email?: string | null }
    | { kind: 'pending' }
    | { kind: 'error'; message: string }
  >({ kind: 'loading' })

  useEffect(() => {
    const sessionId = getCheckoutSessionId(window.location.search)

    if (!sessionId) {
      setStatus({
        kind: 'error',
        message: 'This checkout confirmation link is missing a session id.',
      })
      return
    }

    let isMounted = true

    fetchCheckoutSessionStatus(sessionId)
      .then((payload) => {
        if (!isMounted) {
          return
        }

        if (payload.paid) {
          clearCart()
          setStatus({
            kind: 'success',
            email: payload.customerEmail ?? null,
          })
          return
        }

        setStatus({ kind: 'pending' })
      })
      .catch((error) => {
        if (!isMounted) {
          return
        }

        setStatus({
          kind: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Unable to verify the checkout session.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [clearCart])

  const title =
    status.kind === 'success'
      ? 'Thank you for your order!'
      : status.kind === 'pending'
        ? 'Payment still processing'
        : status.kind === 'error'
          ? 'We could not verify this order'
          : 'Checking your order status...'

  const message =
    status.kind === 'success'
      ? status.email
        ? `Payment was confirmed through Stripe. A confirmation email should arrive at ${status.email}.`
        : `Payment was confirmed through Stripe. We'll reach out soon to finalize pickup or delivery details.`
      : status.kind === 'pending'
        ? 'Stripe has the checkout session, but payment is not marked as complete yet. If you were charged, refresh this page in a moment.'
        : status.kind === 'error'
          ? status.message
          : 'Verifying your checkout session with Stripe now.'

  return (
    <section
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      <div className="max-w-xl space-y-6 bg-white shadow-xl rounded-3xl p-10">
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-secondary)' }}
        >
          {title}
        </h1>
        <p style={{ color: 'var(--color-text-dark)' }}>{message}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Keep Shopping
          </Link>
          {(status.kind === 'pending' || status.kind === 'error') && (
            <Link
              to="/contact"
              className="inline-block px-6 py-3 rounded-full font-semibold hover:bg-[#fef8f3] transition-colors"
              style={{ color: 'var(--color-secondary)' }}
            >
              Contact Us
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
