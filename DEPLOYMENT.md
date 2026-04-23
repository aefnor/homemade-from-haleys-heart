# Deployment Checklist

This launch plan uses Stripe Dashboard as the operational order system. The app
creates Stripe Checkout Sessions and verifies payment status, but it does not
store durable orders in an app database.

## Recommended Hosting Shape

Use one public domain for both the frontend and API if possible:

- Frontend serves the Vite build.
- API serves `/api/*`.
- Stripe redirects to the same public origin.

If the frontend and API are on different hosts, set `VITE_API_BASE_URL` to the
API origin during the frontend build.

## Required Environment Variables

Frontend:

- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_API_BASE_URL` only if the API is not same-origin

Backend:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CLIENT_ORIGIN`
- `STRIPE_SUCCESS_URL`
- `STRIPE_CANCEL_URL`
- `PORT`

## Stripe Setup

- Create live-mode products/prices matching the checkout-enabled catalog.
- Update server Stripe price ids when moving from test mode to live mode.
- Keep products without Stripe prices, such as `Custom Loaf`, contact-only.
- Enable Stripe customer receipts.
- Make sure Haley receives Stripe payment notifications.
- Add a webhook endpoint for `checkout.session.completed`:
  `/api/stripe-webhook`

## Pre-Launch Commands

```bash
yarn test
yarn build
```

For Stripe test-mode verification:

```bash
RUN_STRIPE_INTEGRATION_TESTS=true STRIPE_SECRET_KEY=sk_test_... yarn test:stripe
```

## Smoke Test

- Open the deployed shop.
- Add one checkout-enabled product to the cart.
- Complete a Stripe Checkout payment.
- Confirm the success page verifies the session.
- Confirm Stripe Dashboard shows correct line items and quantities.
- Confirm Stripe Dashboard has customer contact details.
- Confirm cancel flow preserves the cart.
- Confirm `Custom Loaf` routes to contact instead of checkout.

## Known Launch Tradeoffs

- Stripe Dashboard is the source of truth for orders.
- The app has no durable order database or admin dashboard.
- The webhook currently gives a future integration point, not a full order
  management system.
