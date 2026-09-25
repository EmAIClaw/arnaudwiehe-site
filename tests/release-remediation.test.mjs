import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('retired assessment and unused contact API are absent from release sources', () => {
  for (const file of ['app/ai-assessment/page.tsx', 'public/ai-assessment-form.html', 'netlify/functions/contact.js']) assert.equal(fs.existsSync(file), false, file)
  for (const file of ['scripts/generate-sitemap.mjs', 'public/llms.txt', 'app/privacy/page.tsx']) assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /ai-assessment|AI readiness questionnaire/)
})

test('privacy draft records the owner-confirmed six-month policy and Gmail provider', () => {
  const privacy = fs.readFileSync('app/privacy/page.tsx', 'utf8')
  assert.ok(privacy.includes('six months'))
  assert.ok(privacy.includes('Gmail'))
  assert.ok(privacy.includes('The Author'))
  assert.ok(privacy.includes('personal Gmail'))
  assert.doesNotMatch(privacy, /Draft for owner review|not yet approved|proposed legal basis/)
})

test('deployment uses one header source and does not rewrite valid directory exports to nonexistent files', () => {
  assert.doesNotMatch(fs.readFileSync('netlify.toml','utf8'), /\[\[headers\]\]|:splat\.html/)
  assert.doesNotMatch(fs.readFileSync('public/_redirects','utf8'), /:slug\.html/)
})
