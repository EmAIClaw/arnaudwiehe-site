import './globals.css'
import MobileNav from '../components/MobileNav'

export const metadata = {
  title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
  description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎻</text></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://arnaudwiehe.com',
    title: 'Arnaud Wiehe | AI & Emerging Tech Strategist',
    description: 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.',
    siteName: 'Arnaud Wiehe',
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
      </head>
      <body>{children}<MobileNav /></body>
    </html>
  )
}
