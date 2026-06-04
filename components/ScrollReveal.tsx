'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale'
  delay?: number
  threshold?: number
  rootMargin?: string
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            if (delay > 0) {
              const timeoutId = setTimeout(() => {
                entry.target.classList.add('visible')
              }, delay * 1000)
              // Store timeout on element for cleanup
              ;(entry.target as any)._revealTimeout = timeoutId
            } else {
              entry.target.classList.add('visible')
            }
            // Unobserve after animation triggers
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      // Clear any pending timeouts
      if ((element as any)._revealTimeout) {
        clearTimeout((element as any)._revealTimeout)
      }
      observer.disconnect()
    }
  }, [delay, threshold, rootMargin])

  const getRevealClass = () => {
    switch (variant) {
      case 'fade-left':
        return 'reveal-left'
      case 'fade-right':
        return 'reveal-right'
      case 'scale':
        return 'reveal-scale'
      case 'fade-up':
      default:
        return 'reveal'
    }
  }

  return (
    <div
      ref={ref}
      className={`${getRevealClass()} ${className}`}
      style={{}}
    >
      {children}
    </div>
  )
}

// Hook for custom implementations
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return ref
}
