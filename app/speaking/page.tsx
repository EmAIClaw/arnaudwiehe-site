import Link from 'next/link'
import Nav from '../../components/Nav'
import { Metadata } from 'next'
import { getAllSpeakingEvents } from './data'
import HeroImage from '../../assets/photos/speaking/gitex-dubai-2025-2.jpg'

export const metadata: Metadata = {
  title: 'Speaking | Arnaud Wiehe',
  description: 'Arnaud speaks at leading global conferences on AI, cybersecurity, and emerging technologies — helping leaders navigate the intersection of innovation and risk.',
  openGraph: {
    title: 'Speaking | Arnaud Wiehe',
    description: 'Arnaud speaks at leading global conferences on AI, cybersecurity, and emerging technologies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaking | Arnaud Wiehe',
    description: 'Arnaud speaks at leading global conferences on AI, cybersecurity, and emerging technologies.',
  },
}

export default function SpeakingPage() {
  const allEvents = getAllSpeakingEvents()

  return (
    <>
      {/* Navigation */}
      <Nav />

      <main className="speaking-page">
        {/* Page Header */}
        <header className="speaking-page-header">
          <h1>Speaking</h1>
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

        {/* Hero Image */}
        <div className="speaking-hero-image-wrap">
          <img 
            src={HeroImage.src} 
            alt="Arnaud Wiehe on stage at GITEX Global Dubai" 
            className="speaking-hero-image"
          />
        </div>

        {/* Speaking Events - Single Section */}
        <section className="speaking-section-group">
          <div className="speaking-events-list">
            {allEvents.map((event) => (
              <SpeakingListItem key={event.slug} event={event} />
            ))}
          </div>
        </section>

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
function SpeakingListItem({ event }: { event: ReturnType<typeof getAllSpeakingEvents>[number] }) {
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
