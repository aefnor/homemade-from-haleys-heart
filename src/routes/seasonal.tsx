import { Link, createFileRoute } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getSeasonalContent } from '../data/seasonal'

export const Route = createFileRoute('/seasonal')({
  component: SeasonalPage,
})

function SeasonalPage() {
  const { addToCart } = useCart()
  const seasonalContent = getSeasonalContent()
  const isSelfCta = seasonalContent?.ctaHref === '/seasonal'

  if (
    !seasonalContent ||
    !seasonalContent.products ||
    seasonalContent.products.length === 0
  ) {
    return (
      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'var(--color-bg-white)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-dark)' }}
          >
            Seasonal Menu Coming Soon
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: 'var(--color-text-light)' }}
          >
            We are crafting our next round of limited-time bakes. In the
            meantime, explore our year-round favorites.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'white',
            }}
          >
            Browse Everyday Menu
          </Link>
        </div>
      </section>
    )
  }

  return (
    <div>
      <section
        className="py-16 px-4"
        style={{ background: seasonalContent.background }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="uppercase text-sm font-semibold tracking-wide mb-3"
            style={{ color: seasonalContent.accent }}
          >
            {seasonalContent.badge}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text-dark)' }}
          >
            {seasonalContent.title}
          </h1>
          <p
            className="text-lg md:text-xl mb-6 max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-dark)' }}
          >
            {seasonalContent.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full font-semibold border transition-transform hover:scale-105"
              style={{
                borderColor: seasonalContent.accent,
                color: seasonalContent.accent,
              }}
            >
              View Full Menu
            </Link>
            {seasonalContent.ctaHref &&
              seasonalContent.ctaLabel &&
              !isSelfCta && (
                <Link
                  to={seasonalContent.ctaHref}
                  className="px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                  style={{
                    backgroundColor: seasonalContent.accent,
                    color: 'white',
                  }}
                >
                  {seasonalContent.ctaLabel}
                </Link>
              )}
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--color-bg-white)' }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ color: 'var(--color-text-dark)' }}
          >
            Limited-Time Seasonal Favorites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasonalContent.products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] bg-white flex flex-col h-full"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-lg font-bold mb-3"
                    style={{ color: seasonalContent.accent }}
                  >
                    ${product.price}
                  </p>
                  <p
                    className="mb-6 text-sm flex-1"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {product.description}
                  </p>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image ?? '',
                      })
                    }
                    className="mt-auto w-full py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: seasonalContent.accent }}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--color-bg-light)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: 'var(--color-text-dark)' }}
          >
            Hosting a Bigger Gathering?
          </h2>
          <p
            className="text-lg mb-6"
            style={{ color: 'var(--color-text-light)' }}
          >
            Drop us a note with your event details and we will help you plan the
            perfect seasonal spread.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'white',
            }}
          >
            Request Custom Order
          </Link>
        </div>
      </section>
    </div>
  )
}
