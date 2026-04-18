import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Arnaud Wiehe
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">About</Link>
          <Link href="/books" className="nav-link">Books</Link>
          <Link href="/speaking" className="nav-link">Speaking</Link>
          <Link href="/articles" className="nav-link">Writing</Link>
          <Link href="/music" className="nav-link">Music</Link>
          <a href="/#contact" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  )
}