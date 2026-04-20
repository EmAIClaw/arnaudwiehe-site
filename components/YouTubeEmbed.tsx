interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeEmbed({ videoId, title, className = '' }: YouTubeEmbedProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <div className={`youtube-embed ${className}`}>
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="youtube-embed-link"
        aria-label={`Watch ${title} on YouTube`}
      >
        <picture>
          <source srcSet={thumbnailUrl} type="image/webp" />
          <img
            src={fallbackThumbnail}
            alt={title}
            className="youtube-embed-thumbnail"
            loading="lazy"
            fetchPriority="low"
            width="640"
            height="360"
          />
        </picture>
        <div className="youtube-embed-play">
          <svg viewBox="0 0 68 48" className="youtube-embed-play-btn">
            <path d="M66.52 7.74c-.78-2.93-2.49-4.67-5.42-5.46C57.18 1.5 34 1.5 34 1.5S10.82 1.5 6.9 2.28c-2.93.79-4.64 2.53-5.42 5.46C.7 11.68.7 24 .7 24s0 12.32.78 16.26c.78 2.93 2.49 4.67 5.42 5.46C10.82 46.5 34 46.5 34 46.5s23.18 0 27.1-.78c2.93-.79 4.64-2.53 5.42-5.46C67.3 36.32 67.3 24 67.3 24s0-12.32-.78-16.26z" fill="#1B1B1B" fillOpacity="0.8"/>
            <path d="M45 24L27 14v20" fill="#FAF8F5"/>
          </svg>
        </div>
      </a>
    </div>
  )
}