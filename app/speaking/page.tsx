import Image from 'next/image'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { Metadata } from 'next'
import { getAllSpeakingEvents } from './data'
import HeroImage from '../../assets/photos/speaking/gitex-dubai-2025-2.jpg'

export const metadata: Metadata = {
  title: 'Speaking | Arnaud Wiehe',
  description: 'Arnaud speaks at leading global conferences on AI, cybersecurity, and emerging technologies — helping leaders navigate the intersection of innovation and risk.',
  alternates: {
    canonical: 'https://arnaudwiehe.com/speaking',
  },
  openGraph: {
    title: 'Speaking | Arnaud Wiehe',
    description: 'Arnaud speaks at leading global conferences on AI, cybersecurity, and emerging technologies.',
    url: 'https://arnaudwiehe.com/speaking',
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
      <Nav />

      <main id="main-content" className="speaking-page">
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

        <div className="speaking-hero-image-wrap">
          <Image
            src={HeroImage}
            alt="Arnaud Wiehe on stage at GITEX Global Dubai"
            className="speaking-hero-image"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        <section className="speaking-section-group">
          <div className="speaking-events-list">
            {allEvents.map((event) => (
              <SpeakingListItem key={event.slug} event={event} />
            ))}
          </div>
        </section>

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
      <Link href={`/speaking/${event.slug}`} className="speaking-list-cta">
        {event.youtubeId ? 'Watch →' : 'Details →'}
      </Link>
    </div>
  )
}
