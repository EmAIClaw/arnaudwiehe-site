import Link from 'next/link'
import Nav from '../../../components/Nav'
import { Metadata } from 'next'
// Content is sanitized at build time in data.generated.ts
// No runtime sanitization needed for server-rendered trusted content
import { getArticleBySlug, getAdjacentArticles, getAllArticles } from '../data'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found | Arnaud Wiehe' }

  return {
    title: `${article.title} | Arnaud Wiehe`,
    description: article.excerpt || article.title,
    alternates: {
      canonical: `https://arnaudwiehe.com/articles/${slug}`,
    },
    openGraph: {
      title: `${article.title} | Arnaud Wiehe`,
      description: article.excerpt || article.title,
      url: `https://arnaudwiehe.com/articles/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Arnaud Wiehe`,
      description: article.excerpt || article.title,
    },
  }
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'datePublished': article.date,
    'author': {
      '@type': 'Person',
      'name': 'Arnaud Wiehe',
      'url': 'https://arnaudwiehe.com',
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Arnaud Wiehe',
      'url': 'https://arnaudwiehe.com',
    },
    'mainEntityOfPage': `https://arnaudwiehe.com/articles/${slug}`,
  }

  const { prev, next } = getAdjacentArticles(slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Navigation */}
      <Nav />

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
            <div className={`article-hero-image-wrap${article.slug === 'cyber-resilience-after-the-hype' || article.slug === 'third-party-cyber-risk-board-level' ? ' book-cover-hero' : ''}`}>
              <img
                src={article.heroImage}
                alt={article.title}
                className="article-hero-image"
              />
            </div>
          )}

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
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