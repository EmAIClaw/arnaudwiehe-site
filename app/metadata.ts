import imageDimensions from './image-dimensions.generated.json'

export const siteUrl = 'https://arnaudwiehe.com'
export const defaultOgImage = `${siteUrl}/images/og-default.webp`

export function buildSharingImage(image: string, alt: string) {
  const url = new URL(image, siteUrl)
  if (url.origin !== siteUrl) return { url: image, alt }
  const dimensions = (imageDimensions as Record<string, { width: number; height: number }>)[decodeURIComponent(url.pathname)]
  if (!dimensions) throw new Error(`Missing sharing-image dimensions for ${image}; regenerate image dimensions`)
  return { url: image, ...dimensions, alt }
}

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
      images: [buildSharingImage(image, title)],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [image],
    },
  }
}
