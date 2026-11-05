import { test, expect } from '@playwright/test'
import fs from 'node:fs'
const summary = 'Anthropic’s suspension and restoration of Fable 5 and Mythos 5 access show why enterprises need contingency plans for critical AI dependencies.'
const route = '/articles/export-control-ai-models/'
const modified = '2026-11-05'

for (const width of [320, 375, 1440]) {
  test(`export-control correction is dated, sourced and readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(route)
    await expect(page.locator('.article-updated')).toHaveText('Last updated: November 5, 2026')
    await expect(page.locator('.article-updated time')).toHaveAttribute('datetime', modified)
    await expect(page.locator('.article-date')).toHaveText('June 14, 2026')
    await expect(page.locator('h1')).toHaveText('When Export Control Comes for AI Models')
    await expect(page.locator('.article-subtitle')).toHaveText(summary)
    const body = page.locator('.article-body')
    await expect(body).toContainText('Subsequent developments — June 30–July 1, 2026')
    await expect(body).toContainText('Its July 1 update states that access to both models was restored.')
    await expect(body.getByRole('link', { name: 'July 1 update' })).toHaveAttribute('href', 'https://www.anthropic.com/news/redeploying-fable-5')
    await expect(body).not.toContainText('broader partner access still being coordinated')
    await expect(body).not.toContainText('Minister for AI and Online Safety')
    const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent)))
    expect(schemas.find(s => s['@type'] === 'Article')).toMatchObject({ datePublished: '2026-06-14', dateModified: modified, description: summary })
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) await expect(page.locator(selector)).toHaveAttribute('content', summary)
    await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute('content', modified)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    expect(errors).toEqual([])
    await page.screenshot({ path: `/Users/ai/.hermes/profiles/ops/reports/export-control-review/implementation/article-${width}.png`, fullPage: true })
  })
}

test('corrected summary reaches homepage, archive and feeds without changing publication order', async ({ page, request }) => {
  for (const route of ['/', '/articles/']) {
    await page.goto(route)
    const card = route === '/' ? page.locator('a.article-list-item[href="/articles/export-control-ai-models/"]') : page.locator('.article-list-card').filter({ has: page.locator('a[href="/articles/export-control-ai-models/"]') }).first()
    await expect(card).toContainText(summary)
  }
  const rss = await request.get('/rss.xml')
  expect(await rss.text()).toContain(summary)
  const atom = await request.get('/atom.xml')
  const entry = (await atom.text()).split('<entry>').find(x => x.includes('/articles/export-control-ai-models/'))
  expect(entry).toContain('<published>2026-06-14T00:00:00.000Z</published>')
  expect(entry).toContain('<updated>2026-11-05T00:00:00.000Z</updated>')
  const sitemap = await request.get('/sitemap.xml')
  const item = (await sitemap.text()).split('<url>').find(x => x.includes('/articles/export-control-ai-models/'))
  expect(item).toContain('<lastmod>2026-11-05</lastmod>')
  const meta = JSON.parse(fs.readFileSync('content/published/2026-06-14-export-control-ai-models/metadata.json', 'utf8'))
  expect(meta.publishDate).toBe('2026-06-14T00:00:00Z')
})
