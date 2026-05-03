/**
 * Netlify Function: handles contact form submissions
 * 
 * The Netlify Next.js runtime plugin intercepts POST requests to static pages
 * and returns 404 for form submissions. This function bypasses that by
 * receiving the form POST at /api/contact and storing it.
 * 
 * Submissions are stored in Netlify Blobs and can be retrieved later.
 * The function also returns a 303 redirect to the thank-you page.
 */
export default async (req, context) => {
  if (req.method !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  let body = ''
  if (typeof req.body === 'string') {
    body = req.body
  } else if (req.body) {
    body = JSON.stringify(req.body)
  }

  // Parse form fields
  const params = new URLSearchParams(body)
  const formName = params.get('form-name')

  // Honeypot check — if bot-field is filled, silently accept (don't store)
  const botField = params.get('bot-field')
  if (botField) {
    // Likely a bot — redirect as if successful but don't store
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

  // Store in Netlify Blobs so submissions are persistent and retrievable
  try {
    const store = context.store('form-submissions')
    const id = `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    await store.set(id, JSON.stringify(submission))
  } catch (e) {
    console.error('Failed to store submission:', e)
  }

  // Return success redirect
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