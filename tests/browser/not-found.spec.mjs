import { test, expect } from '@playwright/test'

for (const width of [320, 1280]) {
  test(`404 export offers recovery links without JavaScript at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width, height: 900 } })
    const page = await context.newPage()
    // Python preview serves the export directly; Netlify serves this file for missing URLs.
    await page.goto('/404.html')
    await expect(page.getByRole('heading', { name: 'Page not found', exact: true })).toBeVisible()
    const routes = [['Browse articles', '/articles/'], ['Explore books', '/books/'], ['Go to the homepage', '/']]
    await expect(page.locator('.not-found-actions a')).toHaveCount(3)
    for (const [name, href] of routes) {
      const link = page.getByRole('link', { name, exact: true })
      await expect(link).toHaveAttribute('href', href)
      await link.click()
      await expect(page).toHaveURL(new URL(href, baseURL).href)
      await page.goto('/404.html')
    }
    await expect(page.locator('meta[http-equiv="refresh"]')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await context.close()
  })
}
