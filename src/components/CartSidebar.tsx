import { useState } from 'react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getStripe } from '../lib/stripe'

type StripeCheckoutClient = {
  redirectToCheckout: (options: { sessionId: string }) => Promise<{
    error?: { message?: string }
  }>
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (isCheckingOut) {
      return
    }

    setIsCheckingOut(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(({ id, name, price, quantity }) => ({
            id,
            name,
            price,
            quantity,
          })),
          successUrl: `${window.location.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout-cancel`,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok || !payload) {
        throw new Error(payload?.error ?? 'Failed to start checkout.')
      }

      const { sessionId, url } = payload as {
        sessionId?: string
        url?: string
      }

      if (url) {
        window.location.href = url
        return
      }

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to initialize.')
      }

      if (!sessionId) {
        throw new Error('Checkout session is missing an id.')
      }

      const { error } = await (
        stripe as unknown as StripeCheckoutClient
      ).redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Checkout error:', error)
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'We were unable to start the checkout. Please try again.'
      alert(message)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      {/* Invisible overlay for click-to-close functionality */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag
              size={24}
              style={{ color: 'var(--color-secondary)' }}
            />
            <h2
              className="text-xl font-bold"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Shopping Cart ({cartCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#fef8f3] transition-colors"
            aria-label="Close cart"
            style={{ color: 'var(--color-secondary)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingBag
                size={64}
                style={{ color: 'var(--color-text-light)' }}
                className="mb-4 opacity-30"
              />
              <p
                style={{ color: 'var(--color-text-light)' }}
                className="text-center"
              >
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--color-bg-light)' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-sm mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="hover:opacity-70 transition-opacity"
                          aria-label="Decrease quantity"
                        >
                          <Minus
                            size={16}
                            style={{ color: 'var(--color-secondary)' }}
                          />
                        </button>
                        <span
                          className="font-semibold min-w-[20px] text-center"
                          style={{ color: 'var(--color-text-dark)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="hover:opacity-70 transition-opacity"
                          aria-label="Increase quantity"
                        >
                          <Plus
                            size={16}
                            style={{ color: 'var(--color-secondary)' }}
                          />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2
                          size={18}
                          style={{ color: 'var(--color-text-light)' }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            className="border-t p-6 space-y-4"
            style={{ borderColor: 'var(--color-accent)' }}
          >
            <div className="flex justify-between items-center">
              <span
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Subtotal:
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: 'var(--color-secondary)' }}
              >
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-4 rounded-full font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-secondary)' }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              aria-disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Starting checkout…' : 'Proceed to Checkout'}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-3 rounded-full font-semibold hover:bg-[#fef8f3] transition-colors"
              style={{ color: 'var(--color-text-light)' }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
