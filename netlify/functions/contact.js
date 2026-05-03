/**
 * Netlify Function: handles contact form submissions
 * 
 * Bypasses the Next.js runtime plugin which intercepts POSTs to static pages.
 * Stores submissions in Netlify Blobs and redirects to thank-you page.
 */
export default async (req, context) => {
  if (req.method !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  let body = ''
  if (typeof req.body === 'string') {
    body = req.body
  } else if (Buffer.isBuffer(req.body)) {
    body = req.body.toString('utf-8')
  } else if (req.body) {
    body = JSON.stringify(req.body)
  }

  // Parse form fields
  const params = new URLSearchParams(body)
  const formName = params.get('form-name')

  // Honeypot check — if bot-field is filled, silently accept
  const botField = params.get('bot-field')
  if (botField) {
    return {
      statusCode: 303,
      headers: { Location: '/contact/thanks/' },
    }
  }

  if (formName !== 'contact') {
    return { statusCode: 400, body: 'Invalid form' }
  }

  const submission = {
    name: params.get('name') || '',
    email: params.get('email') || '',
    subject: params.get('subject') || '',
    message: params.get('message') || '',
    submittedAt: new Date().toISOString(),
  }

  // Store in Netlify Blobs
  try {
    const store = await context.store('form-submissions')
    const id = `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    await store.set(id, JSON.stringify(submission))
    console.log('Stored submission:', id)
  } catch (e) {
    console.error('Blob store error:', e.message || e)
    // Still return success — we don't want to block the user
  }

  return {
    statusCode: 303,
    headers: {
      Location: '/contact/thanks/',
      'Cache-Control': 'no-cache',
    },
  }
}

export const config = {
  path: '/api/contact',
}