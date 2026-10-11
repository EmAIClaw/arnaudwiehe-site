import { test, expect } from '@playwright/test'

const approved = ['ai-governance-is-about-visibility','ai-governance-journey','ai-governance-cybersecurity','iso-42001-compliance-final','ai-agent-debt']
test('only approved articles offer the book before LinkedIn', async ({page}) => {
  for (const width of [390,1280]) {
    await page.setViewportSize({width,height:900})
    for(const slug of approved) {
      await page.goto(`/articles/${slug}/`)
      const note=page.locator('.article-book-note')
      await expect(note).toHaveText('Explore further: AI Governance for Leaders — a practical guide for boards and executives.')
      await expect(note.locator('a')).toHaveAttribute('href','/books/ai-governance-for-leaders/')
      if (await page.locator('.share-section').count()) {
        expect(await note.evaluate(e => Boolean(e.compareDocumentPosition(document.querySelector('.share-section')) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
      }
      expect(await note.evaluate(e => Boolean(document.querySelector('.article-body').compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
    }
  }
  await page.locator('.article-book-note a').click()
  await expect(page).toHaveURL(/\/books\/ai-governance-for-leaders\/$/)
  await page.goto('/articles/openclaw-email-agent-phishing-test/')
  await expect(page.locator('.article-book-note')).toHaveCount(0)
})
