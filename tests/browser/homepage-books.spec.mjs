import { test, expect } from '@playwright/test'

test('homepage showcases all three books with the launch first and readable responsive layout', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    const cards = page.locator('.books-showcase .book-showcase-item')
    await expect(cards).toHaveCount(3)
    await expect(cards.first()).toContainText('AI Governance for Leaders')
    await expect(cards.first()).toHaveAttribute('href', '/books/ai-governance-for-leaders/')
    await cards.first().scrollIntoViewIfNeeded()
    await expect(cards.first().locator('img')).toBeVisible()
    expect(await cards.first().locator('img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
    const layout = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.books-showcase .book-showcase-item')]
      return { overflow: document.documentElement.scrollWidth > innerWidth, widths: cards.map(c => c.querySelector('.book-showcase-details').getBoundingClientRect().width), top: cards[1].getBoundingClientRect().top, bottom: cards[0].getBoundingClientRect().bottom }
    })
    expect(layout.overflow).toBe(false)
    expect(Math.min(...layout.widths)).toBeGreaterThan(200)
    expect(layout.top).toBeGreaterThan(layout.bottom)
  }
  await page.locator('.books-showcase .book-showcase-item').first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AI Governance for Leaders')
})
