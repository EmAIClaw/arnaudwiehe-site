import { test, expect } from '@playwright/test'
import fs from 'node:fs'
const source = JSON.parse(fs.readFileSync('tests/fixtures/linkedin-agent-access-2026-10-29.json', 'utf8'))
const route = '/articles/your-ai-agent-has-access/'
const report = '/Users/ai/.hermes/profiles/ops/reports/article-2026-10-29'

for (const width of [320, 390, 1440]) {
  test(`LinkedIn article preserves source and full artwork at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(route)
    await expect(page.locator('h1')).toHaveText(source.title)
    await expect(page.locator('.article-date')).toHaveText('October 29, 2026')
    const blocks = await page.locator('.article-body > p, .article-body > h3').evaluateAll(nodes => nodes.map(node => ({
      tag: node.tagName.toLowerCase(), text: node.textContent.replace(/\s+/g, ' ').trim(),
      links: [...node.querySelectorAll('a')].map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') })),
    })))
    const expectedBlocks = source.blocks.map(block => ({ ...block, links: block.links.map(link => ({ ...link, href: source.approvedLinkCorrections[link.href] || link.href })) }))
    expect(blocks).toEqual(expectedBlocks)
    await expect(page.locator('.article-body > hr')).toHaveCount(1)
    await expect(page.locator('.article-body > p').first().locator('em')).toHaveCount(1)
    const img = page.locator('.article-hero-image')
    await expect(img).toHaveAttribute('alt', /Five glass blocks representing agent identity/)
    const dims = await img.evaluate(image => ({ complete: image.complete, w: image.naturalWidth, h: image.naturalHeight, box: image.getBoundingClientRect().toJSON() }))
    expect(dims.complete).toBe(true)
    expect(dims.w).toBeGreaterThan(0)
    expect(dims.h).toBeGreaterThan(0)
    // Width-descriptor srcsets expose density-corrected natural dimensions.
    expect(Math.abs(dims.w / dims.h - 1279 / 720)).toBeLessThan(0.02)
    expect(Math.abs(dims.box.width / dims.box.height - 1279 / 720)).toBeLessThan(0.005)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    await expect(page.locator('a.share-link')).toHaveAttribute('href', source.linkedinUrl)
    const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent)))
    expect(schema.find(x => x['@type'] === 'Article')).toMatchObject({ headline: source.title, datePublished: source.date })
    expect(errors).toEqual([])
    await page.screenshot({ path: `${report}/article-${width}.png`, fullPage: true })
    await img.screenshot({ path: `${report}/cover-${width}.png` })
  })
}

for (const width of [390, 1440]) {
  test(`Writing lists the new article first and links to it at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/articles/')
    const card = page.locator('.article-list-card').first()
    await expect(card.locator('h2')).toHaveText(source.title)
    const img = card.locator('img')
    await expect(img).toHaveAttribute('src', /your-ai-agent-has-access-thumb.webp/)
    await expect(img).toHaveAttribute('alt', /Five glass blocks/)
    expect(await img.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true)
    await page.screenshot({ path: `${report}/writing-${width}.png` })
    await card.getByRole('link', { name: 'Read article' }).click()
    await expect(page).toHaveURL(new RegExp(route))
    await expect(page.locator('h1')).toHaveText(source.title)
  })
}

test('article remains fully readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${baseURL}${route}`)
  await expect(page.locator('.article-body > p, .article-body > h3')).toHaveCount(31)
  await expect(page.locator('.article-hero-image')).toBeVisible()
  await context.close()
})
