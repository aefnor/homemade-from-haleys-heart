import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout-cancel')({
  component: CheckoutCancelPage,
})

function CheckoutCancelPage() {
  return (
    <section
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      <div className="max-w-xl space-y-6 bg-white shadow-xl rounded-3xl p-10">
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text-dark)' }}
        >
          Checkout canceled
        </h1>
        <p style={{ color: 'var(--color-text-light)' }}>
          No worries—your cart is still saved if you&apos;d like to give it
          another try.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Return to Shop
          </Link>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 rounded-full font-semibold hover:bg-[#fef8f3] transition-colors"
            style={{ color: 'var(--color-secondary)' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
