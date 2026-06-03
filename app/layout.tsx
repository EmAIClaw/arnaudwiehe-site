import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { defaultOgImage, siteUrl } from './metadata'
import Footer from './components/Footer'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata = {
  title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
  description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
  icons: {
    icon: [
      {
        url: '/favicon.svg?v=2',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/favicon.svg?v=2',
        type: 'image/svg+xml',
      },
    ],
  },
  other: {
    'theme-color': '#2A2420',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
    description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
    siteName: 'Arnaud Wiehe',
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: 'Arnaud Wiehe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
    description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
    images: [defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Arnaud Wiehe (RSS)" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Arnaud Wiehe (Atom)" href="/atom.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Arnaud Wiehe',
              url: siteUrl,
              jobTitle: 'Managing Director of Information Security and AI Governance',
              description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
              sameAs: ['https://www.linkedin.com/in/arnaudwiehe'],
              knowsAbout: [
                'AI Governance',
                'AI Safety',
                'Agentic AI Security',
                'Cybersecurity',
                'Emerging Technologies',
                'Risk Management',
                'Digital Transformation',
                'LLM Security',
                'AI Regulation and Compliance',
                'Agent Governance',
                'Digital Sovereignty',
                'Quantum Computing Risk',
                'Non-Human Identity Security',
                'AI Vendor Risk Management',
                'Executive Cyber Leadership',
              ],
              hasCredential: [
                { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'AIGP' },
                { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CISSP' },
                { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CCSP' },
                { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CISM' },
                { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CISA' },
                { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification', name: 'CIPP/E' }
              ],
              author: [
                { '@type': 'Book', name: 'The Book on Cybersecurity', url: 'https://www.amazon.com/dp/B0C2SCKX7J' },
                { '@type': 'Book', name: 'Emerging Tech, Emerging Threats', url: 'https://www.amazon.com/dp/B0CXXL8W58' }
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Arnaud Wiehe',
              url: siteUrl,
              description: 'Cybersecurity executive, author, and international speaker specializing in AI governance, emerging technologies, and digital risk.',
              inLanguage: 'en-US',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: siteUrl + '/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${cormorantGaramond.variable} ${inter.variable}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Footer />
      </body>
    </html>
  )
}
