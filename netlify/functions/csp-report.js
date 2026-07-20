/**
 * Netlify Function: CSP violation report collector
 *
 * Receives CSP violation reports at /api/csp-report.
 * Logs violations for monitoring — helps detect actual XSS attempts
 * and CSP policy issues before tightening further.
 */

const MAX_REPORT_BODY_SIZE = 65536; // 64 KB
const MAX_REPORTS_PER_REQUEST = 10;

function safeText(value, maxLength = 500) {
  return String(value || '')
    .replace(/[\r\n\t\0]/g, ' ')
    .substring(0, maxLength);
}

function logViolation(report) {
  const body = report.body || report;
  console.log('CSP Violation:', JSON.stringify({
    'blocked-uri': safeText(body.blockedURL || body['blocked-uri']),
    'violated-directive': safeText(body.effectiveDirective || body['violated-directive']),
    'document-uri': safeText(body.documentURL || body['document-uri']),
    'script-sample': safeText(body.sample || body['script-sample'], 100),
    timestamp: new Date().toISOString(),
  }));
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
