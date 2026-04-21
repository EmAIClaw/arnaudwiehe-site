import Image from 'next/image'
import { Metadata } from 'next'
import Nav from '../../components/Nav'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Music | Arnaud Wiehe',
  description: 'Beyond technology and security, music provides balance, discipline, and creative expression. Violin, viola, cello, and instrument building.',
  path: '/music',
})

const instruments = [
  { src: '/images/music/IMG_5695.webp', alt: 'Violin', width: 1200, height: 1200 },
  { src: '/images/music/IMG_5935.webp', alt: 'Viola', width: 1400, height: 1045 },
  { src: '/images/music/IMG_0470.webp', alt: 'Cello', width: 1365, height: 2048 },
  { src: '/images/music/IMG_0472.webp', alt: 'Cello da spalla', width: 1343, height: 2048 },
  { src: '/images/music/IMG_0099.webp', alt: 'Violin', width: 854, height: 1280 },
  { src: '/images/music/IMG_5954.webp', alt: 'Viola', width: 1100, height: 1640 },
  { src: '/images/music/IMG_9109.webp', alt: 'Cello', width: 1400, height: 1045 },
  { src: '/images/music/IMG_9896.webp', alt: 'Instrument', width: 1050, height: 1400 },
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
              Instrument building, in particular, teaches patience and precision, qualities
              that translate directly to leadership, judgment, and long-horizon thinking in the technology world.
              Each instrument is a complex system of interdependent parts, requiring both
              technical skill and artistic vision to bring to life.
            </p>
            <p>
              That same balance, precision, restraint, and performance under pressure also shapes Arnaud's work
              with boards and executives navigating AI, cybersecurity, and emerging technology risk.
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
                  <Image
                    src={instrument.src}
                    alt={instrument.alt}
                    className="music-instrument-img"
                    width={instrument.width}
                    height={instrument.height}
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 200px"
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
