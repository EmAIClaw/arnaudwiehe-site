import type { Book } from './data'
import { siteUrl } from '../metadata'

const authorIds: Record<string, string> = {
  'Arnaud Wiehe': `${siteUrl}/#person`,
  'Tiago Teles': `${siteUrl}/#tiago-teles`,
}

export function bookSchema(book: Book) {
  const url = `${siteUrl}/books/${book.slug}/`
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${url}#book`,
    name: book.title,
    description: book.description,
    author: book.authors.map(name => ({ '@type': 'Person', '@id': authorIds[name], name })),
    datePublished: book.year,
    image: `${siteUrl}${book.cover}`,
    url,
    sameAs: book.amazonUrl,
    ...(book.asin ? { identifier: { '@type': 'PropertyValue', propertyID: 'ASIN', value: book.asin } } : {}),
    inLanguage: 'en',
  }
}
