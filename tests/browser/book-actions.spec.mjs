import { test, expect } from '@playwright/test'

test('book pages have a focused purchase action and overview retains a quiet contact link', async ({ page }) => {
  await page.goto('/books/')
  await expect(page.locator('main a').filter({ hasText: 'Explore the book' })).toHaveCount(3)
  const contact = page.locator('.books-contact-strip a')
  await expect(contact).toHaveAttribute('href', '/contact/')
  await expect(contact).not.toHaveClass(/btn-primary/)
  for (const slug of ['ai-governance-for-leaders', 'emerging-tech-emerging-threats', 'the-book-on-cybersecurity']) {
    await page.goto(`/books/${slug}/`)
    const purchases = page.locator('.book-detail-actions a')
    await expect(purchases).toHaveCount(slug === 'ai-governance-for-leaders' ? 2 : 1)
    for (const link of await purchases.all()) await expect(link).toContainText('Buy on Amazon')
    await expect(page.locator('main').getByRole('link', { name: 'Get in Touch' })).toHaveCount(0)
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      if (slug === 'ai-governance-for-leaders') {
        const first = await purchases.first().boundingBox()
        const description = await page.locator('.book-detail-hero .book-description').first().boundingBox()
        const subtitle = await page.locator('.book-page-subtitle').boundingBox()
        const last = await purchases.last().boundingBox()
        const excerpts = await page.locator('.book-excerpts').boundingBox()
        expect(first.y).toBeGreaterThan(subtitle.y)
        expect(first.y + first.height).toBeLessThan(description.y)
        expect(last.y).toBeGreaterThan(excerpts.y + excerpts.height)
        expect(await purchases.first().getAttribute('href')).toBe(await purchases.last().getAttribute('href'))
      }
    }
  }
})
