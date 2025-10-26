import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Haley</h1>
        <p className="text-lg">More content coming soon!</p>
      </div>
    </div>
  )
}
