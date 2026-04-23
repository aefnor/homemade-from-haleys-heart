import Stripe from 'stripe'
import { createRateLimit, requestLogger } from '../server/middleware.mjs'
import {
  getProductsByIdForStripeMode,
  resolveStripeMode,
} from '../server/products.mjs'

export function getStripe() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.')
  }

  return new Stripe(stripeSecretKey)
}

export function getStripeMode() {
  return resolveStripeMode({
    stripeMode: process.env.STRIPE_MODE,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  })
}

export function getCatalog() {
  return getProductsByIdForStripeMode(getStripeMode(), process.env)
}

export function getAllowedOrigins() {
  return (process.env.CLIENT_ORIGIN ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

export function runMiddleware(req, res, middleware) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        reject(result)
        return
      }

      resolve(result)
    })
  })
}

export async function applyCommonMiddleware(req, res) {
  await runMiddleware(req, res, requestLogger)
}

export const checkoutRateLimit = createRateLimit({
  windowMs: 60_000,
  max: 12,
  message: 'Too many checkout attempts. Please try again shortly.',
})

export const statusRateLimit = createRateLimit({
  windowMs: 60_000,
  max: 60,
})

export async function readRawBody(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks)
}
