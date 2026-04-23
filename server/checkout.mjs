import { saveOrder } from './orderStore.mjs'
import { productsById } from './products.mjs'

function isAllowedUrl(url, allowedOrigins) {
  if (!url) {
    return false
  }

  try {
    const parsedUrl = new URL(url)
    return allowedOrigins.includes(parsedUrl.origin)
  } catch {
    return false
  }
}

function buildReturnUrl(candidateUrl, fallbackUrl, allowedOrigins) {
  if (isAllowedUrl(candidateUrl, allowedOrigins)) {
    return candidateUrl
  }

  return fallbackUrl
}

export function sanitizeCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const mergedItems = new Map()

  for (const item of items) {
    const id = Number(item?.id ?? 0)
    const quantity = Number(item?.quantity ?? 0)

    if (!Number.isFinite(id) || id <= 0) {
      continue
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      continue
    }

    mergedItems.set(id, (mergedItems.get(id) ?? 0) + quantity)
  }

  return [...mergedItems.entries()].map(([id, quantity]) => ({
    id,
    quantity,
  }))
}

export function buildCartSummary(items) {
  return items
    .map((item) => `${item.quantity}x ${item.name}`.slice(0, 45))
    .join(' | ')
    .slice(0, 499)
}

export function resolveCatalogItems(items, catalog = productsById) {
  const sanitizedItems = sanitizeCartItems(items)

  if (sanitizedItems.length === 0) {
    return {
      error: {
        status: 400,
        body: {
          error: 'Cart items must include a valid product id and positive quantity.',
        },
      },
    }
  }

  const resolvedItems = []

  for (const item of sanitizedItems) {
    const product = catalog.get(item.id)

    if (!product) {
      return {
        error: {
          status: 400,
          body: {
            error: `Product ${item.id} is not recognized.`,
          },
        },
      }
    }

    if (!product.stripePriceId) {
      return {
        error: {
          status: 400,
          body: {
            error: `${product.name} is not available for checkout yet.`,
          },
        },
      }
    }

    resolvedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      stripePriceId: product.stripePriceId,
    })
  }

  return { resolvedItems }
}

export function buildCheckoutSessionParams({
  items,
  allowedOrigins,
  successUrl,
  cancelUrl,
  stripeSuccessUrl,
  stripeCancelUrl,
  catalog,
}) {
  const result = resolveCatalogItems(items, catalog)

  if (result.error) {
    return result
  }

  const { resolvedItems } = result
  const baseOrigin = allowedOrigins[0] ?? 'http://localhost:3000'
  const metadataCartSummary = buildCartSummary(resolvedItems)

  return {
    resolvedItems,
    sessionParams: {
      mode: 'payment',
      line_items: resolvedItems.map((item) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      success_url: buildReturnUrl(
        successUrl,
        stripeSuccessUrl ??
          `${baseOrigin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        allowedOrigins,
      ),
      cancel_url: buildReturnUrl(
        cancelUrl,
        stripeCancelUrl ?? `${baseOrigin}/checkout-cancel`,
        allowedOrigins,
      ),
      metadata: metadataCartSummary
        ? {
            cart: metadataCartSummary,
          }
        : undefined,
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ['US'] },
    },
  }
}

export function createCheckoutSessionHandler({
  stripe,
  allowedOrigins,
  stripeSuccessUrl,
  stripeCancelUrl,
  catalog,
}) {
  return async function createCheckoutSession(req, res) {
    const { items, successUrl, cancelUrl } = req.body ?? {}

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' })
    }

    const result = buildCheckoutSessionParams({
      items,
      allowedOrigins,
      successUrl,
      cancelUrl,
      stripeSuccessUrl,
      stripeCancelUrl,
      catalog,
    })

    if (result.error) {
      return res.status(result.error.status).json(result.error.body)
    }

    try {
      const session = await stripe.checkout.sessions.create(result.sessionParams)
      return res.json({ sessionId: session.id, url: session.url })
    } catch (error) {
      console.error('Stripe checkout session error:', {
        requestId: req.requestId,
        error,
      })
      return res.status(500).json({
        error: 'Unable to start checkout. Please try again shortly.',
      })
    }
  }
}

export function createCheckoutStatusHandler({ stripe }) {
  return async function getCheckoutStatus(req, res) {
    const sessionId = String(req.query?.session_id ?? '').trim()

    if (!sessionId) {
      return res.status(400).json({ error: 'A session_id is required.' })
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status === 'paid') {
        saveOrder(session)
      }

      return res.json({
        sessionId: session.id,
        status: session.status,
        paymentStatus: session.payment_status,
        paid: session.payment_status === 'paid',
        amountTotal: session.amount_total ?? null,
        currency: session.currency ?? null,
        customerEmail: session.customer_details?.email ?? null,
      })
    } catch (error) {
      console.error('Stripe checkout status error:', {
        requestId: req.requestId,
        error,
      })
      return res.status(404).json({
        error: 'Unable to verify this checkout session.',
      })
    }
  }
}

export function createStripeWebhookHandler({ stripe, webhookSecret }) {
  return async function handleStripeWebhook(req, res) {
    if (!webhookSecret) {
      return res.status(503).json({ error: 'Webhook secret is not configured.' })
    }

    const signature = req.headers['stripe-signature']

    if (typeof signature !== 'string') {
      return res.status(400).json({ error: 'Missing Stripe signature header.' })
    }

    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
    } catch (error) {
      console.error('Stripe webhook signature error:', {
        requestId: req.requestId,
        error,
      })
      return res.status(400).json({ error: 'Invalid Stripe signature.' })
    }

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      saveOrder(event.data.object)
    }

    return res.json({ received: true })
  }
}
