import { createFileRoute, Link } from '@tanstack/react-router'
import { Heart, ShoppingCart, Calendar, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 px-4 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, var(--color-bg-light) 0%, var(--color-accent) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Heart
                size={64}
                fill="var(--color-heart)"
                color="var(--color-heart)"
                className="animate-pulse"
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Homemade from Haley's Heart
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Artisanal sourdough baked goods crafted with love, passion, and
              our beautiful gut-healthy sourdough starter ♡
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <ShoppingCart className="inline mr-2" size={20} />
                Shop Now
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 rounded-full font-semibold bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
                style={{ color: 'var(--color-secondary)' }}
              >
                <Calendar className="inline mr-2" size={20} />
                Book a Class
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">
          🥖
        </div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce delay-100">
          🍞
        </div>
        <div className="absolute top-1/2 right-20 text-4xl opacity-20 animate-pulse">
          🥐
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-16 md:py-24 px-4"
        style={{ backgroundColor: 'var(--color-bg-white)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Our Services
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-light)' }}
            >
              From custom orders to hands-on classes, we're here to share the
              joy of sourdough with you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Custom Ordering */}
            <div
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--color-bg-light)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="text-3xl">🛒</span>
              </div>
              <h3
                className="text-2xl font-bold mb-3 text-center"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Custom Ordering
              </h3>
              <p
                className="text-lg font-semibold mb-4 text-center"
                style={{ color: 'var(--color-secondary)' }}
              >
                Starting at $10
              </p>
              <p
                className="text-center mb-6"
                style={{ color: 'var(--color-text-light)' }}
              >
                Snag a spot on our weekly ordering list for whatever delicious
                treats your heart desires. Every item made with our beautiful
                sourdough starter.
              </p>
              <div className="text-center">
                <Link
                  to="/services"
                  className="inline-block px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  Order Now
                </Link>
              </div>
            </div>

            {/* Sourdough Classes */}
            <div
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--color-bg-light)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="text-3xl">👩‍🍳</span>
              </div>
              <h3
                className="text-2xl font-bold mb-3 text-center"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Sourdough Classes
              </h3>
              <p
                className="text-lg font-semibold mb-4 text-center"
                style={{ color: 'var(--color-secondary)' }}
              >
                Starting at $50
              </p>
              <p
                className="text-center mb-6"
                style={{ color: 'var(--color-text-light)' }}
              >
                In-home "sip and sourdough" courses or aesthetic studio classes.
                Learn this precious craft in its simplest, most enjoyable form!
              </p>
              <div className="text-center">
                <Link
                  to="/services"
                  className="inline-block px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  Book a Class
                </Link>
              </div>
            </div>

            {/* Farmer's Markets */}
            <div
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--color-bg-light)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="text-3xl">🌾</span>
              </div>
              <h3
                className="text-2xl font-bold mb-3 text-center"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Farmer's Markets
              </h3>
              <p
                className="text-lg font-semibold mb-4 text-center"
                style={{ color: 'var(--color-secondary)' }}
              >
                FREE to Visit
              </p>
              <p
                className="text-center mb-6"
                style={{ color: 'var(--color-text-light)' }}
              >
                Come visit us at incredible local markets in the valley! Follow
                us on social media for the most up-to-date locations.
              </p>
              <div className="text-center">
                <a
                  href="https://www.instagram.com/homemade_from_haleys_heart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  Find Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="py-16 md:py-24 px-4"
        style={{ backgroundColor: 'var(--color-bg-light)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: 'var(--color-text-dark)' }}
              >
                The Heart Behind the Homemade
              </h2>
              <p
                className="text-lg mb-4 leading-relaxed"
                style={{ color: 'var(--color-text-light)' }}
              >
                Hi there! I'm{' '}
                <span
                  className="font-semibold"
                  style={{ color: 'var(--color-text-dark)' }}
                >
                  Haley Johnston
                </span>
                , the sole owner of Homemade from Haley's Heart LLC. This
                beautiful business sparked in April 2023 when I donated about a
                dozen loaves to my local Relay for Life event.
              </p>
              <p
                className="text-lg mb-6 leading-relaxed"
                style={{ color: 'var(--color-text-light)' }}
              >
                With a background in Biomedical Sciences from ASU, years in
                healthcare, and a lifelong passion for baking, I've combined my
                love for chemistry, food service, and customer care into this
                dream business. Every loaf, every pastry, every treat is made
                with heart and soul!
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <Users size={20} />
                Learn More About Haley
              </Link>
            </div>
            <div className="relative">
              <div
                className="rounded-2xl p-8 shadow-xl"
                style={{ backgroundColor: 'var(--color-bg-white)' }}
              >
                <div className="text-center space-y-6">
                  <div className="text-8xl mb-4">🥖</div>
                  <p
                    className="text-xl font-semibold italic"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    "Baked with love, served with heart"
                  </p>
                  <div className="flex justify-center gap-4 text-4xl">
                    <span>🍞</span>
                    <Heart
                      size={40}
                      fill="var(--color-heart)"
                      color="var(--color-heart)"
                    />
                    <span>🥐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Experience the Magic?
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Join our community and taste the difference that love and quality
            make
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full font-semibold bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
              style={{ color: 'var(--color-secondary)' }}
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full font-semibold border-2 border-white text-white shadow-lg hover:bg-white hover:shadow-xl transition-all hover:scale-105 text-lg"
              style={{
                borderColor: 'white',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white'
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
