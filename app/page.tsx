import Link from 'next/link'
import Nav from '../components/Nav'
import YouTubeEmbed from '../components/YouTubeEmbed'
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
    <main className="min-h-screen bg-cream">
      {/* Navigation */}
      <Nav />

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
              <Link href="/speaking" className="btn-primary">Book Me to Speak</Link>
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

      {/* Expertise Section: Books + Speaking Combined */}
      <section id="expertise" className="expertise-section">
        <div className="section-inner">
          {/* Books Subsection */}
          <div className="expertise-block">
            <div className="expertise-header">
              <h2 className="expertise-title">Books</h2>
            </div>
            <div className="books-showcase">
              <div className="book-showcase-item">
                <div className="book-cover-wrap">
                  <img src={Book1.src} alt="The Book on Cybersecurity" className="book-cover" />
                </div>
                <div className="book-showcase-details">
                  <h3 className="book-showcase-title">The Book on Cybersecurity</h3>
                  <p className="book-showcase-subtitle">How Nontechnical Corporate Leaders and Boards Can Manage in a Scary Digital World</p>
                  <a href="https://www.amazon.com/dp/B0C2SCKX7J" target="_blank" rel="noopener noreferrer" className="book-showcase-link">
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
                  <a href="https://www.amazon.com/dp/B0CXXL8W58" target="_blank" rel="noopener noreferrer" className="book-showcase-link">
                    Buy on Amazon →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Speaking Subsection */}
          <div className="expertise-block">
            <div className="expertise-header">
              <h2 className="expertise-title">Speaking</h2>
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

      {/* Music Section */}
      <section id="music" className="music-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Music</h2>
            <p className="section-subtitle">Beyond technology, music provides balance, discipline, and creative expression.</p>
          </div>

          {/* Description */}
          <div className="music-description">
            <p>
              Music has been a lifelong companion. From performing on violin and viola to building cellos 
              and exploring the unique cello da spalla, the intersection of craftsmanship and artistry 
              provides a different kind of creative outlet.
            </p>
            <p>
              Instrument building teaches patience and precision—qualities that translate directly to 
              leadership and strategic thinking in the technology world.
            </p>
          </div>

          {/* YouTube Video */}
          <div className="music-video-section">
            <div className="music-video-wrap">
              <YouTubeEmbed videoId="fi0KHOQ1e74" title="Musical Performance" className="music-video-iframe" />
            </div>
          </div>

          {/* Instruments Gallery */}
          <div className="music-instruments-section">
            <h3 className="music-instruments-title">Instrument Collection</h3>
            <div className="music-instruments-grid">
              <div className="music-instrument-card">
                <img src={Instrument1.src} alt="Violin" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument2.src} alt="Viola" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument3.src} alt="Cello" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument4.src} alt="Cello da spalla" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument5.src} alt="Violin" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument6.src} alt="Viola" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument7.src} alt="Cello" className="music-instrument-img" />
              </div>
              <div className="music-instrument-card">
                <img src={Instrument8.src} alt="Instrument" className="music-instrument-img" />
              </div>
            </div>
          </div>

          <div className="section-footer">
            <Link href="/music" className="view-all-link">View more about music →</Link>
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
              <a href="https://linkedin.com/in/arnaudwiehe" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Arnaud Wiehe. All rights reserved.</p>
      </footer>
    </main>
  )
}