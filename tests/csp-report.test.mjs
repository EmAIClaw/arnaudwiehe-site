import assert from 'node:assert/strict'
import test from 'node:test'

import handler from '../netlify/functions/csp-report.js'

test('CSP collector accepts modern Reporting API reports', async () => {
  const request = new Request('https://arnaudwiehe.com/api/csp-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/reports+json' },
    body: JSON.stringify([{
      age: 0,
      type: 'csp-violation',
      url: 'https://arnaudwiehe.com/',
      body: {
        blockedURL: 'https://example.invalid/script.js',
        effectiveDirective: 'script-src-elem',
        documentURL: 'https://arnaudwiehe.com/',
        sample: 'test sample',
      },
    }]),
  })

  const response = await handler(request, {})

  assert.equal(response.status, 204)
})

test('CSP collector logs only safe categories, never URL details or script samples', async t => {
  const logs = []
  t.mock.method(console, 'log', (...args) => logs.push(args))
  await handler(new Request('https://arnaudwiehe.com/api/csp-report', {
    method: 'POST', headers: { 'Content-Type': 'application/csp-report' },
    body: JSON.stringify({ 'csp-report': {
      'blocked-uri': 'https://example.invalid/private-person?token=synthetic-secret',
      'document-uri': 'https://arnaudwiehe.com/private-person?email=test@example.invalid#private',
      'script-sample': 'synthetic-secret',
      'violated-directive': 'script-src-elem',
    } }),
  }))
  const output = JSON.stringify(logs)
  assert.ok(output.includes('script-src-elem'))
  for (const value of ['private-person', 'synthetic-secret', 'test@example.invalid', 'script-sample']) assert.ok(!output.includes(value), value)
})
