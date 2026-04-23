import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import Stripe from 'stripe'
import {
  createCheckoutSessionHandler,
  createCheckoutStatusHandler,
  createStripeWebhookHandler,
} from './checkout.mjs'
import { createRateLimit, requestLogger } from './middleware.mjs'
import { productsById } from './products.mjs'

dotenv.config()

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
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
app.use(requestLogger)

app.post(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  createStripeWebhookHandler({
    stripe,
    webhookSecret: STRIPE_WEBHOOK_SECRET,
  }),
)

app.use(express.json())

app.post(
  '/api/create-checkout-session',
  createRateLimit({
    windowMs: 60_000,
    max: 12,
    message: 'Too many checkout attempts. Please try again shortly.',
  }),
  createCheckoutSessionHandler({
    stripe,
    allowedOrigins,
    stripeSuccessUrl: STRIPE_SUCCESS_URL,
    stripeCancelUrl: STRIPE_CANCEL_URL,
    catalog: productsById,
  }),
)

app.get(
  '/api/checkout-session-status',
  createRateLimit({
    windowMs: 60_000,
    max: 60,
  }),
  createCheckoutStatusHandler({
    stripe,
  }),
)

app.get('/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.listen(Number(PORT), () => {
  console.log(`Stripe test server running on port ${PORT}`)
})
