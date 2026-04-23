import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Heart,
  MapPin,
  Sparkles,
  Wine,
} from 'lucide-react'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

const overviewImages = [
  '/images/11-10-25-images/overview/splash.jpg',
  '/images/11-10-25-images/overview/splash2.jpg',
  '/images/11-10-25-images/overview/splash3.jpg',
  '/images/11-10-25-images/overview/splash4.jpg',
]

function ServicesPage() {
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
                      Services
                    </span>
                  </div>

                  <h1
                    className="max-w-2xl text-4xl font-semibold leading-tight md:text-[3.15rem]"
                    style={{ color: 'var(--color-text-dark)' }}
                  >
                    In-Person Sourdough Classes
                  </h1>

                  <p
                    className="mt-4 text-2xl font-bold"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    $50 <span className="text-lg font-medium">(starting at)</span>
                  </p>

                  <p
                    className="mt-4 max-w-2xl text-lg leading-7"
                    style={{ color: 'var(--color-text-light)' }}
                  >
                    By popular demand, these classes are one of my favorite
                    ways to fill the weekends. Whether you choose an in-home sip
                    and sourdough course or an aesthetic girls class in a DTG
                    studio, each class breaks down sourdough in its simplest
                    form so it feels exciting, approachable, and enjoyable for
                    anyone wanting to learn such a precious craft.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:mt-0 xl:grid-cols-1">
                  <div
                    className="rounded-3xl p-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
                  >
                    <Wine
                      size={20}
                      className="mb-2"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-dark)' }}
                    >
                      In-home option
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Relaxed sip-and-sourdough classes hosted right in your own
                      space.
                    </p>
                  </div>

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
                      Studio option
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Aesthetic girls classes in a DTG studio setting with a
                      more styled experience.
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
                      Local booking
                    </h2>
                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Best fit for local groups in the Phoenix Valley area.
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
                  <div>
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
                        What the class feels like
                      </h3>
                    </div>
                    <p
                      className="mt-3 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      These classes are designed to make sourdough feel simple,
                      welcoming, and actually fun. The goal is to take the
                      mystery out of the process and help people leave feeling
                      confident instead of overwhelmed.
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-[1.75rem] border p-5 xl:flex xl:flex-col xl:justify-between xl:p-6"
                  style={{
                    borderColor: 'rgba(231, 111, 81, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <CalendarDays
                        size={20}
                        style={{ color: 'var(--color-secondary)' }}
                      />
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: 'var(--color-text-dark)' }}
                      >
                        Booking and calendar
                      </h3>
                    </div>
                    <p
                      className="mt-3 text-sm leading-6"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      A Google Calendar booking link or embedded availability
                      section would fit well here later. For now, this can route
                      people to contact Haley directly to ask about weekends,
                      group size, and location options.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Ask About Booking
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
                    Weekend classes
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                    A warm, social, beginner-friendly way to learn sourdough in
                    person.
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
