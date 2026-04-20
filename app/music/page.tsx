import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '../../components/Nav'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import Instrument1 from '../../assets/instruments/IMG_5695.jpg'
import Instrument2 from '../../assets/instruments/IMG_5935.jpg'
import Instrument3 from '../../assets/instruments/IMG_0470.jpg'
import Instrument4 from '../../assets/instruments/IMG_0472.jpg'
import Instrument5 from '../../assets/instruments/IMG_0099.jpg'
import Instrument6 from '../../assets/instruments/IMG_5954.jpg'
import Instrument7 from '../../assets/instruments/IMG_9109.jpg'
import Instrument8 from '../../assets/instruments/IMG_9896.jpg'

export const metadata: Metadata = {
  title: 'Music | Arnaud Wiehe',
  description: 'Beyond technology and security, music provides balance, discipline, and creative expression. Violin, viola, cello, and instrument building.',
  alternates: {
    canonical: 'https://arnaudwiehe.com/music',
  },
  openGraph: {
    title: 'Music | Arnaud Wiehe',
    description: 'Beyond technology and security, music provides balance, discipline, and creative expression.',
    url: 'https://arnaudwiehe.com/music',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music | Arnaud Wiehe',
    description: 'Beyond technology and security, music provides balance, discipline, and creative expression.',
  },
}

const instruments = [
  { src: Instrument1, alt: 'Violin' },
  { src: Instrument2, alt: 'Viola' },
  { src: Instrument3, alt: 'Cello' },
  { src: Instrument4, alt: 'Cello da spalla' },
  { src: Instrument5, alt: 'Violin' },
  { src: Instrument6, alt: 'Viola' },
  { src: Instrument7, alt: 'Cello' },
  { src: Instrument8, alt: 'Instrument' },
]

export default function MusicPage() {
  return (
    <>
      <Nav />

      <main id="main-content" className="music-page">
        <header className="music-page-header">
          <h1>Music</h1>
          <p className="subtitle">
            Beyond technology and security, music is a constant source of balance, 
            discipline, and creative expression.
          </p>
        </header>

        <section className="music-content-section">
          <div className="music-description">
            <p>
              Music has been a lifelong companion. From performing on violin and viola 
              to building cellos and exploring the unique cello da spalla, the intersection 
              of craftsmanship and artistry provides a different kind of creative outlet.
            </p>
            <p>
              Instrument building, in particular, teaches patience and precision—qualities 
              that translate directly to leadership and strategic thinking in the technology world. 
              Each instrument is a complex system of interdependent parts, requiring both 
              technical skill and artistic vision to bring to life.
            </p>
          </div>

          <div className="music-video-section">
            <div className="music-video-wrap">
              <YouTubeEmbed videoId="fi0KHOQ1e74" title="Musical Performance" className="music-video-iframe" />
            </div>
          </div>

          <div className="music-instruments-section">
            <h2 className="music-instruments-title">Instrument Collection</h2>
            <div className="music-instruments-grid">
              {instruments.map((instrument, index) => (
                <div key={index} className="music-instrument-card">
                  <img
                    src={instrument.src.src}
                    alt={instrument.alt}
                    className="music-instrument-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}