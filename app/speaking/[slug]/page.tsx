'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getSpeakingEventBySlug, getAdjacentEvents } from '../data'

export default function SpeakingEventPage() {
  const params = useParams()
  const slug = params?.slug as string | undefined

  if (!slug) return <NotFoundLayout />

  const event = getSpeakingEventBySlug(slug)
  const { prev, next } = getAdjacentEvents(slug)

  if (!event) return <NotFoundLayout />

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
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/#music" className="nav-link">Music</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="speaking-event-page">

        {/* Breadcrumb */}
        <nav className="speaking-breadcrumb">
          <Link href="/speaking" className="breadcrumb-link">← All Speaking Engagements</Link>
        </nav>

        {/* Hero Section */}
        <header className="speaking-event-hero">
          <div className="speaking-event-hero-meta">
            <span className="speaking-event-hero-category">{event.category}</span>
            <span className="speaking-event-hero-year">{event.dateFormatted}</span>
            <span className="speaking-event-hero-location">{event.location}</span>
          </div>
          <h1 className="speaking-event-hero-title">{event.name}</h1>
          <p className="speaking-event-hero-topic">{event.topic}</p>

          {/* Tags */}
          <div className="speaking-event-tags-row">
            {event.tags.map((tag) => (
              <span key={tag} className="speaking-tag">{tag}</span>
            ))}
          </div>
        </header>

        {/* Event Photo */}
        {event.heroImage && !event.youtubeId && (
          <div className="speaking-event-hero-image-wrap">
            <img
              src={event.heroImage}
              alt={event.name}
              className="speaking-event-hero-image"
            />
          </div>
        )}

        {/* YouTube Embed */}
        {event.youtubeId && (
          <div className="speaking-event-video-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${event.youtubeId}`}
              title={`${event.name} — ${event.topic}`}
              className="speaking-event-video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Content Grid */}
        <div className="speaking-event-body">

          {/* Summary */}
          <section className="speaking-event-summary">
            <h2 className="speaking-event-section-heading">About This Talk</h2>
            <div
              className="speaking-event-summary-text"
              dangerouslySetInnerHTML={{ __html: event.summary }}
            />
          </section>

          {/* Key Takeaways */}
          <section className="speaking-event-takeaways">
            <h2 className="speaking-event-section-heading">Key Takeaways</h2>
            <ul className="speaking-event-takeaways-list">
              {event.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="speaking-event-takeaway-item">
                  <span className="takeaway-marker">{i + 1}</span>
                  <span className="takeaway-text">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related Topics */}
          {event.relatedTopics.length > 0 && (
            <section className="speaking-event-related">
              <h2 className="speaking-event-section-heading">Related Topics</h2>
              <div className="speaking-event-related-topics">
                {event.relatedTopics.map((topic) => (
                  <span key={topic} className="speaking-related-tag">{topic}</span>
                ))}
              </div>
            </section>
          )}

          {/* Photo (for events with video, show the photo below) */}
          {event.heroImage && event.youtubeId && (
            <section className="speaking-event-photo-section">
              <h2 className="speaking-event-section-heading">At the Event</h2>
              <div className="speaking-event-inline-photo-wrap">
                <img
                  src={event.heroImage}
                  alt={`Arnaud Wiehe speaking at ${event.name}`}
                  className="speaking-event-inline-photo"
                />
              </div>
            </section>
          )}

        </div>

        {/* Book CTA */}
        <div className="speaking-event-book-cta">
          <div className="speaking-event-book-cta-inner">
            <h2>Book Arnaud for Your Event</h2>
            <p>
              Arnaud speaks at conferences, corporate events, and executive forums on AI governance,
              cybersecurity leadership, and emerging technology strategy. Available for keynotes,
              panels, and workshops.
            </p>
            <a
              href="mailto:arnaud@arnaudwiehe.com?subject=Speaking Inquiry"
              className="btn-primary-dark"
            >
              Get in Touch →
            </a>
          </div>
        </div>

        {/* Navigation between events */}
        <nav className="speaking-event-nav">
          <div className="speaking-nav-prev">
            {prev && (
              <Link href={`/speaking/${prev.slug}`} className="speaking-nav-link">
                <span className="speaking-nav-dir">← Previous</span>
                <span className="speaking-nav-title">{prev.shortName}</span>
              </Link>
            )}
          </div>
          <div className="speaking-nav-center">
            <Link href="/speaking" className="speaking-nav-all">
              All Events
            </Link>
          </div>
          <div className="speaking-nav-next">
            {next && (
              <Link href={`/speaking/${next.slug}`} className="speaking-nav-link speaking-nav-link-right">
                <span className="speaking-nav-dir">Next →</span>
                <span className="speaking-nav-title">{next.shortName}</span>
              </Link>
            )}
          </div>
        </nav>

      </main>
    </>
  )
}

function NotFoundLayout() {
  return (
    <>
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Arnaud Wiehe</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">About</Link>
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/#music" className="nav-link">Music</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      <main className="speaking-not-found">
        <h1>Event Not Found</h1>
        <p>The speaking event you're looking for doesn't exist.</p>
        <Link href="/speaking">← Back to all events</Link>
      </main>
    </>
  )
}
