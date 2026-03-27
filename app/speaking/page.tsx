'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { getUpcomingEvents, getPastEvents } from './data'
import HeroImage from '../../assets/photos/speaking/gitex-dubai-2025-2.jpg'

export default function SpeakingPage() {
  useEffect(() => {
    document.title = 'Speaking Engagements | Arnaud Wiehe'
  }, [])
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()

  return (
    <>
      {/* Navigation */}
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Arnaud Wiehe
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">About</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/" className="nav-link">Music</Link>
            <Link href="/" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="speaking-page">
        {/* Hero Image - Better Fit */}
        <div className="speaking-hero-image-wrap">
          <img 
            src={HeroImage.src} 
            alt="Arnaud Wiehe on stage at GITEX Global Dubai" 
            className="speaking-hero-image"
          />
        </div>

        {/* Page Header */}
        <header className="speaking-page-header">
          <p className="section-label">Speaking</p>
          <h1>Speaking Engagements</h1>
          <p className="subtitle">
            Arnaud speaks at leading global conferences on AI, cybersecurity, and emerging
            technologies — helping leaders navigate the intersection of innovation and risk.
          </p>
          <div className="speaking-page-cta">
            <a href="mailto:arnaud@arnaudwiehe.com?subject=Speaking Inquiry" className="btn-primary-dark">
              Book Arnaud to Speak →
            </a>
          </div>
        </header>

        {/* Upcoming Events - Simplified List */}
        {upcoming.length > 0 && (
          <section className="speaking-section-group">
            <h2 className="speaking-group-label">Upcoming Events</h2>
            <div className="speaking-events-list">
              {upcoming.map((event) => (
                <SpeakingListItem key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past Events - Simplified List */}
        {past.length > 0 && (
          <section className="speaking-section-group">
            {upcoming.length > 0 && (
              <h2 className="speaking-group-label">Past Events</h2>
            )}
            <div className="speaking-events-list">
              {past.map((event) => (
                <SpeakingListItem key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Book CTA */}
        <div className="speaking-book-cta">
          <h2>Interested in having Arnaud speak?</h2>
          <p>
            Arnaud speaks at conferences, corporate events, and executive forums on AI governance,
            cybersecurity leadership, and emerging technology strategy. Get in touch to discuss your event.
          </p>
          <a href="mailto:arnaud@arnaudwiehe.com?subject=Speaking Inquiry" className="btn-primary-dark">
            Get in Touch →
          </a>
        </div>
      </main>
    </>
  )
}

// Simplified list item - no photos, Watch button on the right
function SpeakingListItem({ event }: { event: ReturnType<typeof getPastEvents>[number] }) {
  return (
    <div className="speaking-list-item">
      <div className="speaking-list-meta">
        <span className="speaking-list-year">{event.year}</span>
        <span className="speaking-list-location">{event.location}</span>
        <span className="speaking-list-category">{event.category}</span>
      </div>
      <div className="speaking-list-content">
        <h3 className="speaking-list-name">{event.name}</h3>
        <p className="speaking-list-topic">{event.topic}</p>
        <div className="speaking-list-tags">
          {event.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="speaking-list-tag">{tag}</span>
          ))}
        </div>
      </div>
      {event.youtubeId ? (
        <Link href={`/speaking/${event.slug}`} className="speaking-list-cta">
          Watch →
        </Link>
      ) : (
        <span className="speaking-list-cta speaking-list-cta--disabled"></span>
      )}
    </div>
  )
}
