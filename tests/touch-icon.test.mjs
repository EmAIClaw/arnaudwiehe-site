import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import sharp from 'sharp'

test('Apple touch icon is an opaque 180px PNG while browser favicon stays SVG', async () => {
  const metadata = await sharp('out/apple-touch-icon.png').metadata()
  assert.equal(metadata.format,'png')
  assert.equal(metadata.width,180)
  assert.equal(metadata.height,180)
  assert.equal(metadata.hasAlpha,false)
  for (const route of ['index.html','books/ai-governance-for-leaders/index.html','speaking/index.html']) {
    const html = readFileSync(`out/${route}`,'utf8')
    const icon = html.match(/<link[^>]*rel="apple-touch-icon"[^>]*>/)?.[0]
    assert.ok(icon)
    assert.match(icon,/href="\/apple-touch-icon.png"/)
    assert.match(icon,/sizes="180x180"/)
    assert.match(icon,/type="image\/png"/)
    assert.match(html,/<link[^>]*rel="icon"[^>]*href="\/favicon.svg\?v=2"/)
  }
})
