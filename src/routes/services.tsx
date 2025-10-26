import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

function ServicesPage() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg">More content coming soon!</p>
      </div>
    </div>
  )
}
