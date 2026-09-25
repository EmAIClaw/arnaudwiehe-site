import { test, expect } from '@playwright/test'

test('books feature the launch above the backlist with comfortable reading widths', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/books/')
    const feature = page.locator('.book-launch-feature')
    await expect(feature).toContainText('Latest book · 2026')
    await expect(feature).toContainText('scaling responsible AI across the organisation.')
    await expect(page.getByRole('heading', { name: 'Also by Arnaud Wiehe' })).toBeVisible()
    await expect(page.locator('.books-backlist .book-overview-card')).toHaveCount(2)
    const dimensions = await page.evaluate(() => {
      const rect = s => document.querySelector(s).getBoundingClientRect()
      return { text: rect('.book-launch-feature .book-overview-content').width, featureBottom: rect('.book-launch-feature').bottom, backlistTop: rect('.books-backlist').top, overflow: document.documentElement.scrollWidth > innerWidth }
    })
    expect(dimensions.text).toBeGreaterThan(width >= 1024 ? 400 : 250)
    expect(dimensions.backlistTop).toBeGreaterThan(dimensions.featureBottom)
    expect(dimensions.overflow).toBe(false)
    await expect(page.locator('.books-services-section')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Bulk orders, speaking packages, and review copies' })).toBeVisible()
  }
})
