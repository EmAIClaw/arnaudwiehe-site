import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/articles/">Articles</Link>
          <Link href="/books/">Books</Link>
          <Link href="/speaking/">Speaking</Link>
          <Link href="/music/">Music</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/arnaudwiehe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
        </div>
        <p>© {new Date().getFullYear()} Arnaud Wiehe. All rights reserved.</p>
      </div>
    </footer>
  )
}