import { createCheckoutSessionHandler } from '../server/checkout.mjs'
import {
  applyCommonMiddleware,
  checkoutRateLimit,
  getAllowedOrigins,
  getCatalog,
  getStripe,
  runMiddleware,
} from './_shared.js'

export default async function handler(req, res) {
  await applyCommonMiddleware(req, res)
  await runMiddleware(req, res, checkoutRateLimit)

  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  return createCheckoutSessionHandler({
    stripe: getStripe(),
    allowedOrigins: getAllowedOrigins(),
    stripeSuccessUrl: process.env.STRIPE_SUCCESS_URL,
    stripeCancelUrl: process.env.STRIPE_CANCEL_URL,
    catalog: getCatalog(),
  })(req, res)
}
