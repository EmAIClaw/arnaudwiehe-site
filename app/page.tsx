import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/Nav'
import YouTubeEmbed from '../components/YouTubeEmbed'

import { getAllArticles } from './articles/data'

const headshotImage = {
  src: '/images/headshots/headshot-thumb.webp',
  width: 933,
  height: 1400,
}

const speakingPhotos = {
  gitexVertical: {
    src: '/images/speaking/gitex-dubai-2025-1-thumb.webp',
    width: 1066,
    height: 1600,
  },
  gitexStage: {
    src: '/images/speaking/gitex-dubai-2025-2.webp',
    width: 1800,
    height: 1200,
  },
  worldSummit: {
    src: '/images/speaking/world-summit-ai-2023-thumb.webp',
    width: 1067,
    height: 1600,
  },
  isacaOne: {
    src: '/images/speaking/ISACA Risk Speaker Photo1-thumb.webp',
    width: 1707,
    height: 2560,
  },
  isacaTwo: {
    src: '/images/speaking/ISACA Risk Speaker Photo2-thumb.webp',
    width: 1707,
    height: 2560,
  },
}

const featuredEngagements = [
  {
    year: '2025',
    name: 'Re:invent Security Podcast',
    location: 'Global',
    topic: 'Next-gen CISO, AI threats, leadership',
    slug: 'reinvent-security-podcast',
    hasVideo: true,
  },
  {
    year: '2025',
    name: 'GITEX Global',
    location: 'Dubai',
    topic: 'AI, cybersecurity, emerging tech',
    slug: 'gitex-global-dubai-2025',
    hasVideo: false,
  },
  {
    year: '2024',
    name: 'Next IT Security – C-Suite Edition',
    location: 'Stockholm, Sweden',
    topic: 'Leadership, Talent & Strategy',
    slug: 'next-it-security-c-suite-stockholm-2024',
    hasVideo: false,
  },
  {
    year: '2023',
    name: 'ISACA Risk Event',
    location: 'Netherlands',
    topic: 'Cybersecurity considerations for AI systems',
    slug: 'isaca-risk-event-2023',
    hasVideo: true,
  },
  {
    year: '2023',
    name: 'World Summit AI',
    location: 'Amsterdam',
    topic: 'AI security and governance',
    slug: 'world-summit-ai-2023',
    hasVideo: false,
  },
  {
    year: '2023',
    name: 'Economist Metaverse Summit',
    location: 'Virtual',
    topic: 'Securing the metaverse',
    slug: 'economist-impact-metaverse-summit-2023',
    hasVideo: false,
  },
]

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 3)

  return (
    <main id="main-content" className="min-h-screen bg-cream">
      <Nav />

      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-headshot-wrap">
            <Image
              src={headshotImage.src}
              alt="Arnaud Wiehe"
              className="hero-headshot"
              width={headshotImage.width}
              height={headshotImage.height}
              priority
              sizes="240px"
            />
            <div className="hero-headshot-glow" />
          </div>
          <div className="hero-text">
            <p className="hero-eyebrow">AI & Emerging Tech Strategist</p>
            <h1 className="hero-name">Arnaud Wiehe</h1>
            <p className="hero-tagline">
              Helping leaders navigate AI governance, cybersecurity risk, and the strategic opportunities of emerging technology.
            </p>
            <h2 className="hero-credentials-heading">
              Author of 2 books · International speaker
            </h2>
            <p className="hero-credentials-sub">
              CISSP, CCSP, CISM, CISA, CIPP/E, AIGP
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">Get in Touch →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-inner narrow">
          <h2 className="about-heading">
            Helping organizations translate complex technological change into clear, actionable business strategy.
          </h2>
          <div className="about-body">
            <p>
              Arnaud Wiehe is a cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk. He serves as Managing Director of Information Security and AI Governance, leading strategic initiatives at the intersection of cybersecurity, artificial intelligence, and innovation.
            </p>
            <p>
              With over two decades of experience, Arnaud helps organizations move beyond fear-driven narratives toward a strategic view of innovation. His work focuses on how emerging technologies—AI, quantum computing, extended reality—are reshaping risk and opportunity.
            </p>
          </div>
          <div className="about-learn-more">
            <Link href="/about" className="view-all-link">Learn more about Arnaud →</Link>
          </div>
        </div>
      </section>

      <section id="expertise" className="expertise-section">
        <div className="section-inner">
          <div className="expertise-block">
            <div className="expertise-header">
              <h2 className="expertise-title">Books</h2>
            </div>
            <div className="books-showcase">
              <Link href="/books/the-book-on-cybersecurity" className="book-showcase-item">
                <div className="book-cover-wrap">
                  <Image src="/images/books/cybersecurity-cover-thumb.webp" alt="The Book on Cybersecurity" className="book-cover" width={600} height={900} loading="lazy" sizes="(max-width: 768px) 200px, 200px" />
                </div>
                <div className="book-showcase-details">
                  <h3 className="book-showcase-title">The Book on Cybersecurity</h3>
                  <p className="book-showcase-subtitle">How Nontechnical Corporate Leaders and Boards Can Manage in a Scary Digital World</p>
                  <span className="book-showcase-link">
                    Explore the book →
                  </span>
                </div>
              </Link>
              <Link href="/books/emerging-tech-emerging-threats" className="book-showcase-item">
                <div className="book-cover-wrap">
                  <Image src="/images/books/emerging-tech-cover-thumb.webp" alt="Emerging Tech, Emerging Threats" className="book-cover" width={600} height={900} loading="lazy" sizes="(max-width: 768px) 200px, 200px" />
                </div>
                <div className="book-showcase-details">
                  <h3 className="book-showcase-title">Emerging Tech, Emerging Threats</h3>
                  <p className="book-showcase-subtitle">A Cybersecurity Guide for Innovative Leaders</p>
                  <span className="book-showcase-link">
                    Explore the book →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="expertise-block">
            <div className="expertise-header">
              <h2 className="expertise-title">Speaking</h2>
            </div>

            <div className="speaking-photos-container">
              <div className="speaking-photos-vertical-row">
                <div className="speaking-photo-vertical">
                  <Image src={speakingPhotos.gitexVertical.src} alt="Speaking at GITEX Dubai 2025" className="speaking-photo-img-full" width={speakingPhotos.gitexVertical.width} height={speakingPhotos.gitexVertical.height} loading="lazy" sizes="(max-width: 900px) 50vw, 220px" />
                </div>
                <div className="speaking-photo-vertical">
                  <Image src={speakingPhotos.worldSummit.src} alt="World Summit AI 2023" className="speaking-photo-img-full" width={speakingPhotos.worldSummit.width} height={speakingPhotos.worldSummit.height} loading="lazy" sizes="(max-width: 900px) 50vw, 220px" />
                </div>
                <div className="speaking-photo-vertical">
                  <Image src={speakingPhotos.isacaOne.src} alt="ISACA Risk Event Netherlands" className="speaking-photo-img-full" width={speakingPhotos.isacaOne.width} height={speakingPhotos.isacaOne.height} loading="lazy" sizes="(max-width: 900px) 50vw, 220px" />
                </div>
                <div className="speaking-photo-vertical">
                  <Image src={speakingPhotos.isacaTwo.src} alt="ISACA Risk Event speaking" className="speaking-photo-img-full" width={speakingPhotos.isacaTwo.width} height={speakingPhotos.isacaTwo.height} loading="lazy" sizes="(max-width: 900px) 50vw, 220px" />
                </div>
              </div>
              <div className="speaking-photo-horizontal">
                <Image src={speakingPhotos.gitexStage.src} alt="GITEX Dubai 2025 stage" className="speaking-photo-img-full" width={speakingPhotos.gitexStage.width} height={speakingPhotos.gitexStage.height} loading="lazy" sizes="(max-width: 768px) 100vw, 700px" />
              </div>
            </div>

            <div className="engagements-list">
              {featuredEngagements.map((event, i) => (
                <div key={i} className="engagement-row">
                  <span className="engagement-row-year">{event.year}</span>
                  <div className="engagement-row-details">
                    <h4 className="engagement-row-name">{event.name}</h4>
                    <p className="engagement-row-meta">{event.location} · {event.topic}</p>
                  </div>
                  <Link href={`/speaking/${event.slug}`} className="engagement-row-link">
                    {event.hasVideo ? 'Watch →' : 'Details →'}
                  </Link>
                </div>
              ))}
            </div>

            <div className="expertise-cta">
              <Link href="/speaking" className="view-all-link">
                View all speaking engagements →
              </Link>
            </div>

            <div className="speaking-cta-box">
              <p className="speaking-cta-text">Interested in having Arnaud speak at your event?</p>
              <Link href="/contact" className="btn-primary">
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="writing" className="articles-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Writing</h2>
            <p className="section-subtitle">Thoughts on AI governance, cybersecurity leadership, and emerging technologies.</p>
          </div>

          <div className="articles-list">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="article-list-item"
              >
                <div className="article-list-meta">
                  <span className="article-list-date">{article.dateFormatted}</span>
                  <span className="article-list-category">{article.category}</span>
                </div>
                <h3 className="article-list-title">{article.title}</h3>
                <p className="article-list-excerpt">{article.excerpt}</p>
                <span className="article-list-cta">Read article →</span>
              </Link>
            ))}
          </div>

          <div className="section-footer">
            <Link href="/articles" className="view-all-link">
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-inner narrow">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-description">
            For speaking inquiries, consulting, or collaboration.
          </p>
          <Link href="/contact" className="btn-primary">Get in Touch →</Link>
        </div>
      </section>
    </main>
  )
}
