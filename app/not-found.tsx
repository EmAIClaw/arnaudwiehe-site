import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <main className="not-found-page">
        <div className="not-found-content">
          <h1>404</h1>
          <p>Page not found.</p>
          <Link href="/" className="not-found-link">← Back to home</Link>
        </div>
      </main>
    </>
  )
}