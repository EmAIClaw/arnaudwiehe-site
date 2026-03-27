'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import { getArticleBySlug, getAdjacentArticles } from '../data'

export default function ArticlePage() {
  const params = useParams()
  if (!params?.slug) return (
    <>
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Arnaud Wiehe</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">About</Link>
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/#music" className="nav-link">Music</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      <main className="article-page">
        <p style={{textAlign:'center',padding:'120px 0'}}>Article not found.</p>
      </main>
    </>
  )
  const slug = params.slug as string
  const article = getArticleBySlug(slug)
  const { prev, next } = getAdjacentArticles(slug)

  if (!article) {
    return (
      <>
        <nav className="nav-wrapper">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">Arnaud Wiehe</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">About</Link>
              <Link href="/speaking" className="nav-link">Speaking</Link>
              <Link href="/articles" className="nav-link">Writing</Link>
              <Link href="/books" className="nav-link">Books</Link>
              <Link href="/#music" className="nav-link">Music</Link>
              <Link href="/#contact" className="nav-link">Contact</Link>
            </div>
          </div>
        </nav>
        <main className="article-not-found">
          <h1>Article not found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link href="/articles">← Back to all articles</Link>
        </main>
      </>
    )
  }

  return (
    <>
      {/* Navigation */}
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Arnaud Wiehe
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">About</Link>
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/#music" className="nav-link">Music</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="article-page">
        <article className="article-content">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-date">{article.dateFormatted}</span>
              <span className="article-category">{article.category}</span>
              <span className="article-reading-time">{article.readingTime}</span>
            </div>
            <h1>{article.title}</h1>
            {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}
            <div className="article-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </header>

          {/* Hero image */}
          {article.heroImage && (
            <div className="article-hero-image-wrap">
              <img
                src={article.heroImage}
                alt={article.title}
                className="article-hero-image"
              />
            </div>
          )}

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
          />

          <footer className="article-footer">
            <div className="author-box">
              <p className="author-name">{article.author}</p>
              <p className="author-bio">{article.authorBio}</p>
            </div>
            {article.linkedinUrl && (
              <div className="share-section">
                <p>Share this article:</p>
                <a
                  href={article.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link"
                >
                  Share on LinkedIn →
                </a>
              </div>
            )}
          </footer>

          <nav className="article-nav">
            <div className="article-nav-prev">
              {prev && (
                <Link href={`/articles/${prev.slug}`} className="article-nav-link">
                  <span>← Previous</span>
                  <strong>{prev.title}</strong>
                </Link>
              )}
            </div>
            <div className="article-nav-next">
              {next && (
                <Link href={`/articles/${next.slug}`} className="article-nav-link">
                  <span>Next →</span>
                  <strong>{next.title}</strong>
                </Link>
              )}
            </div>
          </nav>

          <div className="back-link">
            <Link href="/articles">← All articles</Link>
          </div>
        </article>
      </main>
    </>
  )
}
