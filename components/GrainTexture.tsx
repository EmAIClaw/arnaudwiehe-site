'use client'

export default function GrainTexture() {
  // Only render on client side to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return null
  }

  return <div className="grain-overlay" aria-hidden="true" />
}
