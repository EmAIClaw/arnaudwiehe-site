import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Assessment | Arnaud Wiehe',
  description: 'Assess your organization\'s AI governance maturity with this interactive evaluation tool.',
  alternates: {
    canonical: 'https://arnaudwiehe.com/ai-assessment',
  },
  openGraph: {
    title: 'AI Assessment | Arnaud Wiehe',
    description: 'Assess your organization\'s AI governance maturity.',
    url: 'https://arnaudwiehe.com/ai-assessment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Assessment | Arnaud Wiehe',
    description: 'Assess your organization\'s AI governance maturity.',
  },
}

export default function AIAssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}