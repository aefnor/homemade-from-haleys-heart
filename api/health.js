import { applyCommonMiddleware, getStripeMode } from './_shared.js'

export default async function handler(req, res) {
  await applyCommonMiddleware(req, res)

  if (req.method !== 'GET') {
    res.setHeader('allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  return res.json({
    status: 'ok',
    stripeMode: getStripeMode(),
  })
}
