import { Link, createFileRoute } from '@tanstack/react-router'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const Route = createFileRoute('/shop')({
  component: ShopPage,
})

function ShopPage() {
  const { addToCart } = useCart()

  const products = [
    {
      id: 1,
      name: 'Traditional Sourdough Bread',
      price: 12,
      description:
        'Our signature sourdough bread with a perfect crust and fluffy interior',
      image: '/images/TRADITIONAL SOURDOUGH BREAD.webp',
    },
    {
      id: 2,
      name: 'Sourdough Pizza Dough',
      price: 8,
      description: 'Pre-made pizza dough ready to top and bake at home',
      image: '/images/Sourdough Pizza Dough.webp',
    },
    {
      id: 3,
      name: 'Cinnamon Rolls',
      price: 18,
      description: 'Fluffy sourdough cinnamon rolls with cream cheese frosting',
      image: '/images/Cinnamon Rolls.webp',
    },
    {
      id: 4,
      name: 'White Cheddar Everything Bagel',
      price: 15,
      description:
        'Chewy bagels topped with everything seasoning and white cheddar',
      image: '/images/White Cheddar Everything Bagel.webp',
    },
    {
      id: 5,
      name: 'Sourdough Sandwich Bread',
      price: 14,
      description: 'Perfect for sandwiches with a soft, fluffy texture',
      image: '/images/Sourdough Sandwhich Bread.webp',
    },
    {
      id: 6,
      name: 'Sourdough Starter',
      price: 20,
      description: 'Your own portion of our beautiful, healthy starter',
      image: '/images/Sourdough Starter.webp',
    },
    {
      id: 7,
      name: 'Blueberry Lemon Sourdough',
      price: 16,
      description: 'Sweet sourdough with fresh blueberries and lemon zest',
      image: '/images/BlueBerry Lemon Sourdough Bread.webp',
    },
    {
      id: 8,
      name: 'Double Chocolate Sourdough',
      price: 16,
      description: 'Rich chocolate sourdough with chocolate chips',
      image: '/images/Double Chocolate Sourdough Bread.webp',
    },
    {
      id: 9,
      name: 'Jalapeño Cheddar Sourdough',
      price: 15,
      description: 'Spicy jalapeños and sharp cheddar in every bite',
      image: '/images/Jalepeno Cheddar Sourdough Bread.webp',
    },
    {
      id: 10,
      name: 'Rosemary Garlic Sourdough',
      price: 14,
      description: 'Aromatic herbs and roasted garlic throughout',
      image: '/images/Rosemary Garlic Sourdough Bread.webp',
    },
    {
      id: 11,
      name: 'Habanero Swiss Sourdough',
      price: 15,
      description: 'Fiery habanero peppers with melted Swiss cheese',
      image: '/images/Habanero Swiss Sourdough Loaf.webp',
    },
    {
      id: 12,
      name: 'Custom Loaf',
      price: 16,
      description:
        'Create your own custom sourdough with your choice of add-ins',
      image: '/images/Custom Loaf.webp',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
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

      {/* Products Grid */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--color-bg-white)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
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
                    className="mb-6"
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
                        image: product.image,
                      })
                    }
                    className="w-full py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add-Ons Section */}
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

          {/* Custom Order CTA */}
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
