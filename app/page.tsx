'use client'

import Link from 'next/link'
import Headshot from '../assets/headshots/headshot.jpg'
import Book1 from '../assets/images/books/Book on Cybersecurity Cover -3d.png'
import Book2 from '../assets/images/books/Emerging Tech Cover- 3d.png'
import SpeakingPhoto1 from '../assets/photos/speaking/gitex-dubai-2025-1.jpg'
import SpeakingPhoto2 from '../assets/photos/speaking/gitex-dubai-2025-2.jpg'
import SpeakingPhoto3 from '../assets/photos/speaking/world-summit-ai-2023.jpg'
import SpeakingPhoto4 from '../assets/photos/speaking/ISACA Risk Speaker Photo1.jpg'
import SpeakingPhoto5 from '../assets/photos/speaking/ISACA Risk Speaker Photo2.jpg'
import Instrument1 from '../assets/instruments/IMG_5695.jpg'
import Instrument2 from '../assets/instruments/IMG_5935.jpg'
import Instrument3 from '../assets/instruments/IMG_0470.jpg'
import Instrument4 from '../assets/instruments/IMG_0472.jpg'
import Instrument5 from '../assets/instruments/IMG_0099.jpg'
import Instrument6 from '../assets/instruments/IMG_5954.jpg'
import Instrument7 from '../assets/instruments/IMG_9109.jpg'
import Instrument8 from '../assets/instruments/IMG_9896.jpg'
import { getAllArticles } from './articles/data'

// Featured speaking engagements
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
    <main className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Arnaud Wiehe
          </Link>
          <div className="nav-links">
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/#music" className="nav-link">Music</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-headshot-wrap">
            <img
              src={Headshot.src}
              alt="Arnaud Wiehe"
              className="hero-headshot"
            />
            <div className="hero-headshot-glow" />
          </div>
          <div className="hero-text">
            <p className="hero-eyebrow">AI & Emerging Tech Strategist</p>
            <h1 className="hero-name">Arnaud Wiehe</h1>
            <p className="hero-tagline">
              Helping leaders navigate AI governance, cybersecurity risk, and the strategic opportunities of emerging technology.
            </p>
            <p className="hero-social-proof">
              Author of 2 books · International speaker · CISSP, CCSP, CISM, CISA
            </p>
            <div className="hero-actions">
              <a href="/speaking" className="btn-primary">Book Me to Speak</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
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
          <div className="certs-section">
            <p className="certs-label">Certifications</p>
            <div className="certs-logos">
              <div className="cert-item" title="AIGP — Artificial Intelligence Governance Professional">
                <img src="/images/certifications/aigp.png" alt="AIGP" className="cert-logo" />
              </div>
              <div className="cert-item" title="CISSP — Certified Information Systems Security Professional">
                <img src="/images/certifications/cissp.png" alt="CISSP" className="cert-logo" />
              </div>
              <div className="cert-item" title="CCSP — Certified Cloud Security Professional">
                <img src="/images/certifications/ccsp.png" alt="CCSP" className="cert-logo" />
              </div>
              <div className="cert-item" title="CISM — Certified Information Security Manager">
                <img src="/images/certifications/cism.png" alt="CISM" className="cert-logo" />
              </div>
              <div className="cert-item" title="CISA — Certified Information Systems Auditor">
                <img src="/images/certifications/cisa.png" alt="CISA" className="cert-logo" />
              </div>
              <div className="cert-item" title="CIPP/E — Certified Information Privacy Professional (Europe)">
                <img src="/images/certifications/cippe.png" alt="CIPP/E" className="cert-logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="testimonials-grid">
            <blockquote className="testimonial-card">
              <p className="testimonial-quote">"I've had the pleasure of working with Arnaud for the past few years. He is an asset to any organization. He understands the complexities of the cybersecurity and IT compliance landscape and can develop and implement effective strategies to keep companies safe."</p>
              <footer className="testimonial-author">
                <strong>Zouhair Taheri</strong>
                <span>Partner, PWC</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p className="testimonial-quote">"Arnaud is a thought leader in the world of cybersecurity. He brings a wealth of knowledge and experience and has a proven track record of success as a CISO."</p>
              <footer className="testimonial-author">
                <strong>Martin Treder</strong>
                <span>Head of MDM Business Partner, Boehringer Ingelheim</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card">
              <p className="testimonial-quote">"Arnaud delivered a clear presentation which provided valuable key takeaways for those in the space who are seeking advice when it comes to protecting against IoT threats."</p>
              <footer className="testimonial-author">
                <strong>Rosie Fletcher</strong>
                <span>Conference Producer, TechEx Events</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Trust Logos Section */}
      <section className="trust-section">
        <div className="section-inner narrow">
          <p className="trust-label">Trusted by leading organizations</p>
          <div className="trust-logos">
            <div className="trust-logo-item">PWC</div>
            <div className="trust-logo-item">Deloitte</div>
            <div className="trust-logo-item">Boehringer Ingelheim</div>
            <div className="trust-logo-item">TNT</div>
            <div className="trust-logo-item">ISACA</div>
          </div>
        </div>
      </section>

      {/* Expertise Section: Books + Speaking Combined */}
      <section id="expertise" className="expertise-section">
        <div className="section-inner">
          {/* Books Subsection */}
          <div className="expertise-block">
            <div className="expertise-header">
              <span className="expertise-label">Published Work</span>
              <h2 className="expertise-title">Author of Two Books</h2>
            </div>
            <div className="books-showcase">
              <div className="book-showcase-item">
                <div className="book-cover-wrap">
                  <img src={Book1.src} alt="The Book on Cybersecurity" className="book-cover" />
                </div>
                <div className="book-showcase-details">
                  <h3 className="book-showcase-title">The Book on Cybersecurity</h3>
                  <p className="book-showcase-subtitle">How Nontechnical Corporate Leaders and Boards Can Manage in a Scary Digital World</p>
                  <a href="https://www.amazon.com/dp/B0C2SCKX7J" target="_blank" rel="noopener" className="book-showcase-link">
                    Buy on Amazon →
                  </a>
                </div>
              </div>
              <div className="book-showcase-item">
                <div className="book-cover-wrap">
                  <img src={Book2.src} alt="Emerging Tech, Emerging Threats" className="book-cover" />
                </div>
                <div className="book-showcase-details">
                  <h3 className="book-showcase-title">Emerging Tech, Emerging Threats</h3>
                  <p className="book-showcase-subtitle">A Cybersecurity Guide for Innovative Leaders</p>
                  <a href="https://www.amazon.com/dp/B0CXXL8W58" target="_blank" rel="noopener" className="book-showcase-link">
                    Buy on Amazon →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Speaking Subsection */}
          <div className="expertise-block">
            <div className="expertise-header">
              <span className="expertise-label">Speaking</span>
              <h2 className="expertise-title">Global Keynotes & Conferences</h2>
            </div>
            
            {/* Speaking Photos - 4 vertical + 1 horizontal */}
            <div className="speaking-photos-container">
              <div className="speaking-photos-vertical-row">
                <div className="speaking-photo-vertical">
                  <img src={SpeakingPhoto1.src} alt="Speaking at GITEX Dubai 2025" className="speaking-photo-img-full" />
                </div>
                <div className="speaking-photo-vertical">
                  <img src={SpeakingPhoto3.src} alt="World Summit AI 2023" className="speaking-photo-img-full" />
                </div>
                <div className="speaking-photo-vertical">
                  <img src={SpeakingPhoto4.src} alt="ISACA Risk Event Netherlands" className="speaking-photo-img-full" />
                </div>
                <div className="speaking-photo-vertical">
                  <img src={SpeakingPhoto5.src} alt="ISACA Risk Event speaking" className="speaking-photo-img-full" />
                </div>
              </div>
              <div className="speaking-photo-horizontal">
                <img src={SpeakingPhoto2.src} alt="GITEX Dubai 2025 stage" className="speaking-photo-img-full" />
              </div>
            </div>

            {/* Featured Engagements */}
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
              <a href="mailto:arnaud@arnaudwiehe.com?subject=Speaking Inquiry" className="speaking-cta-button">
                Check Availability →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" className="articles-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Selected Writing</h2>
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

      {/* Personal Section: Music + Contact */}
      <section id="music" className="personal-section">
        <div className="section-inner">
          {/* Music */}
          <div className="personal-block">
            <div className="personal-header">
              <span className="personal-label">Beyond Tech</span>
              <h2 className="personal-title">Cello da Spalla</h2>
            </div>
            <p className="personal-description">
              Accomplished musician and instrument maker. Arnaud has built several instruments including a rare cello da spalla, collaborating with master maker Dmitri Badiarov.
            </p>
            <div className="video-wrap">
              <iframe
                src="https://www.youtube.com/embed/fi0KHOQ1e74"
                title="Gabrielli Canon on 2 Cello da Spalla"
                className="video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="instruments-gallery">
              <div className="instrument-thumb">
                <img src={Instrument1.src} alt="Cello da spalla" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument2.src} alt="Cello da spalla detail" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument3.src} alt="Instrument workshop" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument4.src} alt="Cello da spalla front" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument5.src} alt="Finished instrument" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument6.src} alt="Cello da spalla scroll" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument7.src} alt="Cello da spalla making" className="instrument-thumb-img" />
              </div>
              <div className="instrument-thumb">
                <img src={Instrument8.src} alt="Cello da spalla complete" className="instrument-thumb-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-inner narrow">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-description">
            For speaking inquiries, consulting, or collaboration.
          </p>
          <div className="contact-links">
            <a href="mailto:arnaud@arnaudwiehe.com" className="contact-link primary">arnaud@arnaudwiehe.com</a>
            <div className="contact-socials">
              <a href="https://linkedin.com/in/arnaudwiehe" target="_blank" rel="noopener" className="contact-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Arnaud Wiehe. All rights reserved.</p>
      </footer>

      <style jsx>{`
        /* Typography Scale Improvements */
        .hero-name {
          font-size: clamp(3rem, 8vw, 5.5rem);
          line-height: 1.05;
          margin-bottom: 1.5rem;
        }
        
        .hero-tagline {
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          line-height: 1.7;
          max-width: 600px;
        }
        
        .about-heading {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          line-height: 1.3;
          margin-bottom: 2rem;
        }
        
        /* Section Spacing */
        .about-section {
          padding: 8rem 0;
        }
        
        .expertise-section {
          padding: 8rem 0;
          background: var(--brown);
          color: var(--cream);
        }
        
        .articles-section {
          padding: 8rem 0;
        }
        
        .personal-section {
          padding: 8rem 0;
          background: var(--cream-dark);
        }
        
        .contact-section {
          padding: 8rem 0;
        }
        
        /* Expertise Section */
        .expertise-block {
          margin-bottom: 6rem;
        }
        
        .expertise-block:last-child {
          margin-bottom: 0;
        }
        
        .expertise-header {
          margin-bottom: 3rem;
        }
        
        .expertise-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-light);
          display: block;
          margin-bottom: 0.75rem;
        }
        
        .expertise-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 300;
          color: var(--cream);
        }
        
        /* Books Showcase */
        .books-showcase {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4rem;
          margin-bottom: 2rem;
        }
        
        .book-showcase-item {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        
        .book-showcase-details {
          flex: 1;
        }
        
        .book-showcase-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--cream);
          margin-bottom: 0.5rem;
        }
        
        .book-showcase-subtitle {
          font-size: 0.9rem;
          color: rgba(250, 248, 245, 0.7);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        
        .book-showcase-link {
          font-size: 0.85rem;
          color: var(--gold-light);
          transition: color 0.2s;
        }
        
        .book-showcase-link:hover {
          color: var(--cream);
        }
        
        /* Speaking Photos Layout - 4 vertical + 1 horizontal */
        .speaking-photos-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .speaking-photos-vertical-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .speaking-photo-vertical {
          flex: 0 1 calc(25% - 0.75rem);
          min-width: 180px;
          max-width: 220px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .speaking-photo-horizontal {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .speaking-photo-img-full {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .speaking-photo-vertical:hover .speaking-photo-img-full,
        .speaking-photo-horizontal:hover .speaking-photo-img-full {
          transform: scale(1.02);
        }

        @media (max-width: 900px) {
          .speaking-photo-vertical {
            flex: 0 1 calc(50% - 0.5rem);
            min-width: 150px;
          }
          
          .speaking-photos-vertical-row {
            gap: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .speaking-photo-vertical {
            flex: 0 1 calc(50% - 0.5rem);
            min-width: 120px;
          }
        }

        @media (max-width: 768px) {
          .speaking-photos-vertical-row {
            flex-wrap: wrap;
          }
        }

        /* Speaker Reel */
        .speaker-reel {
          margin-bottom: 3rem;
          text-align: center;
        }

        .speaker-reel-label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 1rem;
        }

        .speaker-reel-video {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .speaker-reel-iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: none;
          display: block;
        }

        /* Old grid styles - can be removed but keeping for reference */
        .speaking-photos-grid {
          display: none;
        }

        /* Engagements List */
        .engagements-list {
          border-top: 1px solid rgba(250, 248, 245, 0.1);
        }
        
        .engagement-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(250, 248, 245, 0.1);
          transition: background 0.2s;
        }
        
        .engagement-row:hover {
          background: rgba(250, 248, 245, 0.03);
        }
        
        .engagement-row-year {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 300;
          color: var(--gold-light);
          min-width: 60px;
        }
        
        .engagement-row-details {
          flex: 1;
        }
        
        .engagement-row-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--cream);
          margin-bottom: 0.25rem;
        }
        
        .engagement-row-meta {
          font-size: 0.85rem;
          color: rgba(250, 248, 245, 0.6);
          margin: 0;
        }
        
        .engagement-row-link {
          font-size: 0.85rem;
          color: var(--gold-light);
          white-space: nowrap;
          transition: color 0.2s;
        }
        
        .engagement-row-link:hover {
          color: var(--cream);
        }
        
        .expertise-cta {
          margin-top: 2rem;
          text-align: center;
        }
        
        /* Speaking CTA Box */
        .speaking-cta-box {
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(250, 248, 245, 0.05);
          border: 1px solid rgba(250, 248, 245, 0.15);
          border-radius: 8px;
          text-align: center;
        }
        
        .speaking-cta-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 300;
          color: var(--cream);
          margin-bottom: 1rem;
        }
        
        .speaking-cta-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--gold);
          color: var(--cream);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .speaking-cta-button:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
        }
        
        /* Writing Section */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 500px;
          margin: 0 auto;
        }
        
        .articles-list {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .article-list-item {
          display: block;
          padding: 2.5rem 0;
          border-bottom: 1px solid var(--warm-200);
          transition: opacity 0.2s;
        }
        
        .article-list-item:hover {
          opacity: 0.7;
        }
        
        .article-list-item:first-child {
          border-top: 1px solid var(--warm-200);
        }
        
        .article-list-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        
        .article-list-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .article-list-category {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
        }
        
        .article-list-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 0.75rem;
          color: var(--text-dark);
        }
        
        .article-list-excerpt {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .article-list-cta {
          font-size: 0.85rem;
          color: var(--orange);
        }
        
        .section-footer {
          margin-top: 3rem;
          text-align: center;
        }
        
        /* Personal Section */
        .personal-block {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        
        .personal-header {
          margin-bottom: 1.5rem;
        }
        
        .personal-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .personal-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 300;
        }
        
        .personal-description {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        
        .instruments-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 2.5rem;
          width: 100%;
        }
        
        .instrument-thumb {
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .instrument-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .instrument-thumb:hover .instrument-thumb-img {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .instruments-gallery {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        
        /* Contact Section */
        .contact-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .contact-description {
          font-size: 1.1rem;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .contact-links {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .contact-link.primary {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--text-dark);
          margin-bottom: 1.5rem;
        }
        
        .contact-socials {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        
        .contact-socials .contact-link {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        
        .contact-socials .contact-link:hover {
          color: var(--text-dark);
        }
        
        /* Newsletter Inline */
        .newsletter-inline {
          padding-top: 3rem;
          border-top: 1px solid var(--warm-200);
          text-align: center;
        }
        
        .newsletter-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        
        .newsletter-form-inline {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .newsletter-input-inline {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--warm-200);
          border-radius: 4px;
          font-size: 0.9rem;
          background: white;
        }
        
        .newsletter-button-inline {
          padding: 0.75rem 1.5rem;
          background: var(--brown);
          color: var(--cream);
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background 0.2s;
        }
        
        .newsletter-button-inline:hover {
          background: var(--brown-light);
        }
        
        /* Testimonials Section */
        .testimonials-section {
          padding: 6rem 0;
          background: var(--cream-dark);
        }
        
        /* Trust Section */
        .trust-section {
          padding: 4rem 0;
          background: var(--cream);
          border-bottom: 1px solid var(--warm-200);
        }
        
        .trust-label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .trust-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 3rem;
        }
        
        .trust-logo-item {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--text-muted);
          opacity: 0.7;
          padding: 0.5rem 1rem;
          border: 1px solid var(--warm-200);
          border-radius: 4px;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        
        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid var(--warm-200);
          box-shadow: var(--shadow-sm);
        }
        
        .testimonial-quote {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-style: italic;
          font-weight: 300;
          line-height: 1.6;
          color: var(--text-dark);
          margin-bottom: 1.5rem;
        }
        
        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .testimonial-author strong {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-dark);
        }
        
        .testimonial-author span {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .books-showcase {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .book-showcase-item {
            flex-direction: column;
            text-align: center;
          }
          
          .book-cover-wrap {
            margin: 0 auto;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .engagement-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .instruments-gallery {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .contact-socials {
            flex-direction: column;
            gap: 1rem;
          }
          
          .newsletter-form-inline {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  )
}
