import Nav from '../../components/Nav'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { buildPageMetadata, siteUrl } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'About | Arnaud Wiehe — AI Governance & Cybersecurity Executive',
  description: 'Arnaud Wiehe is a cybersecurity executive, author of two books, and international speaker specializing in AI governance, emerging technologies, and digital risk. AIGP, CISSP, CCSP, CISM, CISA, CIPP/E certified.',
  path: '/about',
})

function BreadcrumbJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arnaudwiehe.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://arnaudwiehe.com/about/' },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const certifications = [
  { name: 'AIGP', src: '/images/certifications/aigp.webp' },
  { name: 'CISSP', src: '/images/certifications/cissp.webp' },
  { name: 'CCSP', src: '/images/certifications/ccsp.webp' },
  { name: 'CISM', src: '/images/certifications/cism.webp' },
  { name: 'CISA', src: '/images/certifications/cisa.webp' },
  { name: 'CIPP/E', src: '/images/certifications/cippe.webp' },
]

const headshotImage = {
  src: '/images/headshots/headshot-thumb.webp',
  width: 933,
  height: 1400,
}

export default function AboutPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arnaud Wiehe',
    url: siteUrl,
    jobTitle: 'Managing Director of Information Security and AI Governance',
    description: 'Cybersecurity executive, author, and international speaker specializing in AI governance, emerging technologies, and digital risk. AIGP, CISSP, CCSP, CISM, CISA, CIPP/E certified.',
    sameAs: ['https://www.linkedin.com/in/arnaudwiehe'],
    knowsAbout: [
      'AI Governance',
      'Cybersecurity',
      'Emerging Technologies',
      'Risk Management',
      'Digital Transformation',
      'AI Risk Management',
      'Board Governance',
      'CISO Leadership',
      'EU AI Act',
      'OWASP Agentic AI',
      'Agent Governance',
      'Information Security',
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'AIGP' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CISSP' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CCSP' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CISM' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CISA' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CIPP/E' },
    ],
    author: [
      { '@type': 'Book', name: 'The Book on Cybersecurity', url: 'https://www.amazon.com/dp/B0C2SCKX7J' },
      { '@type': 'Book', name: 'Emerging Tech, Emerging Threats', url: 'https://www.amazon.com/dp/B0CXXL8W58' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arnaudwiehe.com/' },
            { '@type': 'ListItem', position: 2, name: 'About', item: 'https://arnaudwiehe.com/about/' },
          ],
        })}}
      />
      <main id="main-content" className="min-h-screen bg-cream">
        <Nav />

        <header className="articles-header about-header">
          <div className="about-header-inner">
            <div className="about-headshot-wrap">
              <Image
                src={headshotImage.src}
                alt="Arnaud Wiehe"
                className="about-headshot"
                width={headshotImage.width}
                height={headshotImage.height}
                priority
                sizes="180px"
              />
            </div>
            <h1>Arnaud Wiehe</h1>
            <p className="subtitle">
              Cybersecurity executive, author, and international speaker. Helping organizations navigate AI governance, emerging technology, and digital risk.
            </p>
          </div>
        </header>

        <section className="about-page-content">
          <div className="section-inner narrow">
            <div className="about-page-bio">
              <p>
                Arnaud Wiehe is a cybersecurity executive, author, and international speaker specializing in AI governance, emerging technologies, and digital risk. He serves as Managing Director of Information Security and AI Governance, leading strategic initiatives at the intersection of cybersecurity, artificial intelligence, and innovation.
              </p>
              <p>
                With over two decades of experience spanning cybersecurity leadership, AI governance, risk management, and technology strategy, Arnaud helps organizations translate complex technological change into clear, actionable business strategy. His work focuses on how emerging technologies — AI, quantum computing, extended reality — are reshaping risk and opportunity for global enterprises.
              </p>
              <p>
                Arnaud holds AIGP, CISSP, CCSP, CISM, CISA, and CIPP/E certifications. He is the author of two books: <em>The Book on Cybersecurity: How Nontechnical Corporate Leaders and Boards Can Manage in a Scary Digital World</em> and <em>Emerging Tech, Emerging Threats: A Cybersecurity Guide for Innovative Leaders.</em>
              </p>
              <p>
                His speaking engagements have taken him to stages across Europe, the Middle East, and North America — including GITEX Global Dubai, World Summit AI, the Economist Metaverse Summit, and ISACA Risk Events — where he addresses AI governance, cybersecurity strategy, and the leadership dimensions of technology risk.
              </p>
              <p>
                Beyond technology, Arnaud builds stringed instruments — violins, violas, cellos, and the rare cello da spalla — bringing the same precision and craftsmanship that defines his professional work.
              </p>
            </div>

            <div className="credentials-card">
              <h2 className="credentials-heading">Credentials</h2>
              <div className="credentials-icons-row">
                {certifications.map((cert) => (
                  <div key={cert.name} className="credentials-icon-item">
                    <Image
                      src={cert.src}
                      alt={cert.name}
                      className="credentials-icon"
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                    <span className="credentials-icon-label">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-page-cta">
              <p>Interested in working together?</p>
              <Link href="/contact" className="btn-primary">Get in Touch →</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}