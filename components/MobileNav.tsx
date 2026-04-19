'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/', label: 'About' },
  { href: '/books', label: 'Books' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/articles', label: 'Writing' },
  { href: '/music', label: 'Music' },
  { href: '/#contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close menu on navigation
    setOpen(false)
    // For hash links, scroll after closing
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Floating menu button */}
      <button
        className={`mobile-nav-toggle${visible && !open ? ' visible' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" stroke="#FAF8F5" />
          ) : (
            <>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#FAF8F5" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out panel */}
      <div className={`mobile-nav-panel${open ? ' active' : ''}`}>
        <div className="mobile-nav-panel-header">
          <span className="mobile-nav-panel-logo">Arnaud Wiehe</span>
          <button
            className="mobile-nav-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#FAF8F5" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <nav className="mobile-nav-panel-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-panel-link"
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}