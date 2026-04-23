import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  buildCartSummary,
  buildCheckoutSessionParams,
  createCheckoutSessionHandler,
  createCheckoutStatusHandler,
  createStripeWebhookHandler,
  resolveCatalogItems,
  sanitizeCartItems,
} from './checkout.mjs'
import { productsById } from './products.mjs'

describe('sanitizeCartItems', () => {
  it('keeps only valid ids and quantities and merges duplicates', () => {
    expect(
      sanitizeCartItems([
        { id: 1, quantity: 2, price: 1 },
        { id: 1, quantity: 3 },
        { id: 0, quantity: 1 },
        { id: 2, quantity: 0 },
      ]),
    ).toEqual([{ id: 1, quantity: 5 }])
  })
})

describe('buildCartSummary', () => {
  it('builds a compact metadata summary', () => {
    expect(
      buildCartSummary([
        { id: 1, name: 'Traditional Sourdough Bread', quantity: 2, price: 12 },
        { id: 2, name: 'Cinnamon Rolls', quantity: 1, price: 12 },
      ]),
    ).toBe('2x Traditional Sourdough Bread | 1x Cinnamon Rolls')
  })
})

describe('resolveCatalogItems', () => {
  it('resolves valid products from the server catalog', () => {
    const result = resolveCatalogItems(
      [
        { id: 1, quantity: 2, price: 1 },
        { id: 3, quantity: 1 },
      ],
      productsById,
    )

    expect(result.error).toBeUndefined()
    expect(result.resolvedItems).toEqual([
      {
        id: 1,
        name: 'Traditional Sourdough Bread',
        price: 12,
        quantity: 2,
        stripePriceId: 'price_1SS8Iw4a4A13fgGOgywZigH2',
      },
      {
        id: 3,
        name: 'Cinnamon Rolls',
        price: 12,
        quantity: 1,
        stripePriceId: 'price_1SS8R94a4A13fgGOa5NbaAMk',
      },
    ])
  })

  it('rejects products that are not checkout ready', () => {
    const result = resolveCatalogItems([{ id: 12, quantity: 1 }], productsById)

    expect(result).toEqual({
      error: {
        status: 400,
        body: {
          error: 'Custom Loaf is not available for checkout yet.',
        },
      },
    })
  })
})

describe('buildCheckoutSessionParams', () => {
  it('builds Stripe line items from catalog price ids instead of browser prices', () => {
    const result = buildCheckoutSessionParams({
      items: [
        { id: 1, quantity: 2, price: 0.01, name: 'Hacked Bread' },
        { id: 3, quantity: 1, price: 999, name: 'Wrong Name' },
      ],
      allowedOrigins: ['http://localhost:3000'],
      catalog: productsById,
    })

    expect(result.error).toBeUndefined()
    expect(result.sessionParams).toMatchObject({
      mode: 'payment',
      success_url:
        'http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkout-cancel',
      metadata: {
        cart: '2x Traditional Sourdough Bread | 1x Cinnamon Rolls',
      },
    })
    expect(result.sessionParams.line_items).toEqual([
      {
        price: 'price_1SS8Iw4a4A13fgGOgywZigH2',
        quantity: 2,
      },
      {
        price: 'price_1SS8R94a4A13fgGOa5NbaAMk',
        quantity: 1,
      },
    ])
  })

  it('falls back when return urls are outside the allowed origins', () => {
    const result = buildCheckoutSessionParams({
      items: [{ id: 1, quantity: 1 }],
      allowedOrigins: ['http://localhost:3000'],
      successUrl: 'https://evil.example/success',
      cancelUrl: 'https://evil.example/cancel',
      catalog: productsById,
    })

    expect(result.sessionParams.success_url).toBe(
      'http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}',
    )
    expect(result.sessionParams.cancel_url).toBe(
      'http://localhost:3000/checkout-cancel',
    )
  })
})

describe('createCheckoutSessionHandler', () => {
  let res
  let consoleErrorSpy

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    res = {
      statusCode: 200,
      body: undefined,
      status(code) {
        this.statusCode = code
        return this
      },
      json(payload) {
        this.body = payload
        return this
      },
    }
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('returns 400 for an empty cart', async () => {
    const handler = createCheckoutSessionHandler({
      stripe: { checkout: { sessions: { create: vi.fn() } } },
      allowedOrigins: ['http://localhost:3000'],
      catalog: productsById,
    })

    await handler({ body: { items: [] } }, res)

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'Cart is empty.' })
  })

  it('creates a Stripe session and returns the checkout url', async () => {
    const createSession = vi.fn().mockResolvedValue({
      id: 'cs_test_123',
      url: 'https://checkout.stripe.com/pay/cs_test_123',
    })
    const handler = createCheckoutSessionHandler({
      stripe: { checkout: { sessions: { create: createSession } } },
      allowedOrigins: ['http://localhost:3000'],
      stripeSuccessUrl: 'http://localhost:3000/checkout-success',
      stripeCancelUrl: 'http://localhost:3000/checkout-cancel',
      catalog: productsById,
    })

    await handler(
      {
        body: {
          items: [{ id: 6, quantity: 2, price: 0.01 }],
        },
      },
      res,
    )

    expect(createSession).toHaveBeenCalledOnce()
    expect(createSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          {
            price: 'price_1SS8Rn4a4A13fgGO5OImCYib',
            quantity: 2,
          },
        ],
        metadata: {
          cart: '2x Sourdough Starter',
        },
      }),
    )
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      sessionId: 'cs_test_123',
      url: 'https://checkout.stripe.com/pay/cs_test_123',
    })
  })

  it('returns 500 when Stripe throws', async () => {
    const handler = createCheckoutSessionHandler({
      stripe: {
        checkout: {
          sessions: {
            create: vi.fn().mockRejectedValue(new Error('Stripe exploded')),
          },
        },
      },
      allowedOrigins: ['http://localhost:3000'],
      catalog: productsById,
    })

    await handler(
      {
        body: {
          items: [{ id: 1, quantity: 1 }],
        },
      },
      res,
    )

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual({
      error: 'Unable to start checkout. Please try again shortly.',
    })
  })
})

describe('createCheckoutStatusHandler', () => {
  it('returns paid status for a Stripe session', async () => {
    const handler = createCheckoutStatusHandler({
      stripe: {
        checkout: {
          sessions: {
            retrieve: vi.fn().mockResolvedValue({
              id: 'cs_paid_123',
              status: 'complete',
              payment_status: 'paid',
              amount_total: 2400,
              currency: 'usd',
              customer_details: { email: 'haley@example.com' },
              metadata: { cart: '2x Traditional Sourdough Bread' },
            }),
          },
        },
      },
    })
    const res = {
      statusCode: 200,
      body: undefined,
      status(code) {
        this.statusCode = code
        return this
      },
      json(payload) {
        this.body = payload
        return this
      },
    }

    await handler({ query: { session_id: 'cs_paid_123' } }, res)

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({
      sessionId: 'cs_paid_123',
      paid: true,
      paymentStatus: 'paid',
      amountTotal: 2400,
      currency: 'usd',
      customerEmail: 'haley@example.com',
    })
  })
})

describe('createStripeWebhookHandler', () => {
  it('stores completed checkout sessions from verified webhooks', async () => {
    const handler = createStripeWebhookHandler({
      stripe: {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue({
            type: 'checkout.session.completed',
            data: {
              object: {
                id: 'cs_webhook_123',
                status: 'complete',
                payment_status: 'paid',
                amount_total: 1200,
                currency: 'usd',
                customer_details: { email: 'haley@example.com' },
                metadata: { cart: '1x Traditional Sourdough Bread' },
              },
            },
          }),
        },
      },
      webhookSecret: 'whsec_test_123',
    })
    const res = {
      statusCode: 200,
      body: undefined,
      status(code) {
        this.statusCode = code
        return this
      },
      json(payload) {
        this.body = payload
        return this
      },
    }

    await handler(
      {
        body: Buffer.from('{}'),
        headers: {
          'stripe-signature': 't=1,v1=test',
        },
      },
      res,
    )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ received: true })
  })
})
