import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircleHeart,
} from 'lucide-react'

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

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const overviewImages = [
  '/images/11-10-25-images/overview/splash.jpg',
  '/images/11-10-25-images/overview/splash2.jpg',
  '/images/11-10-25-images/overview/splash3.jpg',
  '/images/11-10-25-images/overview/splash4.jpg',
]

function ContactPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        currentIndex === overviewImages.length - 1 ? 0 : currentIndex + 1
      )
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <section className="px-4 py-6 md:px-6 md:py-8 xl:py-6">
        <div className="mx-auto grid max-w-[1500px] gap-6 xl:h-[calc(100vh-7.625rem)] xl:grid-cols-[1.18fr_0.82fr] xl:items-stretch">
          <div
            className="relative overflow-hidden rounded-[2rem] p-6 shadow-xl md:p-8 xl:h-full xl:p-7"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(254,248,243,0.98) 100%)',
            }}
          >
            <div
              className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(233, 196, 106, 0.25)' }}
            />
            <div
              className="absolute bottom-0 left-0 h-40 w-40 rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(231, 111, 81, 0.14)' }}
            />

            <div className="relative z-10 xl:flex xl:h-full xl:flex-col">
              <div className="xl:grid xl:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] xl:gap-6">
                <div>
                  <div className="mb-4 inline-flex items-center gap-3 rounded-full border px-4 py-2">
                    <Heart
                      size={18}
                      fill="var(--color-heart)"
                      color="var(--color-heart)"
                    />
                    <span
                      className="text-sm font-semibold uppercase tracking-[0.22em]"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      Contact
                    </span>
                  </div>

                  <h1
                    className="max-w-2xl text-4xl font-semibold leading-tight md:text-[3.15rem]"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Let&apos;s plan something beautiful from Haley&apos;s Heart.
                  </h1>

                  <p
                    className="mt-4 max-w-2xl text-lg leading-7"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Reach out for custom sourdough orders, class questions,
                    market details, or anything else you&apos;d love to dream
                    up. The quickest way to connect is by email or social.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="mailto:hello@homemadefromhaleysheart.com"
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-95"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    >
                      <Mail size={18} />
                      Email Haley
                    </a>
                    <a
                      href="https://www.instagram.com/homemade_from_haleys_heart/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-base font-semibold transition-all hover:scale-[1.02]"
                      style={{
                        borderColor: 'rgba(231, 111, 81, 0.2)',
                        color: 'var(--color-secondary)',
                        backgroundColor: 'rgba(255, 255, 255, 0.82)',
                      }}
                    >
                      <Instagram size={18} />
                      Message on Instagram
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:mt-0 xl:grid-cols-1">
                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <Mail
                      size={20}
                      className="mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Email
                    </h2>
                    <a
                      href="mailto:hello@homemadefromhaleysheart.com"
                      className="mt-1 block text-sm leading-6 transition-opacity hover:opacity-80"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      hello@homemadefromhaleysheart.com
                    </a>
                  </div>

                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <MessageCircleHeart
                      size={20}
                      className="mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Social
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Instagram, Facebook, and TikTok are all active for quick
                      questions and fresh-bake updates.
                    </p>
                  </div>

                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <MapPin
                      size={20}
                      className="mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Local
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Phoenix Valley, Arizona. Ask about pickup, classes, and
                      market appearances.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:mt-auto">
                <div
                  className="rounded-[1.75rem] border p-5 xl:flex xl:flex-col xl:justify-between xl:p-6 lg:col-span-2"
                  style={{
                    borderColor: 'rgba(231, 111, 81, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Heart
                      size={20}
                      fill="var(--color-heart)"
                      color="var(--color-heart)"
                    />
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Best ways to reach out
                    </h3>
                  </div>
                  <p
                    className="mt-3 text-sm leading-6"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    For detailed requests, email is the clearest option. For
                    quick questions, market updates, and photos of fresh bakes,
                    social media works well.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="https://www.instagram.com/homemade_from_haleys_heart/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: 'rgba(244, 162, 97, 0.16)',
                        color: 'var(--color-secondary)',
                      }}
                    >
                      <Instagram size={16} />
                      Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/haley.johnston.1401"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: 'rgba(244, 162, 97, 0.16)',
                        color: 'var(--color-secondary)',
                      }}
                    >
                      <FacebookIcon className="h-4 w-4" />
                      Facebook
                    </a>
                    <a
                      href="https://www.tiktok.com/@14_haleyj?is_from_webapp=1&sender_device=pc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: 'rgba(244, 162, 97, 0.16)',
                        color: 'var(--color-secondary)',
                      }}
                    >
                      <TikTokIcon className="h-4 w-4" />
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="flex">
            <div
              className="relative min-h-[22rem] h-full w-full flex-1 overflow-hidden rounded-[2rem] shadow-xl md:min-h-[28rem] xl:h-full"
              style={{ backgroundColor: '#f7eee5' }}
            >
              {overviewImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt="Homemade from Haley's Heart featured bakes"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                  style={{ opacity: activeImageIndex === index ? 1 : 0 }}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,42,42,0.58)] via-[rgba(42,42,42,0.12)] to-[rgba(42,42,42,0.02)]" />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="max-w-md rounded-[1.5rem] bg-[rgba(255,255,255,0.18)] p-4 backdrop-blur-md">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/85">
                    From the kitchen
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                    Fresh bakes, warm details, and a little movement from the
                    latest image set.
                  </p>
                  <div className="mt-4 flex gap-2">
                    {overviewImages.map((image, index) => (
                      <button
                        key={`${image}-dot`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className="h-2.5 rounded-full transition-all"
                        style={{
                          width: activeImageIndex === index ? '2rem' : '0.65rem',
                          backgroundColor:
                            activeImageIndex === index
                              ? 'rgba(255,255,255,0.95)'
                              : 'rgba(255,255,255,0.45)',
                        }}
                        aria-label={`Show overview image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
