/**
 * Netlify Function: CSP violation report collector
 *
 * Receives CSP violation reports at /api/csp-report.
 * Logs violations for monitoring — helps detect actual XSS attempts
 * and CSP policy issues before tightening further.
 */

const MAX_REPORT_BODY_SIZE = 65536; // 64 KB
const MAX_REPORTS_PER_CONTENT = 1;   // one csp-report per request

export default async function handler(req, context) {
  // Only POST with JSON content-type
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('application/json') && !contentType.includes('application/csp-report')) {
    return new Response(null, { status: 415 });
  }

  // Read body with size limit
  let body = '';
  try {
    const reader = req.body?.getReader();
    if (reader) {
      const chunks = [];
      let totalSize = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalSize += value.length;
        if (totalSize > MAX_REPORT_BODY_SIZE) {
          return new Response(null, { status: 413 });
        }
        chunks.push(value);
      }
      body = Buffer.concat(chunks).toString('utf-8');
    }
  } catch (e) {
    console.error('CSP report body parse error:', e);
  }

  // Parse and log
  let report = null;
  try {
    report = JSON.parse(body);
  } catch {
    // If body is empty or non-JSON but content-type was correct, still accept silently
    if (body.trim()) {
      console.warn('CSP report: non-JSON body received with JSON content-type');
    }
  }

  if (report && report['csp-report']) {
    const r = report['csp-report'];
    console.log('CSP Violation:', JSON.stringify({
      'blocked-uri': r['blocked-uri'],
      'violated-directive': r['violated-directive'],
      'document-uri': r['document-uri'],
      'script-sample': (r['script-sample'] || '').substring(0, 100),
      timestamp: new Date().toISOString(),
    }));
  }

  // Always return 204 — browsers don't need feedback
  return new Response(null, { status: 204 });
}

export const config = {
  path: '/api/csp-report',
};
