import { test, expect } from '@playwright/test'

test('copy link uses canonical URL, confirms success and handles denied clipboard', async ({ page }) => {
  await page.addInitScript(() => {
    window.copiedLinks = []
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedLinks.push(text) } } })
  })
  await page.goto('/articles/ai-agent-debt/?utm_source=test#section')
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  const button = page.getByRole('button', { name: 'Copy link', exact: true })
  await button.click()
  await expect(page.getByRole('status')).toHaveText('Link copied')
  expect(await page.evaluate(() => window.copiedLinks)).toEqual([canonical])
  await expect(page.getByRole('status')).toHaveText('', { timeout: 5000 })
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('denied') } })
  await button.click()
  await expect(page.getByLabel('Article link', { exact: true })).toHaveValue(canonical)
  await expect(page.getByRole('status')).toContainText('Copy this link manually')
})

test('desktop article navigation titles use their full columns', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/articles/ai-agent-debt/')
  const measurements = await page.locator('.article-nav-link').evaluateAll(links => links.map(link => ({
    width: link.getBoundingClientRect().width,
    container: link.parentElement.getBoundingClientRect().width,
    top: link.getBoundingClientRect().top,
  })))
  console.log('Article navigation measurements', measurements)
  expect(measurements).toHaveLength(2)
  for (const item of measurements) expect(item.width / item.container).toBeGreaterThan(0.95)
  expect(Math.abs(measurements[0].top - measurements[1].top)).toBeLessThan(2)
})

for (const width of [320, 1280]) {
  test(`all article neighbours follow archive order at ${width}px without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width, height: 900 } })
    const page = await context.newPage()
    await page.goto('/articles/')
    const urls = await page.locator('.article-list-card .article-link').evaluateAll(links => links.map(link => link.getAttribute('href')))
    expect(urls.length).toBeGreaterThan(0)
    for (const [index, url] of urls.entries()) {
      const response = await page.goto(url)
      expect(response.status()).toBe(200)
      for (const [selector, target] of [['.article-nav-prev a', urls[index - 1]], ['.article-nav-next a', urls[index + 1]]]) {
        const link = page.locator(selector)
        if (target) await expect(link).toHaveAttribute('href', target)
        else await expect(link).toHaveCount(0)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      await expect(page.getByRole('button', { name: 'Copy link', exact: true })).toBeHidden()
      if (url.includes('/ai-agent-debt/')) {
        const links = await page.locator('.article-nav-link').evaluateAll(elements => elements.map(el => ({ top: el.getBoundingClientRect().top, bottom: el.getBoundingClientRect().bottom })))
        if (width === 320) expect(links[1].top).toBeGreaterThanOrEqual(links[0].bottom)
        await page.locator('.article-nav').screenshot({ path: `/Users/ai/.hermes/profiles/ops/cache/scratch/article-navigation-${width}.png` })
      }
    }
    await context.close()
  })
}
