import Link from 'next/link'
import Nav from '../../components/Nav'
import { buildPageMetadata } from '../metadata'

export const metadata = buildPageMetadata({
  title: 'Privacy notice | Arnaud Wiehe',
  description: 'How enquiries and website connections are handled.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="article-page">
        <article className="article-content article-body">
          <h1>Privacy notice</h1>
          <p>Effective 25 September 2026.</p>
          <h2>Who is responsible</h2>
          <p>The Author operates arnaudwiehe.com. For privacy questions or requests, use the{' '}
            <Link href="/contact/">contact form</Link> with “Privacy request” in the subject.</p>
          <h2>Your enquiries</h2>
          <p>The contact form collects your name, email address, optional subject and message to answer
            your enquiry. This is based on the legitimate interest in responding to correspondence, or
            taking steps at your request before entering a contract, where applicable. Contacting the
            site does not subscribe you to marketing emails.</p>
          <h2>Services used</h2>
          <p>Netlify hosts the website and processes contact forms. It receives connection information,
            such as your IP address and browser information, to deliver and secure the site.
            Form notifications are received in a personal Gmail account provided by Google.
            These providers may process information outside your country. See{' '}
            <a href="https://www.netlify.com/privacy/" rel="noopener noreferrer">Netlify’s privacy information</a>{' '}
            and <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google’s privacy policy</a>{' '}
            for their processing and retention practices.</p>
          <h2>How long enquiries are kept</h2>
          <p>The Author manually reviews and deletes ordinary enquiries from Netlify Forms and Gmail
            within six months of the last interaction, unless needed for an ongoing relationship or a
            legal obligation. Provider-managed logs and backups follow the providers’ own retention practices.</p>
          <h2>Videos and external links</h2>
          <p>YouTube preview images share connection information with YouTube when they load; the video
            player loads only when you choose to play it. Amazon, LinkedIn and other external sites have
            their own privacy practices.</p>
          <h2>Your choices and rights</h2>
          <p>Where applicable, you can request access, correction, deletion, restriction or portability
            of your information, or object to its processing. Use the contact form above. You can also
            complain to your data protection authority, including the Netherlands’{' '}
            <a href="https://www.autoriteitpersoonsgegevens.nl/en" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.</p>
        </article>
      </main>
    </>
  )
}
