import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import Stripe from 'stripe'

dotenv.config()

const {
  STRIPE_SECRET_KEY,
  STRIPE_PRODUCT_ID = 'prod_TJzL7qCcb6i4Tz',
  CLIENT_ORIGIN = 'http://localhost:3000',
  STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL,
  PORT = 4242,
} = process.env

if (!STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY environment variable.')
  process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY)

const app = express()

const allowedOrigins = CLIENT_ORIGIN.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  }),
)
app.use(express.json())

app.post('/api/create-checkout-session', async (req, res) => {
  const { items, successUrl, cancelUrl } = req.body ?? {}

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' })
  }

  const sanitizedItems = items
    .map((item) => ({
      name: String(item?.name ?? ''),
      quantity: Number(item?.quantity ?? 0),
      price: Number(item?.price ?? 0),
    }))
    .filter((item) => item.quantity > 0 && item.price > 0)

  if (sanitizedItems.length === 0) {
    return res
      .status(400)
      .json({ error: 'Cart items must include positive quantity and price.' })
  }

  const subtotal = sanitizedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const subtotalInCents = Math.round(subtotal * 100)

  if (subtotalInCents <= 0) {
    return res
      .status(400)
      .json({ error: 'Unable to calculate a valid order total for checkout.' })
  }

  const metadataCartSummary = sanitizedItems
    .map((item) => `${item.quantity}x ${item.name}`.slice(0, 45))
    .join(' | ')
    .slice(0, 499)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product: STRIPE_PRODUCT_ID,
            unit_amount: subtotalInCents,
          },
          quantity: 1,
        },
      ],
      success_url:
        successUrl ??
        STRIPE_SUCCESS_URL ??
        `${allowedOrigins[0] ?? 'http://localhost:3000'}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        cancelUrl ??
        STRIPE_CANCEL_URL ??
        `${allowedOrigins[0] ?? 'http://localhost:3000'}/checkout-cancel`,
      metadata: metadataCartSummary
        ? {
            cart: metadataCartSummary,
          }
        : undefined,
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ['US'] },
    })

    return res.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout session error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return res.status(500).json({ error: message })
  }
})

app.get('/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.listen(Number(PORT), () => {
  console.log(`Stripe test server running on port ${PORT}`)
})
