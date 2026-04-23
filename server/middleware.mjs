import { randomUUID } from 'node:crypto'

const buckets = new Map()

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim()
  }

  return req.ip ?? req.socket?.remoteAddress ?? 'unknown'
}

export function requestLogger(req, res, next) {
  const startedAt = Date.now()
  const requestId = randomUUID()

  req.requestId = requestId
  res.setHeader('x-request-id', requestId)

  res.on('finish', () => {
    const duration = Date.now() - startedAt
    console.log(
      `${requestId} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
    )
  })

  next()
}

export function createRateLimit({
  windowMs = 60_000,
  max = 30,
  message = 'Too many requests. Please try again shortly.',
} = {}) {
  return function rateLimit(req, res, next) {
    const now = Date.now()
    const key = `${req.method}:${req.path}:${getClientIp(req)}`
    const bucket = buckets.get(key)

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, {
        count: 1,
        resetAt: now + windowMs,
      })
      return next()
    }

    bucket.count += 1

    if (bucket.count > max) {
      res.setHeader('retry-after', Math.ceil((bucket.resetAt - now) / 1000))
      return res.status(429).json({ error: message })
    }

    return next()
  }
}
