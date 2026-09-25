import Image from 'next/image'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { Metadata } from 'next'
import { buildPageMetadata } from '../metadata'
import { books } from './data'
import './books-overview.css'

export const metadata: Metadata = buildPageMetadata({
  title: 'Books | Arnaud Wiehe',
  description: 'Practical guides for leaders navigating cybersecurity, AI, and emerging technology.',
  path: '/books',
})

export default function BooksPage() {
  const [latest, ...backlist] = books
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: books.map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Book',
        name: book.title,
        author: book.authors.map(name => ({ '@type': 'Person', name })),
        datePublished: book.year,
        url: `https://arnaudwiehe.com/books/${book.slug}`,
        sameAs: book.amazonUrl,
      },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arnaudwiehe.com/' },
      { '@type': 'ListItem', position: 2, name: 'Books', item: 'https://arnaudwiehe.com/books/' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <Nav />
      <main id="main-content" className="books-page books-overview-page">
        <header className="books-page-header books-overview-header">
          <h1>Books for Technology Leaders</h1>
          <p className="subtitle">Practical guides to cybersecurity, AI governance, and responsible technology leadership.</p>
        </header>

        <div className="books-editorial-layout">
          <section aria-labelledby="latest-book-title" className="book-launch-feature">
            <div className="book-launch-artwork">
              <Image src={latest.cover} alt={latest.alt} width={latest.coverWidth} height={latest.coverHeight} sizes="(max-width: 768px) 220px, 300px" priority />
            </div>
            <div className="book-overview-content">
              <p className="book-year">Latest book · {latest.year}</p>
              <h2 id="latest-book-title">{latest.title}</h2>
              <p className="book-page-subtitle">{latest.subtitle}</p>
              {latest.description.split('\n\n').map((paragraph, i) => (
                <p key={i} className="book-description book-description-full">{paragraph}</p>
              ))}
              <Link href={`/books/${latest.slug}`} className="btn-primary">Explore the book →</Link>
            </div>
          </section>

          <section className="books-backlist" aria-labelledby="backlist-title">
            <h2 id="backlist-title">Also by Arnaud Wiehe</h2>
            <div className="books-backlist-grid">
              {backlist.map(book => (
                <article key={book.slug} className="book-overview-card">
                  <div className="book-overview-cover-wrap">
                    <Image src={book.cover} alt={book.alt} className="book-overview-cover" width={book.coverWidth} height={book.coverHeight} sizes="120px" />
                  </div>
                  <div className="book-overview-content">
                    <p className="book-year">{book.year}</p>
                    <h3>{book.title}</h3>
                    <p className="book-page-subtitle">{book.subtitle}</p>
                    {book.coauthor && <p className="book-coauthor">Co-authored with {book.coauthor}</p>}
                    <p className="book-description">
                      {book.description.split(/(?<=\.)\s+/).slice(0, 2).join(' ')}
                    </p>
                    <Link href={`/books/${book.slug}`} className="book-card-link" aria-label={`Explore ${book.title}`}>Explore the book →</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="books-contact-strip" aria-labelledby="books-contact-title">
            <div>
              <h2 id="books-contact-title">Bulk orders, speaking packages, and review copies</h2>
              <p>Bring these ideas to your leadership team or event, or request a copy for editorial review.</p>
            </div>
            <Link href="/contact" className="book-card-link">Contact for enquiries →</Link>
          </section>
        </div>
      </main>
    </>
  )
}
