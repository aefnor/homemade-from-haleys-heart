import { describe, expect, it } from 'vitest'
import { products as appProducts } from '../src/data/products'
import { products as serverProducts } from './products.mjs'

describe('server catalog parity', () => {
  it('matches the app product ids, names, and prices', () => {
    expect(
      serverProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    ).toEqual(
      appProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    )
  })
})
