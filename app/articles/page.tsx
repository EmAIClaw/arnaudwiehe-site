import { Metadata } from 'next'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { getAllArticles } from './data'

export const metadata: Metadata = {
  title: 'Writing | Arnaud Wiehe',
  description: 'Thoughts on AI governance, cybersecurity leadership, emerging technologies, and what I\'m learning along the way.',
  alternates: {
    canonical: 'https://arnaudwiehe.com/articles',
  },
  openGraph: {
    title: 'Writing | Arnaud Wiehe',
    description: 'Thoughts on AI governance, cybersecurity leadership, emerging technologies.',
    url: 'https://arnaudwiehe.com/articles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing | Arnaud Wiehe',
    description: 'Thoughts on AI governance, cybersecurity leadership, emerging technologies.',
  },
}

export default function ArticlesPage() {
  const allArticles = getAllArticles()

  return (
    <>
      <Nav />

      <main id="main-content" className="articles-page">
        <header className="articles-header">
          <h1>Writing</h1>
          <p className="subtitle">
            Thoughts on AI governance, cybersecurity leadership, emerging technologies,
            and what I'm learning along the way.
          </p>
        </header>

        <div className="articles-list">
          {allArticles.map((article) => (
            <article key={article.slug} className={`article-list-card${article.slug === 'cyber-resilience-after-the-hype' || article.slug === 'third-party-cyber-risk-board-level' ? ' book-cover-card' : ''}`}>
              {article.heroImage && (
                <Link href={`/articles/${article.slug}`} className="article-list-image-link">
                  <div className="article-list-image-wrap">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className={`article-list-image${article.slug === 'cyber-resilience-after-the-hype' || article.slug === 'third-party-cyber-risk-board-level' ? ' book-cover' : ''}`}
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
          <h3>Stay current</h3>
          <p>Connect on LinkedIn for weekly insights on AI governance, cybersecurity leadership, and emerging technology.</p>
          <a href="https://www.linkedin.com/in/arnaudwiehe" target="_blank" rel="noopener noreferrer" className="newsletter-button">
            Follow on LinkedIn →
          </a>
        </div>
      </main>
    </>
  )
}