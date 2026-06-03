'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setSubmitting(true)
    // Form is handled natively by Netlify Forms — no JS fetch needed.
    // The browser will navigate to /contact/thanks/ on success.
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

      <button
        className="contact-form-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
