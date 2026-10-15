'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const clientReady = () => true
const serverReady = () => false

export default function CopyArticleLink({ url }: { url: string }) {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady)
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (status !== 'copied') return
    const timer = setTimeout(() => setStatus('idle'), 2500)
    return () => clearTimeout(timer)
  }, [status])

  async function copyLink() {
    setBusy(true)
    setStatus('idle')
    try {
      await navigator.clipboard.writeText(url)
      setStatus('copied')
    } catch {
      setStatus('failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="article-copy-link" hidden={!ready}>
      <button type="button" onClick={copyLink} disabled={busy}>Copy link</button>
      <span role="status" aria-live="polite">
        {status === 'copied' ? 'Link copied' : status === 'failed' ? 'Copy this link manually:' : ''}
      </span>
      {status === 'failed' && (
        <input aria-label="Article link" readOnly value={url} onFocus={event => event.target.select()} />
      )}
    </div>
  )
}
