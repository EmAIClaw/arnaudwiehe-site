import test from 'node:test'
import assert from 'node:assert/strict'
import { books } from '../app/books/data.ts'

test('AI Governance launch listing leads with supplied content and no invented purchase details', () => {
  const book = books[0]
  assert.equal(book.slug, 'ai-governance-for-leaders')
  assert.equal(book.title, 'AI Governance for Leaders')
  assert.equal(book.year, '2026')
  assert.equal(book.toc.length, 9)
  assert.equal(book.excerpts.length, 3)
  assert.equal(book.audience.length, 6)
  assert.equal(book.takeaways.length, 6)
  assert.equal(book.description.split('\n\n').length, 2)
  assert.equal(book.detailDescription.split('\n\n').length, 3)
  assert.equal(book.amazonUrl, 'https://www.amazon.com/AI-GOVERNANCE-LEADERS-COMPETITIVE-ADVANTAGE/dp/B0HKLDGF3R')
  assert.equal(book.asin, 'B0HKLDGF3R')
  assert.deepEqual(book.testimonials, [])
  assert.equal(books.length, 3)
})
