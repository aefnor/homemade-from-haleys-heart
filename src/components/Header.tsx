import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Heart,
  Home,
  Instagram,
  Mail,
  Menu,
  ShoppingCart,
  User,
  X,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartSidebar from './CartSidebar'

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#fef8f3] transition-colors"
              aria-label="Open menu"
              style={{ color: 'var(--color-secondary)' }}
            >
              <Menu size={24} />
            </button>

            {/* Logo/Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-dark)' }}
            >
              <Heart
                size={28}
                fill="var(--color-heart)"
                color="var(--color-heart)"
                className="animate-pulse"
              />
              <span className="hidden sm:inline">
                Homemade from Haley&apos;s Heart
              </span>
              <span className="sm:hidden">Haley&apos;s Heart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-base font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-base font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Shop
              </Link>
              <Link
                to="/services"
                className="text-base font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-base font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-text-dark)' }}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-base font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-text-dark)' }}
              >
                Contact
              </Link>
            </nav>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-lg hover:bg-[#fef8f3] transition-colors relative"
              aria-label="Shopping cart"
              style={{ color: 'var(--color-secondary)' }}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6b9d] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <div className="flex items-center gap-2">
            <Heart
              size={24}
              fill="var(--color-heart)"
              color="var(--color-heart)"
            />
            <h2
              className="text-xl font-bold"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Menu
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-[#fef8f3] transition-colors"
            aria-label="Close menu"
            style={{ color: 'var(--color-secondary)' }}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-6 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#fef8f3] transition-colors mb-2 font-medium"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#fef8f3] transition-colors mb-2 font-medium"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <ShoppingCart size={20} />
            <span>Shop</span>
          </Link>

          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#fef8f3] transition-colors mb-2 font-medium"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <Heart size={20} />
            <span>Services</span>
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#fef8f3] transition-colors mb-2 font-medium"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <User size={20} />
            <span>About Haley</span>
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#fef8f3] transition-colors mb-2 font-medium"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <Mail size={20} />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Social Links in Sidebar */}
        <div
          className="p-6 border-t"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <p
            className="text-sm font-medium mb-3"
            style={{ color: 'var(--color-text-light)' }}
          >
            Follow Us
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/homemade_from_haleys_heart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full p-2 hover:scale-110 transition-transform"
              aria-label="Instagram"
              style={{
                color: 'var(--color-secondary)',
                backgroundColor: 'rgba(244, 162, 97, 0.15)',
              }}
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://www.facebook.com/haley.johnston.1401"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-3 hover:scale-110 transition-transform"
              aria-label="Facebook"
              style={{
                color: 'var(--color-secondary)',
                backgroundColor: 'rgba(244, 162, 97, 0.15)',
              }}
            >
              <FacebookIcon className="h-[22px] w-[22px]" />
            </a>
            <a
              href="https://www.tiktok.com/@14_haleyj?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-3 hover:scale-110 transition-transform"
              aria-label="TikTok"
              style={{
                color: 'var(--color-secondary)',
                backgroundColor: 'rgba(244, 162, 97, 0.15)',
              }}
            >
              <TikTokIcon className="h-[20px] w-[20px]" />
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
