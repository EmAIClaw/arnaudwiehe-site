import './globals.css'

export const metadata = {
  title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
  description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  alternates: {
    canonical: 'https://arnaudwiehe.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://arnaudwiehe.com',
    title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
    description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
    siteName: 'Arnaud Wiehe',
    images: [{ url: 'https://arnaudwiehe.com/images/og-default.webp', width: 1200, height: 630, alt: 'Arnaud Wiehe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
    description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
    images: ['https://arnaudwiehe.com/images/og-default.webp'],
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
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Arnaud Wiehe",
              "url": "https://arnaudwiehe.com",
              "jobTitle": "Managing Director of Information Security and AI Governance",
              "description": "Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.",
              "sameAs": ["https://www.linkedin.com/in/arnaudwiehe"],
              "knowsAbout": ["AI Governance", "Cybersecurity", "Emerging Technologies", "Risk Management", "Digital Transformation"],
              "hasCredential": [
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification", "name": "AIGP" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification", "name": "CISSP" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification", "name": "CCSP" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification", "name": "CISM" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification", "name": "CISA" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification", "name": "CIPP/E" }
              ],
              "author": [
                { "@type": "Book", "name": "The Book on Cybersecurity", "url": "https://www.amazon.com/dp/B0C2SCKX7J" },
                { "@type": "Book", "name": "Emerging Tech, Emerging Threats", "url": "https://www.amazon.com/dp/B0CXXL8W58" }
              ]
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
