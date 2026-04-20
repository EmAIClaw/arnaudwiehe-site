import Link from 'next/link'
import { Metadata } from 'next'
import Nav from '../../../components/Nav'
import YouTubeEmbed from '../../../components/YouTubeEmbed'
// Content is sanitized at build time in data files
// No runtime sanitization needed for server-rendered trusted content
import { getSpeakingEventBySlug, getAdjacentEvents, getAllSpeakingEvents } from '../data'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = getSpeakingEventBySlug(slug)
  if (!event) return { title: 'Speaking Event Not Found | Arnaud Wiehe' }

  return {
    title: `${event.name} | Arnaud Wiehe`,
    description: event.topic || `Arnaud Wiehe speaking at ${event.name} in ${event.location}.`,
    alternates: {
      canonical: `https://arnaudwiehe.com/speaking/${slug}`,
    },
    openGraph: {
      title: `${event.name} | Arnaud Wiehe`,
      description: event.topic || `Arnaud Wiehe speaking at ${event.name}.`,
      url: `https://arnaudwiehe.com/speaking/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.name} | Arnaud Wiehe`,
      description: event.topic || `Arnaud Wiehe speaking at ${event.name}.`,
    },
  }
}

export function generateStaticParams() {
  return getAllSpeakingEvents().map((event) => ({
    slug: event.slug,
  }))
}

export default async function SpeakingEventPage({ params }: Props) {
  const { slug } = await params
  const event = getSpeakingEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.name,
    'description': event.topic,
    'location': {
      '@type': 'Place',
      'name': event.location,
    },
    'startDate': event.date,
    'performer': {
      '@type': 'Person',
      'name': 'Arnaud Wiehe',
      'url': 'https://arnaudwiehe.com',
    },
  }

  const { prev, next } = getAdjacentEvents(slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Nav />

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
            <YouTubeEmbed videoId={event.youtubeId} title={`${event.name} — ${event.topic}`} className="speaking-event-video-iframe" />
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
                  <span className="speaking-event-takeaway-number">{i + 1}</span>
                  <span className="speaking-event-takeaway-text">{takeaway}</span>
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