import { Link } from '@tanstack/react-router'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

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
          {/* Brand Section */}
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
                Homemade from Haley's Heart
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
                <span className="text-white text-xl">📷</span>
              </a>
              <a
                href="https://www.facebook.com/haley.johnston.1401"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--color-primary)' }}
                aria-label="Facebook"
              >
                <span className="text-white text-xl">📘</span>
              </a>
              <a
                href="https://www.tiktok.com/@14_haleyj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--color-primary)' }}
                aria-label="TikTok"
              >
                <span className="text-white text-xl">🎵</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Contact Info */}
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

        {/* Copyright */}
        <div
          className="mt-8 pt-8 border-t text-center"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
            © {new Date().getFullYear()} Homemade from Haley's Heart LLC. All
            rights reserved.
            <span className="mx-2">♡</span>
            Baked with love in Arizona
          </p>
        </div>
      </div>
    </footer>
  )
}
