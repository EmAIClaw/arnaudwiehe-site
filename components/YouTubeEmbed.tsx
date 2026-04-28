'use client'

import { useState } from 'react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeEmbed({ videoId, title, className = '' }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [thumbnailIndex, setThumbnailIndex] = useState(0)

  const thumbnails = [
    `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  ]

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <div className={`youtube-embed ${className}`}>
      <div className="youtube-embed-frame-wrap">
        {isLoaded ? (
          <iframe
            key={videoId}
            className="youtube-embed-iframe"
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="youtube-embed-link"
            aria-label={`Play ${title} video`}
            onClick={() => setIsLoaded(true)}
          >
            <img
              src={thumbnails[thumbnailIndex]}
              alt={title}
              className="youtube-embed-thumbnail"
              loading="lazy"
              fetchPriority="low"
              width="1280"
              height="720"
              onError={() => setThumbnailIndex((current) => Math.min(current + 1, thumbnails.length - 1))}
            />
            <span className="youtube-embed-play" aria-hidden="true">
              <svg viewBox="0 0 68 48" className="youtube-embed-play-btn">
                <path d="M66.52 7.74c-.78-2.93-2.49-4.67-5.42-5.46C57.18 1.5 34 1.5 34 1.5S10.82 1.5 6.9 2.28c-2.93.79-4.64 2.53-5.42 5.46C.7 11.68.7 24 .7 24s0 12.32.78 16.26c.78 2.93 2.49 4.67 5.42 5.46C10.82 46.5 34 46.5 34 46.5s23.18 0 27.1-.78c2.93-.79 4.64-2.49 5.42-5.46C67.3 36.32 67.3 24 67.3 24s0-12.32-.78-16.26z" fill="#1B1B1B" fillOpacity="0.8"/>
                <path d="M45 24L27 14v20" fill="#FAF8F5"/>
              </svg>
            </span>
          </button>
        )}
      </div>
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="youtube-embed-fallback-link"
        aria-label="Open on YouTube"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
    </div>
  )
}