// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { CartProvider, useCart } from './CartContext'

function CartProbe() {
  const { addToCart, cartCount } = useCart()

  return (
    <div>
      <button
        onClick={() =>
          addToCart({
            id: 1,
            name: 'Traditional Sourdough Bread',
            price: 12,
            image: '/images/TRADITIONAL SOURDOUGH BREAD.webp',
          })
        }
      >
        Add
      </button>
      <span data-testid="cart-count">{cartCount}</span>
    </div>
  )
}

describe('CartProvider', () => {
  afterEach(() => {
    cleanup()
    window.localStorage.clear()
  })

  it('persists cart items to localStorage', () => {
    window.localStorage.clear()

    render(
      <CartProvider>
        <CartProbe />
      </CartProvider>,
    )

    fireEvent.click(screen.getByText('Add'))

    expect(screen.getByTestId('cart-count').textContent).toBe('1')
    expect(window.localStorage.getItem('haleys-heart-cart')).toContain(
      'Traditional Sourdough Bread',
    )
  })

  it('hydrates cart items from localStorage', () => {
    window.localStorage.setItem(
      'haleys-heart-cart',
      JSON.stringify([
        {
          id: 3,
          name: 'Cinnamon Rolls',
          price: 12,
          image: '/images/Cinnamon Rolls.webp',
          quantity: 2,
        },
      ]),
    )

    render(
      <CartProvider>
        <CartProbe />
      </CartProvider>,
    )

    expect(screen.getByTestId('cart-count').textContent).toBe('2')
  })
})
