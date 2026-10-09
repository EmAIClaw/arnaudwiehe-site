import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const summaries = {
  'ai-governance-for-leaders': 'A practical guide for boards and executives to govern AI, clarify accountability, and manage risk. By Arnaud Wiehe.',
  'emerging-tech-emerging-threats': 'Explore the cybersecurity risks of emerging technologies and their implications for leaders. By Arnaud Wiehe and Tiago Teles.',
  'the-book-on-cybersecurity': 'Understand cybersecurity fundamentals and their practical implications for protecting organizations. By Arnaud Wiehe.',
}
for (const [slug, summary] of Object.entries(summaries)) {
 test(`${slug} uses the approved short summary only for search and sharing`, () => {
  const html = fs.readFileSync(`out/books/${slug}/index.html`, 'utf8')
  const tags = [...html.matchAll(/<meta\s[^>]*>/g)].map(m => m[0])
  for (const key of ['description', 'og:description', 'twitter:description']) {
   const tag = tags.find(t => t.includes(`name="${key}"`) || t.includes(`property="${key}"`))
   assert.ok(tag?.includes(`content="${summary}"`), `${key} should use approved text`)
  }
  const data = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]))
  const book = data.find(n => n['@type'] === 'Book')
  assert.ok(book.description.length > summary.length, 'Full book description remains intact')
 })
}
