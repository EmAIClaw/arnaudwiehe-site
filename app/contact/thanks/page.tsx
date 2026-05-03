import Link from 'next/link'
import Nav from '../../../components/Nav'
import { Metadata } from 'next'
import { buildPageMetadata } from '../../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Message Sent | Arnaud Wiehe',
  description: 'Your message has been sent successfully.',
  path: '/contact/thanks',
})

export default function ThanksPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream">
      <Nav />

      <section className="articles-header">
        <h1>Message Sent</h1>
        <p className="subtitle">
          Thank you for reaching out. I will get back to you soon.
        </p>
        <Link href="/" className="btn-primary">
          Return Home →
        </Link>
      </section>
    </main>
  )
}