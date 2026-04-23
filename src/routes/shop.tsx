import { Link, createFileRoute } from '@tanstack/react-router'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { getSeasonalContent } from '../data/seasonal'

export const Route = createFileRoute('/shop')({
  component: ShopPage,
})

function ShopPage() {
  const { addToCart } = useCart()
  const seasonalContent = getSeasonalContent()

  return (
    <div>
      {seasonalContent && (
        <section
          className="py-12 px-4"
          style={{ background: seasonalContent.background }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="uppercase text-sm font-semibold tracking-wider mb-3"
              style={{ color: seasonalContent.accent }}
            >
              {seasonalContent.badge}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-dark)' }}
            >
              {seasonalContent.title}
            </h2>
            <p
              className="text-lg md:text-xl mb-6 max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-dark)' }}
            >
              {seasonalContent.description}
            </p>
            {seasonalContent.ctaHref && seasonalContent.ctaLabel && (
              <Link
                to={seasonalContent.ctaHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: seasonalContent.accent,
                  color: 'white',
                }}
              >
                {seasonalContent.ctaLabel}
              </Link>
            )}
          </div>
        </section>
      )}
      {seasonalContent?.products && seasonalContent.products.length > 0 && (
        <section
          className="py-12 px-4"
          style={{ backgroundColor: 'var(--color-bg-white)' }}
        >
          <div className="max-w-6xl mx-auto">
            <h3
              className="text-2xl md:text-3xl font-bold text-center mb-8"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Seasonal Favorites
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {seasonalContent.products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] bg-white flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
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
                    <h4
                      className="text-xl font-semibold mb-2"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      {product.name}
                    </h4>
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
                    <Link
                      to="/seasonal"
                      className="w-full py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      style={{ backgroundColor: seasonalContent.accent }}
                    >
                      Explore Seasonal Menu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section
        className="py-16 px-4"
        style={{
          background:
            'linear-gradient(135deg, var(--color-bg-light) 0%, var(--color-accent) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text-dark)' }}
          >
            Shop Our Sourdough Creations
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-light)' }}
          >
            Handcrafted with love, baked fresh weekly
          </p>
        </div>
      </section>

      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--color-bg-white)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-white flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
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
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-2xl font-bold mb-3"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    ${product.price}
                  </p>
                  <p
                    className="mb-6 flex-1"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    {product.description}
                  </p>
                  {product.availableForCheckout === false ? (
                    <Link
                      to="/contact"
                      className="mt-auto w-full py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    >
                      Contact to Order
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      }
                      className="mt-auto w-full py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Add-Ons & Extras
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <img
                  src="/images/Apples Add on.webp"
                  alt="Apples Add-on"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 bg-white">
                  <p
                    className="font-semibold text-center"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Apples
                  </p>
                  <p
                    className="text-center text-sm"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    +$3
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <img
                  src="/images/Raisin Add On.webp"
                  alt="Raisins Add-on"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 bg-white">
                  <p
                    className="font-semibold text-center"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Raisins
                  </p>
                  <p
                    className="text-center text-sm"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    +$2
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <img
                  src="/images/Strawberry Add On.webp"
                  alt="Strawberries Add-on"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 bg-white">
                  <p
                    className="font-semibold text-center"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Strawberries
                  </p>
                  <p
                    className="text-center text-sm"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    +$4
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <img
                  src="/images/Espresso Add on.webp"
                  alt="Espresso Add-on"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 bg-white">
                  <p
                    className="font-semibold text-center"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Espresso
                  </p>
                  <p
                    className="text-center text-sm"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    +$3
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Heart
              size={48}
              fill="white"
              color="white"
              className="mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold mb-4 text-white">
              Don't See What You're Looking For?
            </h2>
            <p className="text-xl mb-6 text-white opacity-90">
              Custom orders available! Tell us what you're craving.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 rounded-full font-semibold bg-white hover:scale-105 transition-transform"
              style={{ color: 'var(--color-secondary)' }}
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
