import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '../../../components/Nav'
import { Metadata } from 'next'
import { buildPageMetadata, siteUrl } from '../../metadata'
import { books, getBookBySlug } from '../data'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book) {
    return buildPageMetadata({
      title: 'Book Not Found | Arnaud Wiehe',
      description: 'The requested book could not be found.',
      path: '/books',
    })
  }

  return buildPageMetadata({
    title: `${book.title} | Arnaud Wiehe`,
    description: book.description,
    path: `/books/${book.slug}`,
    image: `${siteUrl}${book.cover}`,
  })
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book) notFound()

  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    description: book.description,
    author: {
      '@type': 'Person',
      name: book.coauthor ? `Arnaud Wiehe, ${book.coauthor}` : 'Arnaud Wiehe',
    },
    datePublished: book.year,
    image: `${siteUrl}${book.cover}`,
    url: `${siteUrl}/books/${book.slug}`,
    sameAs: book.amazonUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <Nav />

      <main id="main-content" className="books-page book-detail-page">
        <div className="book-detail-back-wrap">
          <Link href="/books" className="book-detail-back">← All books</Link>
        </div>

        <article className="books-page-item book-detail-hero">
          <div className="books-page-cover-wrap">
            <Image
              src={book.cover}
              alt={book.alt}
              className="books-page-cover"
              width={book.coverWidth}
              height={book.coverHeight}
              priority
              sizes="(max-width: 768px) 220px, 320px"
            />
          </div>

          <div className="books-page-details">
            <p className="book-year">{book.year}</p>
            <h1>{book.title}</h1>
            <p className="book-page-subtitle">{book.subtitle}</p>
            {book.coauthor && (
              <p className="book-coauthor">Co-authored with {book.coauthor}</p>
            )}
            <blockquote className="book-page-quote">{book.quote}</blockquote>
            <p className="book-description">{book.description}</p>

            <div className="book-detail-actions">
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="book-page-link"
              >
                Buy on Amazon →
              </a>
              <Link href="/contact" className="btn-primary">
                Get in Touch →
              </Link>
            </div>
          </div>
        </article>

        <section className="book-detail-content">
          <div className="book-section">
            <h2 className="book-section-title">Who This Book Is For</h2>
            <ul className="book-audience-list">
              {book.audience.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="book-section">
            <h2 className="book-section-title">Key Takeaways</h2>
            <ul className="book-takeaways-list">
              {book.takeaways.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="book-section">
            <h2 className="book-section-title">Table of Contents</h2>
            <div className="book-toc-grid">
              {book.toc.map((chapter, i) => (
                <div key={i} className="book-toc-item">{chapter}</div>
              ))}
            </div>
          </div>

          <div className="book-section">
            <h2 className="book-section-title">Chapter Excerpts</h2>
            <div className="book-excerpts">
              {book.excerpts.map((excerpt, i) => (
                <div key={i} className="book-excerpt-card">
                  <h3 className="book-excerpt-title">{excerpt.title}</h3>
                  <p className="book-excerpt-text">{excerpt.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="book-section">
            <h2 className="book-section-title">What Readers Are Saying</h2>
            <div className="book-testimonials">
              {book.testimonials.map((testimonial, i) => (
                <div key={i} className="book-testimonial-card">
                  <blockquote className="book-testimonial-quote">“{testimonial.quote}”</blockquote>
                  <div className="book-testimonial-author">
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
