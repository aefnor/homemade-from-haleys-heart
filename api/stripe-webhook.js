import { createStripeWebhookHandler } from '../server/checkout.mjs'
import { applyCommonMiddleware, getStripe, readRawBody } from './_shared.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  await applyCommonMiddleware(req, res)

  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  req.body = await readRawBody(req)

  return createStripeWebhookHandler({
    stripe: getStripe(),
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  })(req, res)
}
