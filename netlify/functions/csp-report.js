/**
 * Netlify Function: CSP violation report collector
 *
 * Receives CSP violation reports at /api/csp-report.
 * Logs violations for monitoring — helps detect actual XSS attempts
 * and CSP policy issues before tightening further.
 */

const MAX_REPORT_BODY_SIZE = 65536; // 64 KB
const MAX_REPORTS_PER_REQUEST = 10;

const directives = new Set(['script-src', 'script-src-elem', 'script-src-attr', 'style-src', 'style-src-elem', 'style-src-attr', 'img-src', 'font-src', 'connect-src', 'frame-src', 'frame-ancestors', 'form-action', 'object-src', 'base-uri', 'default-src', 'media-src', 'worker-src', 'manifest-src', 'upgrade-insecure-requests'])

function sourceCategory(value) {
  if (value === 'inline' || value === 'eval') return value
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) return 'other'
    return url.hostname === 'arnaudwiehe.com' ? 'same-site' : 'external'
  } catch { return 'unknown' }
}

function logViolation(report) {
  const body = report.body || report
  const directive = body.effectiveDirective || body['violated-directive']
  // Only categories are retained: no URL paths, hosts, queries, fragments or code samples.
  console.log('CSP Violation:', JSON.stringify({
    source: sourceCategory(body.blockedURL || body['blocked-uri']),
    directive: directives.has(directive) ? directive : 'other',
    timestamp: new Date().toISOString(),
  }))
}

export default async function handler(req) {
  // Only POST with JSON content-type
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  const contentType = req.headers.get('content-type') || '';
  const supportedContentType = [
    'application/json',
    'application/csp-report',
    'application/reports+json',
  ].some((type) => contentType.includes(type));

  if (!supportedContentType) {
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

  if (Array.isArray(report)) {
    report
      .filter((item) => item?.type === 'csp-violation' && item.body)
      .slice(0, MAX_REPORTS_PER_REQUEST)
      .forEach(logViolation);
  } else if (report && report['csp-report']) {
    logViolation(report['csp-report']);
  }

  // Always return 204 — browsers don't need feedback
  return new Response(null, { status: 204 });
}

export const config = {
  path: '/api/csp-report',
};
