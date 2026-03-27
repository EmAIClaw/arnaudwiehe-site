export type { Article } from './data.generated'
export { articles } from './data.generated'

import { articles, type Article } from './data.generated'

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find(a => a.featured)
}

export function getAdjacentArticles(slug: string): { prev: Article | null; next: Article | null } {
  const sorted = getAllArticles()
  const idx = sorted.findIndex(a => a.slug === slug)
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  }
}
