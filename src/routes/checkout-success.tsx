import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export const Route = createFileRoute('/checkout-success')({
  component: CheckoutSuccessPage,
})

function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

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
          Thank you for your order!
        </h1>
        <p style={{ color: 'var(--color-text-dark)' }}>
          A confirmation email is on its way. We&apos;ll reach out soon to
          finalize pickup or delivery details.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          Keep Shopping
        </Link>
      </div>
    </section>
  )
}
