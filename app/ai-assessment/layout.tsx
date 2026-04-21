import { Metadata } from 'next'
import Nav from '../../components/Nav'
import { buildPageMetadata } from '../metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Assessment | Arnaud Wiehe',
  description: 'Assess your organization\'s AI governance maturity with this interactive evaluation tool.',
  path: '/ai-assessment',
})

export default function AIAssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}