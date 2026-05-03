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
      const form = e.target as HTMLFormElement
      const formDataObj = new FormData(form)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj as unknown as Record<string, string>).toString(),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage('Something went wrong. Please try again.')
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
    <form
      className="contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/contact/thanks/"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot — visually hidden */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', overflow: 'hidden', height: '0', width: '0' }}>
        <label>
          Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

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