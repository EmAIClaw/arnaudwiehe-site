import { test, expect } from '@playwright/test'

test('book pages have a focused purchase action and overview retains a quiet contact link', async ({ page }) => {
  await page.goto('/books/')
  await expect(page.locator('main a').filter({ hasText: 'Explore the book' })).toHaveCount(3)
  const contact = page.locator('.books-contact-strip a')
  await expect(contact).toHaveAttribute('href', '/contact/')
  await expect(contact).not.toHaveClass(/btn-primary/)
  for (const slug of ['ai-governance-for-leaders', 'emerging-tech-emerging-threats', 'the-book-on-cybersecurity']) {
    await page.goto(`/books/${slug}/`)
    await expect(page.locator('.book-detail-actions a')).toHaveCount(1)
    await expect(page.locator('.book-detail-actions a')).toContainText('Buy on Amazon')
    await expect(page.locator('main').getByRole('link', { name: 'Get in Touch' })).toHaveCount(0)
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  }
})
