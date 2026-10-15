import { test, expect } from '@playwright/test'

const pairings = {
  'openclaw-email-agent-phishing-test': ['agent-governance-kill-switch', 'ai-agent-debt'],
  'ai-agent-debt': ['ai-governance-is-about-visibility', 'agent-governance-kill-switch'],
  'agent-governance-kill-switch': ['openclaw-email-agent-phishing-test', 'ai-agent-debt'],
  'ai-governance-is-about-visibility': ['ai-agent-debt', 'ai-governance-journey'],
  'ai-governance-journey': ['ai-governance-is-about-visibility', 'iso-42001-compliance-final'],
}

for (const width of [390, 1280]) {
  test(`approved related reading is accessible and correctly placed at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width, height: 900 } })
    const page = await context.newPage()
    for (const [slug, targets] of Object.entries(pairings)) {
      await page.goto(`/articles/${slug}/`)
      const section = page.getByRole('region', { name: 'Related reading', exact: true })
      await expect(section).toBeVisible()
      const links = section.getByRole('link')
      await expect(links).toHaveCount(2)
      for (const [i, target] of targets.entries()) {
        await expect(links.nth(i)).toHaveAttribute('href', `/articles/${target}/`)
        const title = await links.nth(i).textContent()
        const destination = await context.newPage()
        const response = await destination.goto(`/articles/${target}/`)
        expect(response.status()).toBe(200)
        await expect(destination.locator('.article-header h1')).toHaveText(title)
        await destination.close()
      }
      expect(await section.evaluate(el => {
        const before = document.querySelector('.article-book-note') || document.querySelector('.article-body')
        const share = document.querySelector('.share-section')
        return Boolean(before.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) &&
          (!share || Boolean(el.compareDocumentPosition(share) & Node.DOCUMENT_POSITION_FOLLOWING))
      })).toBe(true)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await page.goto('/articles/iso-42001-compliance-final/')
    await expect(page.getByRole('region', { name: 'Related reading', exact: true })).toHaveCount(0)
    await context.close()
  })
}
