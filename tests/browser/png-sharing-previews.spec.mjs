import { test, expect } from '@playwright/test'

for (const slug of ['ai-governance-cybersecurity', 'boards-cyber-agenda-2026']) {
  test(`${slug} uses PNG sharing metadata while retaining its visible SVG`, async ({ page }) => {
    await page.goto(`/articles/${slug}/`)
    const url = `https://arnaudwiehe.com/images/sharing/${slug}.png`
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', url)
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', url)
    await expect(page.locator(`img[src="/images/articles/${slug}.svg"]`)).toHaveCount(1)
  })
}
