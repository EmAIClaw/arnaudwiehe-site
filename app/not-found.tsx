import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-number">404</span>
        <h1>Page not found</h1>
        <p className="not-found-subtitle">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link href="/articles" className="not-found-home-btn">
            Browse articles
          </Link>
          <Link href="/books" className="not-found-secondary-btn">
            Explore books
          </Link>
          <Link href="/" className="not-found-secondary-btn">
            Go to the homepage
          </Link>
        </div>
      </div>
    </div>
  )
}