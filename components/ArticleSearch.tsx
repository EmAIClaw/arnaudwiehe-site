'use client'

import { useState, useSyncExternalStore, type ReactNode } from 'react'

const subscribe = () => () => {}
const clientReady = () => true
const serverReady = () => false

type SearchItem = { slug: string; title: string; excerpt: string }

export default function ArticleSearch({ items, children }: { items: SearchItem[]; children: ReactNode[] }) {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady)
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLocaleLowerCase()
  const matches = items.map(item => `${item.title} ${item.excerpt}`.toLocaleLowerCase().includes(normalized))
  const count = matches.filter(Boolean).length

  return (
    <>
      <div className="article-search" hidden={!ready} role="search" aria-label="Writing archive">
        <label htmlFor="article-search">Search articles</label>
        <input id="article-search" type="search" value={query}
          onChange={event => setQuery(event.target.value)} placeholder="Search titles and summaries"
          aria-controls="article-results" aria-describedby="article-result-count" />
        <p id="article-result-count" role="status" aria-live="polite">
          {count === 0 ? 'No matching articles' : `${count} ${count === 1 ? 'article' : 'articles'}`}
        </p>
      </div>

      <div className="articles-list" id="article-results">
        {items.map((item, index) => (
          <div key={item.slug} style={{ display: matches[index] ? 'contents' : 'none' }}>
            {children[index]}
          </div>
        ))}
      </div>
    </>
  )
}
