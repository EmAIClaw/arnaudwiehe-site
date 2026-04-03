'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if touch device - don't show custom cursor on mobile/tablet
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Smooth cursor following animation
    const animateCursor = () => {
      // Lerp (linear interpolation) for smooth following
      const speed = 0.15
      cursorX += (mouseX - cursorX) * speed
      cursorY += (mouseY - cursorY) * speed

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      requestAnimationFrame(animateCursor)
    }

    // Handle hover states for interactive elements
    const handleElementHover = () => {
      setIsHovering(true)
    }

    const handleElementLeave = () => {
      setIsHovering(false)
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .card-lift, .testimonial-card-lift, .book-cover-wrapper, .speaking-photo-wrapper'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    // Start animation loop
    animateCursor()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        /* Hide default cursor */
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }

        /* Custom cursor styles */
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.3s ease,
                      border-color 0.3s ease,
                      opacity 0.3s ease;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          opacity: 0;
        }

        .custom-cursor.visible {
          opacity: 1;
        }

        .custom-cursor.hovering {
          width: 60px;
          height: 60px;
          background-color: rgba(184, 134, 11, 0.1);
          border-color: var(--gold);
        }

        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background-color: var(--gold);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .custom-cursor-dot.visible {
          opacity: 1;
        }

        .custom-cursor-dot.hovering {
          opacity: 0;
        }

        /* Hide cursor on mobile */
        @media (pointer: coarse) {
          .custom-cursor,
          .custom-cursor-dot {
            display: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      />
    </>
  )
}
