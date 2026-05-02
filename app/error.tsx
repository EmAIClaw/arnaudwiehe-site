'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="error-page">
      <div className="error-content">
        <span className="error-number">Error</span>
        <h1>Something went wrong</h1>
        <p className="error-subtitle">
          We encountered an unexpected issue. Please try again or return to the homepage.
        </p>
        <div className="error-actions">
          <button onClick={() => reset()} className="btn-primary">
            Try Again
          </button>
          <a href="/" className="btn-ghost">
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}
