export default function handler(req, context) {
  if (req.method !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
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
    return { statusCode: 303, headers: { Location: '/contact/thanks/' } }
  }

  console.log('Contact form submission:', {
    name: params.get('name'),
    email: params.get('email'),
    subject: params.get('subject'),
    message: params.get('message')?.substring(0, 100),
  })

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