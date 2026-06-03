import Nav from '../../components/Nav'
import ContactForm from '../components/ContactForm'
import { Metadata } from 'next'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact | Arnaud Wiehe',
  description: 'Get in touch for speaking inquiries, consulting, collaboration, or questions about AI governance and cybersecurity.',
  path: '/contact',
})

function BreadcrumbJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arnaudwiehe.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://arnaudwiehe.com/contact/' },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-cream">
      <BreadcrumbJsonLd />
      <Nav />

      <header className="articles-header">
        <h1>Get in Touch</h1>
        <p className="subtitle">
          For speaking inquiries, consulting, collaboration, or questions about AI governance.
        </p>
      </header>

      <section className="contact-page-content">
        <div className="section-inner narrow">
          <div className="contact-form-card">
            <ContactForm />
          </div>

          <div className="contact-info">
            <div className="contact-info-divider" />
            <a
              href="https://linkedin.com/in/arnaudwiehe"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-link"
            >
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}