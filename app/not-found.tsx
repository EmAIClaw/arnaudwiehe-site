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
          <a href="/" className="not-found-home-btn">
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}
