import Stripe from 'stripe'
import { describe, expect, it } from 'vitest'
import { products as appProducts } from '../src/data/products'
import { buildCheckoutSessionParams } from './checkout.mjs'
import {
  getProductsByIdForStripeMode,
  getProductsForStripeMode,
} from './products.mjs'

const runStripeIntegration = process.env.RUN_STRIPE_INTEGRATION_TESTS === 'true'
const describeStripe = runStripeIntegration ? describe : describe.skip

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe =
  runStripeIntegration && stripeSecretKey
    ? new Stripe(stripeSecretKey)
    : null
const serverProducts = getProductsForStripeMode('test')
const productsById = getProductsByIdForStripeMode('test')

const stripeNameAliases = new Map([
  ['Traditional Sourdough Bread', ['Traditional Loaf']],
  ['Sourdough Pizza Dough', ['Pizza Dough']],
  ['White Cheddar Everything Bagel', ['Everything Bagel + White Cheddar']],
  ['Sourdough Sandwich Bread', ['Sandwich Bread']],
  ['Sourdough Starter', ['Sour Dough Starter']],
  ['Blueberry Lemon Sourdough', ['Blueberry Lemon']],
  ['Double Chocolate Sourdough', ['Double Chocolate']],
  ['Jalapeno Cheddar Sourdough', ['Jalapeno Cheddar']],
  ['Rosemary Garlic Sourdough', ['Rosemary Garlic']],
  ['Habanero Swiss Sourdough', ['Habanero Swiss']],
  ['Cinnamon Sugar Sourdough', ['Cinnamon Sugar']],
])

function getCandidateNames(productName) {
  return [productName, ...(stripeNameAliases.get(productName) ?? [])]
}

function buildPriceLookup(stripePrices) {
  const lookup = new Map()

  for (const price of stripePrices) {
    const product = price.product
    if (typeof product === 'string') {
      continue
    }

    lookup.set(product.name, price)
  }

  return lookup
}

describeStripe('Stripe catalog integration', () => {
  it('has credentials configured for live Stripe validation', () => {
    expect(stripeSecretKey).toBeTruthy()
    expect(stripe).not.toBeNull()
  })

  it('matches each local product to an active Stripe price with the same amount', async () => {
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ['data.product'],
    })
    const priceLookup = buildPriceLookup(prices.data)
    const mismatches = []

    for (const product of appProducts) {
      if (product.availableForCheckout === false) {
        continue
      }

      const match = getCandidateNames(product.name)
        .map((name) => priceLookup.get(name))
        .find(Boolean)

      if (!match) {
        mismatches.push(`${product.name}: missing active Stripe product/price`)
        continue
      }

      const expectedAmount = product.price * 100
      if (match.unit_amount !== expectedAmount) {
        const stripeProduct =
          typeof match.product === 'string' ? match.product : match.product.name
        mismatches.push(
          `${product.name}: app=$${product.price.toFixed(2)} stripe=${match.unit_amount ? `$${(match.unit_amount / 100).toFixed(2)}` : 'n/a'} (${stripeProduct})`,
        )
      }
    }

    expect(
      mismatches,
      mismatches.length === 0
        ? undefined
        : `Stripe catalog mismatches:\n${mismatches.join('\n')}`,
    ).toEqual([])
  })
})

describeStripe('Stripe checkout integration', () => {
  it(
    'creates a valid live checkout session for each product amount',
    async () => {
      const failures = []

      for (const product of serverProducts) {
        if (!product.stripePriceId) {
          continue
        }

        try {
          const { sessionParams, error } = buildCheckoutSessionParams({
            items: [{ id: product.id, quantity: 1 }],
            allowedOrigins: ['http://localhost:3000'],
            catalog: productsById,
          })

          if (error) {
            failures.push(`${product.name}: ${error.body.error}`)
            continue
          }

          const session = await stripe.checkout.sessions.create(sessionParams)
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id,
            {
              limit: 10,
              expand: ['data.price'],
            },
          )
          const firstLineItem = lineItems.data[0]
          const lineItemPrice =
            typeof firstLineItem?.price === 'string'
              ? firstLineItem.price
              : firstLineItem?.price?.id

          if (!session.id || !session.url) {
            failures.push(`${product.name}: Stripe did not return a checkout url`)
            continue
          }

          if (session.metadata?.cart !== `1x ${product.name}`) {
            failures.push(
              `${product.name}: metadata.cart was "${session.metadata?.cart ?? ''}"`,
            )
          }

          if (lineItemPrice !== product.stripePriceId) {
            failures.push(
              `${product.name}: session used ${lineItemPrice ?? 'no price id'} instead of ${product.stripePriceId ?? 'null'}`,
            )
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          failures.push(`${product.name}: ${message}`)
        }
      }

      expect(
        failures,
        failures.length === 0
          ? undefined
          : `Stripe checkout failures:\n${failures.join('\n')}`,
      ).toEqual([])
    },
    30000,
  )

  it('creates a valid live mixed-cart checkout session with real Stripe price ids', async () => {
    const { sessionParams, error } = buildCheckoutSessionParams({
      items: [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
        { id: 13, quantity: 3 },
      ],
      allowedOrigins: ['http://localhost:3000'],
      catalog: productsById,
    })

    expect(error).toBeUndefined()

    const session = await stripe.checkout.sessions.create(sessionParams)
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 10,
      expand: ['data.price'],
    })

    expect(session.id).toBeTruthy()
    expect(session.url).toBeTruthy()
    expect(session.mode).toBe('payment')
    expect(session.metadata?.cart).toContain('2x Traditional Sourdough Bread')
    expect(session.metadata?.cart).toContain('1x Cinnamon Rolls')
    expect(session.metadata?.cart).toContain('3x Sourdough Croutons')
    expect(
      lineItems.data.map((item) =>
        typeof item.price === 'string' ? item.price : item.price?.id,
      ),
    ).toEqual([
      'price_1SS8Iw4a4A13fgGOgywZigH2',
      'price_1SS8R94a4A13fgGOa5NbaAMk',
      'price_1SS8WI4a4A13fgGOAZ9C57GI',
    ])
  })
})
