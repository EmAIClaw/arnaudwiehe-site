// Generate sitemap.xml for the site
import { MetadataRoute } from 'next'
import { getAllArticles } from './articles/data'
import { getAllSpeakingEvents } from './speaking/data'

export default function generateSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arnaudwiehe.com'
  
  // Static routes
  const routes = ['', '/books', '/speaking', '/articles', '/music'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })
  )

  // Articles
  const articles = getAllArticles().map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  // Speaking events
  const speakingEvents = getAllSpeakingEvents().map((event) => ({
    url: `${baseUrl}/speaking/${event.slug}`,
    lastModified: event.date,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...routes, ...articles, ...speakingEvents]
}