export const products = [
  {
    id: 1,
    name: 'Traditional Sourdough Bread',
    price: 12,
    stripePriceIds: {
      test: 'price_1SS8Iw4a4A13fgGOgywZigH2',
      live: null,
    },
  },
  {
    id: 2,
    name: 'Sourdough Pizza Dough',
    price: 10,
    stripePriceIds: {
      test: 'price_1SS8RR4a4A13fgGOyhAmpGgn',
      live: null,
    },
  },
  {
    id: 3,
    name: 'Cinnamon Rolls',
    price: 12,
    stripePriceIds: {
      test: 'price_1SS8R94a4A13fgGOa5NbaAMk',
      live: null,
    },
  },
  {
    id: 4,
    name: 'White Cheddar Everything Bagel',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8ON4a4A13fgGOj3eSYQ01',
      live: null,
    },
  },
  {
    id: 5,
    name: 'Sourdough Sandwich Bread',
    price: 10,
    stripePriceIds: {
      test: 'price_1SS8Vc4a4A13fgGO3PeJXCaB',
      live: null,
    },
  },
  {
    id: 6,
    name: 'Sourdough Starter',
    price: 10,
    stripePriceIds: {
      test: 'price_1SS8Rn4a4A13fgGO5OImCYib',
      live: null,
    },
  },
  {
    id: 7,
    name: 'Blueberry Lemon Sourdough',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8Lv4a4A13fgGOxP54RF6U',
      live: null,
    },
  },
  {
    id: 8,
    name: 'Double Chocolate Sourdough',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8Li4a4A13fgGOchO1q6xR',
      live: null,
    },
  },
  {
    id: 9,
    name: 'Jalapeno Cheddar Sourdough',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8JZ4a4A13fgGOnUdXTWsz',
      live: null,
    },
  },
  {
    id: 10,
    name: 'Rosemary Garlic Sourdough',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8LD4a4A13fgGOzFl7D6sT',
      live: null,
    },
  },
  {
    id: 11,
    name: 'Habanero Swiss Sourdough',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8Jv4a4A13fgGOURq7FTp3',
      live: null,
    },
  },
  {
    id: 12,
    name: 'Custom Loaf',
    price: 16,
    stripePriceIds: {
      test: null,
      live: null,
    },
  },
  {
    id: 13,
    name: 'Sourdough Croutons',
    price: 5,
    stripePriceIds: {
      test: 'price_1SS8WI4a4A13fgGOAZ9C57GI',
      live: null,
    },
  },
  {
    id: 14,
    name: 'Sourdough Crispy Crackers',
    price: 5,
    stripePriceIds: {
      test: 'price_1SS8W04a4A13fgGOtAtxE3AE',
      live: null,
    },
  },
  {
    id: 15,
    name: 'Sourdough Muffins',
    price: 10,
    stripePriceIds: {
      test: 'price_1SS8U74a4A13fgGOUL7zErXN',
      live: null,
    },
  },
  {
    id: 16,
    name: 'White Chocolate Espresso',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8TC4a4A13fgGOmy0U3RO2',
      live: null,
    },
  },
  {
    id: 17,
    name: 'Chocolate Chip Cookies',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8T04a4A13fgGOgQEx0wOU',
      live: null,
    },
  },
  {
    id: 18,
    name: 'Banana Bread',
    price: 10,
    stripePriceIds: {
      test: 'price_1SS8SE4a4A13fgGO86WSSab5',
      live: null,
    },
  },
  {
    id: 19,
    name: 'Bread Bowls',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8QF4a4A13fgGOPh7RTt4i',
      live: null,
    },
  },
  {
    id: 20,
    name: 'Bagels (Plain)',
    price: 12,
    stripePriceIds: {
      test: 'price_1SS8PW4a4A13fgGOwfXOD8Kj',
      live: null,
    },
  },
  {
    id: 21,
    name: 'Bagels (Variety)',
    price: 12,
    stripePriceIds: {
      test: 'price_1SS8PK4a4A13fgGOvAWCXWCF',
      live: null,
    },
  },
  {
    id: 22,
    name: 'Pizza Loaf',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8Ny4a4A13fgGOwqEqzWB4',
      live: null,
    },
  },
  {
    id: 23,
    name: 'Cinnamon Sugar Sourdough',
    price: 15,
    stripePriceIds: {
      test: 'price_1SS8LV4a4A13fgGOoPGrh828',
      live: null,
    },
  },
]

export function resolveStripeMode({ stripeMode, stripeSecretKey } = {}) {
  if (stripeMode === 'live' || stripeMode === 'test') {
    return stripeMode
  }

  if (stripeSecretKey?.startsWith('sk_live_')) {
    return 'live'
  }

  return 'test'
}

function getEnvPriceId(productId, stripeMode, env) {
  return env[`STRIPE_${stripeMode.toUpperCase()}_PRICE_ID_${productId}`] ?? null
}

export function getProductsForStripeMode(stripeMode = 'test', env = process.env) {
  return products.map((product) => ({
    ...product,
    stripePriceId:
      getEnvPriceId(product.id, stripeMode, env) ??
      product.stripePriceIds[stripeMode] ??
      null,
  }))
}

export function getProductsByIdForStripeMode(
  stripeMode = 'test',
  env = process.env,
) {
  return new Map(
    getProductsForStripeMode(stripeMode, env).map((product) => [
      product.id,
      product,
    ]),
  )
}

export const productsById = getProductsByIdForStripeMode('test')
