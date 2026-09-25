import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

test('built headers stage exact inline-script hashes and immutable caching only for versioned assets', async () => {
  const headers = await readFile('out/_headers', 'utf8')
  assert.match(headers, /\/_next\/static\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/)
  const home = headers.split(/\n\n/).find(block => block.startsWith('/\n') && block.includes('Report-Only'))
  assert.ok(home, 'expected a per-page report-only policy')
  const scriptPolicy = home.match(/script-src ([^;]+)/)[1]
  assert.ok(!scriptPolicy.includes('unsafe-inline'))
  const html = await readFile('out/index.html', 'utf8')
  const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => !/\bsrc\s*=/i.test(m[1]) && m[2])
  for (const [, , body] of inlineScripts) {
    assert.ok(scriptPolicy.includes(`'sha256-${createHash('sha256').update(body).digest('base64')}'`))
  }
})
