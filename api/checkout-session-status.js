import { createCheckoutStatusHandler } from '../server/checkout.mjs'
import {
  applyCommonMiddleware,
  getStripe,
  runMiddleware,
  statusRateLimit,
} from './_shared.js'

export default async function handler(req, res) {
  await applyCommonMiddleware(req, res)
  await runMiddleware(req, res, statusRateLimit)

  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  return createCheckoutStatusHandler({
    stripe: getStripe(),
  })(req, res)
}
