/**
 * Netlify Function: handles contact form submissions
 *
 * Bypasses the Next.js runtime plugin which intercepts POSTs to static pages.
 * Receives form data at /api/contact, forwards to Netlify Forms for
 * dashboard visibility, and returns a JSON success response for the AJAX client.
 */
export default async function handler(req, context) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
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

  // Honeypot check — if filled, silently accept (it's a bot)
  if (params.get('bot-field')) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Forward to Netlify Forms (contact-form.html has data-netlify for detection)
  try {
    await fetch('https://arnaudwiehe.com/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      redirect: 'manual',
    })
  } catch (e) {
    console.error('Netlify Forms forward error:', e)
    // Don't block the user — submission still logged
  }

  console.log('Contact form submission:', JSON.stringify({
    name: params.get('name'),
    email: params.get('email'),
    subject: params.get('subject'),
  }))

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = {
  path: '/api/contact',
}