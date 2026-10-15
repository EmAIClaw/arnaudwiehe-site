import { test, expect } from '@playwright/test'

for (const viewport of [{width:1280,height:720},{width:390,height:844},{width:320,height:740}]) {
  test(`homepage approved actions at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const hero = page.locator('.hero-section')
    await expect(hero.locator('.hero-tagline')).toHaveText('Helping boards and executives navigate AI governance, cybersecurity, and emerging technology risk.')
    const book = hero.getByRole('link', {name:'Explore the latest book'})
    const speaking = hero.getByRole('link', {name:'Enquire about speaking'})
    await expect(book).toHaveAttribute('href','/books/ai-governance-for-leaders/')
    await expect(speaking).toHaveAttribute('href','/contact/?subject=speaking')
    for (const link of [book,speaking]) {
      const box = await link.boundingBox()
      expect(box.y).toBeGreaterThan(0)
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({path:`/Users/ai/.hermes/profiles/ops/cache/scratch/home-change8-${viewport.width}.png`})
    await book.click()
    await expect(page).toHaveURL(/\/books\/ai-governance-for-leaders\/?$/)
    await page.goBack()
    await speaking.click()
    await expect(page).toHaveURL(/\/contact\/\?subject=speaking$/)
  })
}
