import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

for (const year of ['2024', '2026']) {
 test(`Benelux ${year} has distinct metadata titles and unchanged visible heading`, () => {
  const html = fs.readFileSync(`out/speaking/next-it-security-benelux-${year}/index.html`, 'utf8')
  const title = `Next IT Security – Benelux ${year} | Arnaud Wiehe`
  assert.ok(html.includes(`<title>${title}</title>`))
  const metas = [...html.matchAll(/<meta\s[^>]*>/g)].map(m => m[0])
  for (const key of ['og:title', 'twitter:title']) {
   const tag = metas.find(t => t.includes(`property="${key}"`) || t.includes(`name="${key}"`))
   assert.ok(tag?.includes(`content="${title}"`), key)
  }
  const heading = html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]*>/g, '')
  assert.equal(heading, 'Next IT Security – Benelux')
 })
}
