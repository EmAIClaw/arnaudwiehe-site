export const siteUrl = 'https://arnaudwiehe.com'
export const defaultOgImage = `${siteUrl}/images/og-default.webp`

export function buildPageMetadata({
  title,
  description,
  path = '',
  type = 'website',
  image = defaultOgImage,
}: {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
  image?: string
}) {
  const url = path ? `${siteUrl}${path}` : siteUrl

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [image],
    },
  }
}
