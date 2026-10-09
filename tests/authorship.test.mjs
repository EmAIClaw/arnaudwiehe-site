import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const base = 'https://arnaudwiehe.com'
function nodes(page) {
 const html = fs.readFileSync(`out/${page}`, 'utf8')
 return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
  .flatMap(m => { const value = JSON.parse(m[1]); return value['@graph'] || [value] })
}
test('homepage and book exports express stable Book-to-Person authorship', () => {
 const home = nodes('index.html')
 const owner = home.find(n => n['@type'] === 'Person' && n.name === 'Arnaud Wiehe')
 assert.equal(owner['@id'], `${base}/#person`)
 assert.equal(owner.author, undefined)
 const books = home.filter(n => n['@type'] === 'Book')
 assert.equal(books.length, 3)
 for (const book of books) {
  assert.equal(book['@id'], `${book.url}#book`)
  assert.ok(book.author.some(a => a['@id'] === owner['@id']))
  assert.ok(book.author.every(a => a['@type'] === 'Person' && a.name && a['@id']))
  const detail = nodes(book.url.replace(`${base}/`, '') + 'index.html').find(n => n['@id'] === book['@id'])
  assert.deepEqual(detail.author, book.author)
  assert.deepEqual(detail.identifier, book.identifier)
  assert.equal(book.identifier.propertyID, 'ASIN')
  assert.equal(book.isbn, undefined)
 }
 const coauthored = books.find(b => b.url.includes('emerging-tech-emerging-threats'))
 assert.deepEqual(coauthored.author.map(a => a.name), ['Arnaud Wiehe', 'Tiago Teles'])
})
