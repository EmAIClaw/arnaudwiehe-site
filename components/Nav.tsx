'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/books/', label: 'Books' },
  { href: '/speaking/', label: 'Speaking' },
  { href: '/articles/', label: 'Writing' },
  { href: '/music/', label: 'Music' },
  { href: '/contact/', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 769px)')
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close() }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  const openMenu = () => {
    dialog.current?.showModal()
    setOpen(true)
    closeButton.current?.focus()
  }
  const closeMenu = () => dialog.current?.close()
  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <>
      <nav className="nav-wrapper" aria-label="Main navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Arnaud Wiehe</Link>
          <div className="nav-links">
            {navItems.map(item => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
          </div>
          <button ref={trigger} type="button" className="nav-hamburger" aria-label="Open navigation menu"
            aria-controls="mobile-nav" aria-expanded={open} onClick={openMenu}>
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
          </button>
        </div>
      </nav>
      <dialog id="mobile-nav" className="mobile-nav-dialog" aria-label="Navigation menu" ref={dialog}
        onKeyDown={trapFocus}
        onCancel={event => { event.preventDefault(); closeMenu() }}
        onClose={() => { setOpen(false); trigger.current?.focus() }}
        onClick={event => {
          if (event.target !== event.currentTarget) return
          const rect = event.currentTarget.getBoundingClientRect()
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMenu()
        }}>
        <div className="mobile-nav-panel-header">
          <span className="mobile-nav-panel-logo">Arnaud Wiehe</span>
          <button ref={closeButton} type="button" className="mobile-nav-close" aria-label="Close menu" onClick={closeMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <nav className="mobile-nav-panel-links" aria-label="Mobile navigation">
          {navItems.map(item => <Link key={item.href} href={item.href} className="mobile-nav-panel-link" onClick={closeMenu}>{item.label}</Link>)}
        </nav>
      </dialog>
      <noscript>
        <nav className="nojs-navigation" aria-label="Navigation without JavaScript">
          {navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
      </noscript>
    </>
  )
}
