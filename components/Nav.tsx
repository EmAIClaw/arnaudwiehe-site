import Link from 'next/link'

const navItems = [
  { href: '/', label: 'About' },
  { href: '/books', label: 'Books' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/articles', label: 'Writing' },
  { href: '/music', label: 'Music' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <>
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Arnaud Wiehe
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </div>
          <a
            href="#mobile-nav"
            className="nav-hamburger"
            aria-label="Open navigation menu"
            aria-controls="mobile-nav"
          >
            <span className="nav-hamburger-line"></span>
            <span className="nav-hamburger-line"></span>
            <span className="nav-hamburger-line"></span>
          </a>
        </div>
      </nav>

      <div id="mobile-nav" className="mobile-nav-panel">
        <div className="mobile-nav-panel-header">
          <span className="mobile-nav-panel-logo">Arnaud Wiehe</span>
          <a href="#" className="mobile-nav-close" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#FAF8F5" strokeWidth="2" />
            </svg>
          </a>
        </div>
        <nav className="mobile-nav-panel-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-nav-panel-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <a href="#" className="mobile-nav-overlay" aria-label="Close navigation menu" />
    </>
  )
}
