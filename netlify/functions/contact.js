export default function handler(req, context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body = ''
  if (typeof req.body === 'string') {
    body = req.body
  } else if (Buffer.isBuffer(req.body)) {
    body = req.body.toString('utf-8')
  }

  const params = new URLSearchParams(body)
  const botField = params.get('bot-field')
  if (botField) {
    return Response.redirect('/contact/thanks/', 303)
  }

  // Log the submission
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