export default async function handler(req, context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Parse body from the request stream
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
  const botField = params.get('bot-field')
  if (botField) {
    return Response.redirect('/contact/thanks/', 303)
  }

  console.log('Contact form submission:', JSON.stringify({
    name: params.get('name'),
    email: params.get('email'),
    subject: params.get('subject'),
    message: params.get('message')?.substring(0, 200),
  }))

  return Response.redirect('/contact/thanks/', 303)
}

export const config = {
  path: '/api/contact',
}