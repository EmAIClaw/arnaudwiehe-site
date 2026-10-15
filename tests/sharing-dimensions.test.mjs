import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? htmlFiles(path.join(dir, entry.name))
    : entry.name.endsWith('.html') ? [path.join(dir, entry.name)] : []))
  return nested.flat()
}

test('every exported Open Graph image declares its actual dimensions', async () => {
  const files = await htmlFiles('out')
  assert.ok(files.length > 30, 'full static export must exist')
  const errors = []
  const images = new Map()
  for (const file of files) {
    if (file === path.join('out', 'contact-form.html')) continue // Netlify discovery scaffold, not a public content page.
    const html = await readFile(file, 'utf8')
    const tags = new Map([...html.matchAll(/<meta\s+[^>]*>/g)].map(([tag]) => {
      const attrs = Object.fromEntries([...tag.matchAll(/([\w:]+)="([^"]*)"/g)].map(m => [m[1], m[2]]))
      return [attrs.property || attrs.name, attrs.content]
    }))
    const url = tags.get('og:image')
    assert.ok(url, `${file} must have a sharing image`)
    const parsed = new URL(url)
    assert.equal(parsed.origin, 'https://arnaudwiehe.com')
    if (!images.has(url)) images.set(url, await sharp(path.join('public', decodeURIComponent(parsed.pathname))).metadata())
    const image = images.get(url)
    for (const axis of ['width', 'height']) {
      if (Number(tags.get(`og:image:${axis}`)) !== image[axis]) errors.push(`${file}: ${axis} declared ${tags.get(`og:image:${axis}`)}, actual ${image[axis]}`)
    }
    assert.equal(tags.get('twitter:image'), url, `${file}: sharing image URLs must agree`)
  }
  assert.deepEqual(errors, [])
})
