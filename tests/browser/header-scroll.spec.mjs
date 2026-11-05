import { test, expect } from '@playwright/test'

for (const width of [375, 1440]) {
  test(`fixed header stays readable after scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main navigation', exact: true })
    await expect.poll(() => nav.evaluate(n => getComputedStyle(n).backgroundImage)).toContain('linear-gradient')
    await page.evaluate(() => scrollTo(0, 800))
    await expect.poll(() => nav.evaluate(n => getComputedStyle(n).backgroundImage)).toBe('none')
    const style = await nav.evaluate(n => ({ background: getComputedStyle(n).backgroundColor, position: getComputedStyle(n).position, top: n.getBoundingClientRect().top }))
    expect(style.background).toBe('rgba(42, 36, 32, 0.98)')
    expect(style.position).toBe('fixed')
    expect(style.top).toBe(0)
    await page.screenshot({ path: `/Users/ai/.hermes/profiles/ops/reports/header-scroll-review/home-scrolled-${width}.png` })
    await page.evaluate(() => scrollTo(0, 0))
    await expect.poll(() => nav.evaluate(n => getComputedStyle(n).backgroundImage)).toContain('linear-gradient')
  })

  test(`article header has an opaque background over scrolled artwork at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/articles/your-ai-agent-has-access/')
    await page.evaluate(() => scrollTo(0, 650))
    const nav = page.getByRole('navigation', { name: 'Main navigation', exact: true })
    await expect.poll(() => nav.evaluate(n => getComputedStyle(n).backgroundImage)).toBe('none')
    await expect.poll(() => nav.evaluate(n => getComputedStyle(n).backgroundColor)).toBe('rgba(42, 36, 32, 0.98)')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    await page.screenshot({ path: `/Users/ai/.hermes/profiles/ops/reports/header-scroll-review/article-scrolled-${width}.png` })
  })

  test(`header is opaque without JavaScript at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } })
    const page = await context.newPage()
    await page.goto(`${baseURL}/`)
    const nav = page.getByRole('navigation', { name: 'Main navigation', exact: true })
    expect(await nav.evaluate(n => getComputedStyle(n).backgroundImage)).toBe('none')
    await page.evaluate(() => scrollTo(0, 800))
    expect(await nav.evaluate(n => getComputedStyle(n).backgroundColor)).toBe('rgba(42, 36, 32, 0.98)')
    await context.close()
  })
}
