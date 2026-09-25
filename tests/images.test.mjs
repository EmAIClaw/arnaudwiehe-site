import test from 'node:test'
import assert from 'node:assert/strict'
import { stat, readFile } from 'node:fs/promises'
import sharp from 'sharp'

const slugs = ['future-crimes', 'prompt-injection-runtime-controls', 'ai-induced-misconfiguration', 'ai-vendor-questionnaire-obsolete', 'ai-governance-is-about-visibility', 'agent-governance-kill-switch', 'export-control-ai-models', 'ai-agent-debt']

test('reviewed hero images stay within the 300 KB / 1280px budget with real responsive variants', async () => {
  for (const slug of slugs) {
    const path = `public/images/articles/${slug}.webp`
    const info = await stat(path)
    assert.ok(info.size <= 300_000, `${slug} is ${info.size} bytes (budget 300000)`)
    const image = await sharp(path).metadata()
    assert.equal(image.format, 'webp')
    assert.ok(image.width <= 1280)
    for (const width of [640, 960]) {
      const variant = await sharp(`public/images/articles/${slug}-${width}.webp`).metadata()
      assert.equal(variant.width, width)
    }
  }
  const manifest = JSON.parse(await readFile('content/article-images.json', 'utf8'))
  assert.equal(Object.keys(manifest).length, slugs.length)
  for (const slug of slugs) assert.ok(manifest[`/images/articles/${slug}.webp`]?.srcSet.includes('640w'))
})
