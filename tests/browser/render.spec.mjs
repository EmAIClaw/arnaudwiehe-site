import { test, expect } from '@playwright/test'

test('editorial content is visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  for (const route of ['/', '/articles/', '/articles/export-control-ai-models/']) {
    await page.goto(`http://127.0.0.1:8187${route}`)
    await expect.soft(page.locator('h1'), route).toBeVisible()
    await expect.soft(page.locator('main'), route).toBeVisible()
    await expect.soft(page.getByText('Loading…', { exact: true }), route).toHaveCount(0)
  }
  await context.close()
})

test('cold homepage loads avoid loading-shell layout shifts', async ({ browser }) => {
  for (const width of [390, 1280, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    const page = await context.newPage()
    await page.addInitScript(() => {
      window.reviewCLS = 0
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.reviewCLS += entry.value
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.goto('http://127.0.0.1:8187/', { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => window.reviewCLS), `CLS at ${width}px`).toBeLessThanOrEqual(0.1)
    await context.close()
  }
})
