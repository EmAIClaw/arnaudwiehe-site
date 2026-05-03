/**
 * Netlify Function: handles contact form submissions
 *
 * Bypasses the Next.js runtime plugin which intercepts POSTs to static pages.
 * Receives form data at /api/contact, then forwards it to Netlify's
 * form detection page (contact-form.html) so submissions appear in
 * the Netlify Forms dashboard. Redirects to /contact/thanks/ on success.
 */
export default async function handler(req, context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Read the request body
  let body = ''
  try {
    const reader = req.body?.getReader()
    if (reader) {
      const chunks = []
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
      }
      body = Buffer.concat(chunks).toString('utf-8')
    }
  } catch (e) {
    console.error('Body parse error:', e)
  }

  const params = new URLSearchParams(body)

  // Honeypot check
  if (params.get('bot-field')) {
    return new Response(null, {
      status: 303,
      headers: { Location: 'https://arnaudwiehe.com/contact/thanks/' },
    })
  }

  // Forward the submission to Netlify Forms via the HTML form page
  // This ensures the submission appears in the Netlify Forms dashboard
  try {
    await fetch('https://arnaudwiehe.com/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      redirect: 'manual',
    })
  } catch (e) {
    console.error('Netlify Forms forward error:', e)
    // Still redirect to success — don't block the user
  }

  console.log('Contact form submission:', JSON.stringify({
    name: params.get('name'),
    email: params.get('email'),
    subject: params.get('subject'),
  }))

  return new Response(null, {
    status: 303,
    headers: { Location: 'https://arnaudwiehe.com/contact/thanks/' },
  })
}

export const config = {
  path: '/api/contact',
}