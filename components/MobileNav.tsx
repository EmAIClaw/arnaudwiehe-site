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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Sync the hamburger button in Nav.tsx with our open state
  useEffect(() => {
    const hamburger = document.querySelector('.nav-hamburger')
    if (!hamburger) return

    const toggle = () => setOpen(prev => !prev)
    hamburger.addEventListener('click', toggle)

    // Update aria and visual state
    const updateHamburger = () => {
      hamburger.setAttribute('aria-expanded', String(open))
      if (open) {
        hamburger.classList.add('active')
      } else {
        hamburger.classList.remove('active')
      }
    }
    updateHamburger()

    return () => hamburger.removeEventListener('click', toggle)
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
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