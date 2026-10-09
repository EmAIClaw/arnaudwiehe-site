import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

test('article LinkedIn labels distinguish profiles from discussions', () => {
 let profiles = 0
 let discussions = 0
 for (const dir of fs.readdirSync('out/articles', { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  const file = path.join('out/articles', dir.name, 'index.html')
  if (!fs.existsSync(file)) continue
  const html = fs.readFileSync(file, 'utf8')
  const section = html.match(/<div class="share-section">(.*?)<\/div>/s)?.[1]
  if (!section) continue
  const href = section.match(/href="([^"]+)"/)?.[1]
  const profile = /^\/in\/[^/]+\/?$/.test(new URL(href).pathname)
  if (profile) {
   profiles++
   assert.ok(section.includes('Follow Arnaud on LinkedIn'), dir.name)
   assert.ok(section.includes('For more perspectives on AI governance and cybersecurity.'), dir.name)
   assert.ok(!section.includes('Connect with the discussion'), dir.name)
  } else {
   discussions++
   assert.ok(section.includes('View on LinkedIn'), dir.name)
   assert.ok(section.includes('Connect with the discussion:'), dir.name)
  }
 }
 assert.ok(profiles > 0 && discussions > 0, 'Both destination types exercised')
})
