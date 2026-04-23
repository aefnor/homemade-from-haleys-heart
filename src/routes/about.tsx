import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Heart, Sparkles, Wheat } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const overviewImages = [
  '/images/11-10-25-images/overview/splash.jpg',
  '/images/11-10-25-images/overview/splash2.jpg',
  '/images/11-10-25-images/overview/splash3.jpg',
  '/images/11-10-25-images/overview/splash4.jpg',
]

function AboutPage() {
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
                      About Haley
                    </span>
                  </div>

                  <h1
                    className="max-w-2xl text-4xl font-semibold leading-tight md:text-[3.15rem]"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    A sample story for the baker behind the loaves.
                  </h1>

                  <p
                    className="mt-4 max-w-2xl text-lg leading-7"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Placeholder copy for now, written to feel warm,
                    baking-focused, and easy to replace with Haley&apos;s real
                    story later.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:mt-0 xl:grid-cols-1">
                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <Sparkles
                      size={20}
                      className="mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Baking style
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Rustic, thoughtful, and made for sharing.
                    </p>
                  </div>

                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <Heart
                      size={20}
                      className="mb-2"
                      fill="var(--color-heart)"
                      color="var(--color-heart)"
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Signature feel
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Warm, seasonal bakes that still feel approachable.
                    </p>
                  </div>

                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <Wheat
                      size={20}
                      className="mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      Future details
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Real timeline and signature bakes can go here later.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:mt-auto">
                <div
                  className="rounded-[1.75rem] border p-5 xl:flex xl:flex-col xl:justify-between xl:p-6"
                  style={{
                    borderColor: 'rgba(231, 111, 81, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  }}
                >
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Sample about copy
                  </h3>
                  <p
                    className="mt-3 text-sm leading-6"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Hi, I&apos;m Haley, the baker behind Homemade from
                    Haley&apos;s Heart. This can later become her real story
                    about how homemade bread, slow baking, and sharing food
                    turned into a business.
                  </p>
                </div>

                <div
                  className="rounded-[1.75rem] border p-5 xl:flex xl:flex-col xl:justify-between xl:p-6"
                  style={{
                    borderColor: 'rgba(231, 111, 81, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  }}
                >
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    Future real details
                  </h3>
                  <p
                    className="mt-3 text-sm leading-6"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    Use this space later for her timeline, signature bakes,
                    market history, and what makes her process different.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Ask About Custom Baking
                  </Link>
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
                    The baker behind it
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                    Placeholder imagery now, real story and details later.
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
