import Image from 'next/image'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { Metadata } from 'next'
import { buildPageMetadata } from '../metadata'
import { books } from './data'

export const metadata: Metadata = buildPageMetadata({
  title: 'Books | Arnaud Wiehe',
  description: 'Practical guides for leaders navigating cybersecurity, AI, and emerging technology.',
  path: '/books',
})

export default function BooksPage() {
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: books.map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Book',
        name: book.title,
        author: {
          '@type': 'Person',
          name: book.coauthor ? `Arnaud Wiehe, ${book.coauthor}` : 'Arnaud Wiehe',
        },
        datePublished: book.year,
        url: `https://arnaudwiehe.com/books/${book.slug}`,
        sameAs: book.amazonUrl,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <Nav />

      <main id="main-content" className="books-page books-overview-page">
        <header className="books-page-header books-overview-header">
          <p className="section-label">Books</p>
          <h1>Books for leaders navigating technology risk</h1>
          <p className="subtitle">
            Practical guides for board members, executives, CISOs, and innovation leaders working at the intersection of cybersecurity, AI, and emerging technology.
          </p>
        </header>

        <section className="books-overview-grid" aria-label="Book list">
          {books.map((book) => (
            <Link key={book.slug} href={`/books/${book.slug}`} className="book-overview-card">
              <div className="book-overview-cover-wrap" aria-hidden="true">
                <Image
                  src={book.cover}
                  alt=""
                  className="book-overview-cover"
                  width={book.coverWidth}
                  height={book.coverHeight}
                  sizes="(max-width: 768px) 160px, 220px"
                />
              </div>
              <div className="book-overview-content">
                <p className="book-year">{book.year}</p>
                <h2>{book.title}</h2>
                <p className="book-page-subtitle">{book.subtitle}</p>
                {book.coauthor && (
                  <p className="book-coauthor">Co-authored with {book.coauthor}</p>
                )}
                <p className="book-description">{book.description}</p>
                <span className="book-card-link">Explore the book →</span>
              </div>
            </Link>
          ))}
        </section>

        <section className="books-services-section books-overview-services">
          <div className="books-services-grid">
            <div className="books-service-card">
              <h3 className="books-service-title">Bulk Orders</h3>
              <p className="books-service-description">
                Distribute copies to your board, leadership team, or organization, with discounted rates for quantities of 25+ copies.
              </p>
            </div>
            <div className="books-service-card">
              <h3 className="books-service-title">Speaking Packages</h3>
              <p className="books-service-description">
                Combine a keynote, workshop, or leadership session with signed book bundles for your audience.
              </p>
            </div>
            <div className="books-service-card">
              <h3 className="books-service-title">Review Copies</h3>
              <p className="books-service-description">
                Media professionals, book reviewers, and industry analysts can request review copies for editorial consideration.
              </p>
            </div>
          </div>
        </section>

        <div className="books-cta-section">
          <h3 className="books-cta-title">Interested in Bulk Orders or Speaking Packages?</h3>
          <p className="books-cta-text">
            Get in touch to discuss your needs and receive a customized quote.
          </p>
          <a href="mailto:arnaud@arnaudwiehe.com?subject=Book%20Inquiry" className="books-cta-button">
            Contact for Details
          </a>
        </div>
      </main>
    </>
  )
}
