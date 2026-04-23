import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { products } from './products'

const publicDir = path.resolve(process.cwd(), 'public')

describe('products catalog', () => {
  it('has a stable set of unique product ids', () => {
    const ids = products.map((product) => product.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique product names', () => {
    const names = products.map((product) => product.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('only contains positive prices and non-empty descriptions', () => {
    for (const product of products) {
      expect(product.price).toBeGreaterThan(0)
      expect(product.description.trim().length).toBeGreaterThan(0)
    }
  })

  it('points every product image at a real file in public', () => {
    for (const product of products) {
      expect(product.image.startsWith('/images/')).toBe(true)
      const imagePath = path.join(publicDir, product.image.replace(/^\//, ''))
      expect(
        existsSync(imagePath),
        `Missing image for "${product.name}": ${imagePath}`,
      ).toBe(true)
    }
  })
})
