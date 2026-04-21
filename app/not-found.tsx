import Link from 'next/link'
import Nav from '../components/Nav'
import { Metadata } from 'next'
import { buildPageMetadata } from './metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Page Not Found | Arnaud Wiehe',
    description: 'The page you are looking for does not exist on arnaudwiehe.com.',
    path: '/404',
  }),
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="not-found-page">
        <div className="not-found-content">
          <span className="not-found-number">404</span>
          <h1>Page not found</h1>
          <p className="not-found-subtitle">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="not-found-home-btn">Return home</Link>
            <Link href="/articles" className="not-found-secondary-btn">Browse articles</Link>
          </div>
        </div>
      </main>
    </>
  )
}