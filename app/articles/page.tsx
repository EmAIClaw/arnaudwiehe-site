'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { getAllArticles } from './data'

export default function ArticlesPage() {
  useEffect(() => {
    document.title = 'Writing | Arnaud Wiehe'
  }, [])
  const allArticles = getAllArticles()

  return (
    <>
      {/* Navigation — consistent with main page */}
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Arnaud Wiehe
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">About</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/speaking" className="nav-link">Speaking</Link>
            <Link href="/articles" className="nav-link">Writing</Link>
            <Link href="/#music" className="nav-link">Music</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="articles-page">
        <header className="articles-header">
          <h1>Writing</h1>
          <p className="subtitle">
            Thoughts on AI governance, cybersecurity leadership, emerging technologies,
            and what I'm learning along the way.
          </p>
        </header>

        <div className="articles-list">
          {allArticles.map((article) => (
            <article key={article.slug} className="article-list-card">
              {article.heroImage && (
                <Link href={`/articles/${article.slug}`} className="article-list-image-link">
                  <div className="article-list-image-wrap">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="article-list-image"
                    />
                  </div>
                </Link>
              )}
              <div className="article-list-body">
                <div className="article-meta">
                  <span className="article-date">{article.dateFormatted}</span>
                  <span className="article-category">{article.category}</span>
                  <span className="article-reading-time">{article.readingTime}</span>
                </div>
                <h2>
                  <Link href={`/articles/${article.slug}`} className="article-link">
                    {article.title}
                  </Link>
                </h2>
                <p className="article-excerpt">{article.excerpt}</p>
                <Link href={`/articles/${article.slug}`} className="read-more">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="newsletter-cta">
          <h3>Get articles in your inbox</h3>
          <p>Join the newsletter for weekly insights on AI leadership and emerging technology.</p>
          <a href="mailto:arnaud@arnaudwiehe.com?subject=Newsletter Subscribe" className="newsletter-button">
            Subscribe →
          </a>
        </div>
      </main>
    </>
  )
}
