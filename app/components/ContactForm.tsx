'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('https://formspree.io/f/xaneanrw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await response.json()
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form-status success">
        <p>Message sent. I will get back to you soon.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-group">
        <label className="contact-form-label" htmlFor="name">Name <span className="required">*</span></label>
        <input
          className="contact-form-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
        />
      </div>

      <div className="contact-form-group">
        <label className="contact-form-label" htmlFor="email">Email <span className="required">*</span></label>
        <input
          className="contact-form-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
        />
      </div>

      <div className="contact-form-group">
        <label className="contact-form-label" htmlFor="subject">Subject</label>
        <input
          className="contact-form-input"
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'sending'}
        />
      </div>

      <div className="contact-form-group">
        <label className="contact-form-label" htmlFor="message">Message <span className="required">*</span></label>
        <textarea
          className="contact-form-textarea"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          disabled={status === 'sending'}
        />
      </div>

      {status === 'error' && (
        <div className="contact-form-status error">
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        className="contact-form-submit"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}