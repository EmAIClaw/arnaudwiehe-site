export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/articles/">Articles</a>
          <a href="/books/">Books</a>
          <a href="/speaking/">Speaking</a>
          <a href="/music/">Music</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/arnaudwiehe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
        </div>
        <p>© {new Date().getFullYear()} Arnaud Wiehe. All rights reserved.</p>
      </div>
    </footer>
  )
}