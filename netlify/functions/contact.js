/**
 * Netlify Function: handles contact form submissions
 *
 * Receives form data at /api/contact, validates inputs, applies rate limiting,
 * forwards to Netlify Forms for dashboard visibility, and returns JSON responses.
 */

// In-memory rate limit store (per-function-instance, resets on cold start)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 300;

function getClientId(req) {
  // Use x-forwarded-for + user-agent as a rough fingerprint
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-nf-client-connection-ip') || 'unknown';
  const ua = req.headers.get('user-agent') || '';
  return `${ip}|${ua.substring(0, 64)}`;
}

function checkRateLimit(clientId) {
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientId, { windowStart: now, count: 1 });
    return { allowed: true };
  }

  entry.count++;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count);

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true, remaining };
}

function validateEmail(email) {
  // Basic RFC 5322-ish check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, context) {
  // Only POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST',
      },
    });
  }

  // Rate limiting
  const clientId = getClientId(req);
  const rateLimit = checkRateLimit(clientId);
  const rateLimitHeaders = {};

  if (!rateLimit.allowed) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(rateLimit.retryAfter),
      },
    });
  }

  // Read body
  let body = '';
  try {
    const reader = req.body?.getReader();
    if (reader) {
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      body = Buffer.concat(chunks).toString('utf-8');
    }
  } catch (e) {
    console.error('Body parse error:', e);
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const params = new URLSearchParams(body);
  const name = (params.get('name') || '').trim();
  const email = (params.get('email') || '').trim();
  const subject = (params.get('subject') || '').trim();
  const message = (params.get('message') || '').trim();

  // Honeypot check
  if (params.get('bot-field')) {
    // Silently accept — it's a bot. Don't forward.
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validation
  const errors = [];

  if (!name) {
    errors.push('Name is required.');
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push('Name is too long.');
  }

  if (!email) {
    errors.push('Email is required.');
  } else if (!validateEmail(email)) {
    errors.push('Please provide a valid email address.');
  }

  if (!message) {
    errors.push('Message is required.');
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.push(`Message must be at least ${MIN_MESSAGE_LENGTH} characters.`);
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`Message must be under ${MAX_MESSAGE_LENGTH} characters.`);
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    errors.push('Subject is too long.');
  }

  if (errors.length > 0) {
    console.warn('Contact form validation failed:', JSON.stringify({ errors, name, email }));
    return new Response(JSON.stringify({ error: 'Validation failed', details: errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Forward to Netlify Forms
  try {
    await fetch('https://arnaudwiehe.com/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      redirect: 'manual',
    });
  } catch (e) {
    console.error('Netlify Forms forward error:', e);
  }

  console.log('Contact form submission:', JSON.stringify({ name, email, subject }));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  path: '/api/contact',
};
