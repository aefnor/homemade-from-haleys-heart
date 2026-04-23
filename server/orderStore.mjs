const ordersBySessionId = new Map()

export function saveOrder(session) {
  ordersBySessionId.set(session.id, {
    id: session.id,
    status: session.status ?? null,
    paymentStatus: session.payment_status ?? null,
    customerEmail: session.customer_details?.email ?? null,
    customerName: session.customer_details?.name ?? null,
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
    metadata: session.metadata ?? {},
    updatedAt: Date.now(),
  })
}

export function getOrder(sessionId) {
  return ordersBySessionId.get(sessionId) ?? null
}
