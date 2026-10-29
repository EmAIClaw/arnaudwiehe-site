import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { parseDocument, DomUtils } from 'htmlparser2'
import sharp from 'sharp'

const dir = 'content/published/2026-10-29-your-ai-agent-has-access'
const source = JSON.parse(fs.readFileSync('tests/fixtures/linkedin-agent-access-2026-10-29.json', 'utf8'))
const text = node => DomUtils.textContent(node).replace(/\s+/g, ' ').trim()

test('published LinkedIn import preserves all 31 blocks, heading levels, emphasis and exact links', () => {
  assert.ok(fs.existsSync(`${dir}/article.md`), 'new article is missing')
  const doc = parseDocument(marked.parse(fs.readFileSync(`${dir}/article.md`, 'utf8')))
  const blocks = doc.children.filter(n => ['p', 'h3'].includes(n.name))
  assert.equal(blocks.length, 31)
  blocks.forEach((node, i) => {
    assert.equal(node.name, source.blocks[i].tag)
    assert.equal(text(node), source.blocks[i].text)
    const links = DomUtils.findAll(n => n.name === 'a', [node])
    const expectedLinks = source.blocks[i].links.map(link => ({ ...link, href: source.approvedLinkCorrections[link.href] || link.href }))
    assert.deepEqual(links.map(n => ({ text: text(n), href: n.attribs.href })), expectedLinks)
  })
  assert.equal(blocks[0].children.filter(n => n.name === 'em').length, 1)
  assert.equal(DomUtils.findAll(n => n.name === 'hr', doc.children).length, 1)
  assert.match(sanitizeHtml(marked.parse(fs.readFileSync(`${dir}/article.md`, 'utf8')), { allowedTags: ['p', 'em', 'h3', 'a', 'hr'] }), /<hr/)
  const meta = JSON.parse(fs.readFileSync(`${dir}/metadata.json`, 'utf8'))
  assert.equal(meta.title, source.title)
  assert.equal(meta.publishDate.slice(0, 10), source.date)
  assert.equal(meta.linkedinUrl, source.linkedinUrl)
  assert.match(meta.heroAlt, /identity.*least.privilege.*action.level.*monitoring.*human intervention/i)
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(`${dir}/cover-original.png`)).digest('hex'), source.coverSha256)
})

test('generated article retains the source divider and descriptive image alternative', () => {
  const generated = fs.readFileSync('app/articles/data.generated.ts', 'utf8')
  const record = generated.split('slug: "your-ai-agent-has-access"')[1]?.split('\n  },')[0]
  assert.ok(record, 'new article missing from generated index')
  assert.match(record, /heroAlt: "Five glass blocks/)
  assert.match(record, /<hr/)
})

test('article artwork has uncropped, bounded responsive derivatives', async () => {
  for (const width of [640, 960, 1279]) {
    const file = `public/images/articles/your-ai-agent-has-access${width === 1279 ? '' : `-${width}`}.webp`
    assert.ok(fs.existsSync(file), 'responsive cover derivative is missing')
    assert.ok(fs.statSync(file).size < 300000)
    const image = await sharp(file).metadata()
    assert.equal(image.width, width)
    assert.ok(Math.abs(image.width / image.height - 1279 / 720) < 0.005)
  }
})
