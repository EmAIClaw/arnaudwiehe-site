import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { articles } from '../app/articles/data.generated.ts'

test('release articles use repository-owned sources and current author information', () => {
  const generator = fs.readFileSync('scripts/generate-articles-data.mjs','utf8')
  assert.doesNotMatch(generator, /workspaceRoot|memory.*content/)
  assert.doesNotMatch(fs.readFileSync('scripts/generate-rss.mjs', 'utf8'), /workspaceRoot|memory.*content/)
  assert.ok(fs.existsSync('content/published'))
  for (const article of articles.filter(a => a.author === 'Arnaud Wiehe')) {
    assert.ok(article.authorBio.includes('AI Governance for Leaders'))
    assert.ok(article.authorBio.includes('The Book on Cybersecurity'))
    assert.ok(!article.authorBio.includes('AI Governance Guide'))
  }
  assert.ok(articles.find(a=>a.slug==='openclaw-email-agent-phishing-test').content.includes('https://www.varonis.com/blog/openclaw-phishing'))
  assert.ok(articles.find(a=>a.slug==='prompt-injection-runtime-controls').content.includes('https://blog.google/security/google-workspaces-continuous-approach-to-mitigating-indirect-prompt-injections/'))
  assert.equal(articles.find(a=>a.slug==='trusted-feature-breach').linkedinUrl, '')
})
