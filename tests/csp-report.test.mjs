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
