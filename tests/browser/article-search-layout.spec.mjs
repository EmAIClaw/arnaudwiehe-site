import { test, expect } from '@playwright/test'

for (const width of [320, 390, 768, 1280, 1920]) {
  test(`Writing search aligns with the article column at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/articles/')
    const input = page.getByRole('searchbox', { name: 'Search articles' })
    await expect(input).toBeVisible()
    const card = await page.locator('.article-list-card').first().boundingBox()
    const search = await input.boundingBox()
    const label = await page.locator('.article-search label').boundingBox()
    const count = await page.getByRole('status').boundingBox()
    const header = await page.locator('.articles-header').boundingBox()
    console.log(JSON.stringify({ width, search, card, label, count }))
    expect(Math.abs(search.x - card.x), 'input shares the article-card left edge').toBeLessThanOrEqual(1)
    expect(Math.abs(label.x - card.x), 'label shares the article-card left edge').toBeLessThanOrEqual(1)
    expect(Math.abs(count.x - card.x), 'result count shares the article-card left edge').toBeLessThanOrEqual(1)
    expect(search.width).toBeCloseTo(Math.min(560, card.width), 0)
    expect(label.y).toBeGreaterThanOrEqual(header.y + header.height)
    expect(card.y).toBeGreaterThan(count.y + count.height)
    expect(search.x).toBeGreaterThanOrEqual(24)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if ([390, 1280].includes(width)) {
      await page.screenshot({ path: testInfo.outputPath(`writing-${width}.png`) })
    }
  })
}
