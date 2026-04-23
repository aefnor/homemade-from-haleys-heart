import { Link } from '@tanstack/react-router'
import { Heart, Instagram, Mail, MapPin, Phone } from 'lucide-react'

function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.3-1.6 1.7-1.6h1.3V5.7c-.2 0-.9-.1-1.9-.1-2 0-3.4 1.2-3.4 3.6v2.1H9v2.7h2.3v7h2.2Z" />
    </svg>
  )
}

function TikTokIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M14.7 3c.2 1.7 1.2 3.2 2.8 4.1 1 .6 2.1.9 3.3.9v2.8a8.9 8.9 0 0 1-3.8-.9v5.6c0 3.4-2.8 6.2-6.2 6.2s-6.2-2.8-6.2-6.2 2.8-6.2 6.2-6.2c.3 0 .6 0 .9.1v2.9a3.4 3.4 0 0 0-.9-.1 3.4 3.4 0 1 0 3.4 3.4V3h2.5Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{
        backgroundColor: 'var(--color-bg-white)',
        borderColor: 'var(--color-accent)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart
                size={24}
                fill="var(--color-heart)"
                color="var(--color-heart)"
              />
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Homemade from Haley&apos;s Heart
              </h3>
            </div>
            <p
              className="text-sm mb-4 max-w-md"
              style={{ color: 'var(--color-text-light)' }}
            >
              Artisanal sourdough baked goods made with love and the finest
              ingredients. Every item crafted with our beautiful, gut-healthy
              sourdough starter.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/homemade_from_haleys_heart/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--color-primary)' }}
                aria-label="Instagram"
              >
                <Instagram size={20} color="white" />
              </a>
              <a
                href="https://www.facebook.com/haley.johnston.1401"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--color-primary)' }}
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@14_haleyj?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--color-primary)' }}
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail
                  size={18}
                  className="mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-secondary)' }}
                />
                <a
                  href="mailto:hello@homemadefromhaleysheart.com"
                  className="text-sm hover:opacity-70 transition-opacity break-all"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  hello@homemadefromhaleysheart.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone
                  size={18}
                  className="mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-secondary)' }}
                />
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Contact via social media
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  size={18}
                  className="mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-secondary)' }}
                />
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  Phoenix Valley, Arizona
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-8 border-t text-center"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
            &copy; {new Date().getFullYear()} Homemade from Haley&apos;s Heart
            LLC. All rights reserved.
            <span className="mx-2">&#9825;</span>
            Baked with love in Arizona
          </p>
        </div>
      </div>
    </footer>
  )
}
