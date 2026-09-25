import Link from 'next/link'

export default function PrivacyNote() {
  return (
    <p className="form-privacy-note">
      Your details are used to respond to this request. Please do not include confidential
      information. <Link href="/privacy/">Privacy notice</Link>
    </p>
  )
}
