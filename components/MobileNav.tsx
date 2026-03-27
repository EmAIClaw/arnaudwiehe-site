'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/articles', label: 'Writing' },
  { href: '/books', label: 'Books' },
  { href: '#music', label: 'Music' },
  { href: '#contact', label: 'Contact' },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile nav after scrolling past hero section
      const heroHeight = window.innerHeight * 0.8
      setIsVisible(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className={`mobile-nav-toggle ${isVisible ? 'visible' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <div className="mobile-nav-header">
            <Link href="/" className="mobile-nav-logo" onClick={handleLinkClick}>
              Arnaud Wiehe
            </Link>
          </div>
          
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-nav-footer">
            <a href="mailto:arnaud@arnaudwiehe.com" className="mobile-nav-email">
              arnaud@arnaudwiehe.com
            </a>
            <div className="mobile-nav-socials">
              <a href="https://linkedin.com/in/arnaudwiehe" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}