import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg">Get in touch with us!</p>
      </div>
    </div>
  )
}
