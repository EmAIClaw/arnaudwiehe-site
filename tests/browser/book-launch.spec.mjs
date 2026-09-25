import { test, expect } from '@playwright/test'

test('launch book listing and detail use the supplied Amazon URL', async ({ page }) => {
  await page.goto('/books/')
  const card = page.locator('.book-launch-feature')
  await expect(card).toContainText('AI Governance for Leaders')
  await expect(card).toContainText('scaling responsible AI across the organisation.')
  await card.getByRole('link', { name: 'Explore the book' }).click()
  await expect(page).toHaveURL(/books\/ai-governance-for-leaders\//)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AI Governance for Leaders')
  await expect(page.getByText('Amazon link coming soon')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Buy on Amazon' })).toHaveAttribute('href', 'https://www.amazon.com/AI-GOVERNANCE-LEADERS-COMPETITIVE-ADVANTAGE/dp/B0HKLDGF3R')
  await expect(page.getByRole('heading', { name: 'What Readers Are Saying' })).toHaveCount(0)
  await expect(page.locator('.book-toc-item')).toHaveCount(9)
  await expect(page.locator('.book-excerpt-card')).toHaveCount(3)
  await expect(page.locator('.book-description')).toHaveCount(3)
  const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent)).find(s => s['@type'] === 'Book'))
  expect(schema.identifier.value).toBe('B0HKLDGF3R')
  expect(schema.sameAs).toBe('https://www.amazon.com/AI-GOVERNANCE-LEADERS-COMPETITIVE-ADVANTAGE/dp/B0HKLDGF3R')
  expect(await page.locator('.books-page-cover').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.goto('/books/the-book-on-cybersecurity/')
  await expect(page.getByRole('link', { name: 'Buy on Amazon' })).toHaveAttribute('href', 'https://www.amazon.com/dp/B0C2SCKX7J')
})
