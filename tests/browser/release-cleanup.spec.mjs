import { test, expect } from '@playwright/test'

test('About agrees with launch credentials and publications', async ({page}) => {
  await page.goto('/about/')
  await expect(page.locator('.about-page-bio')).toContainText('three books')
  await expect(page.locator('.about-page-bio')).toContainText('CFE')
  await expect(page.locator('.about-page-bio')).toContainText('AI Governance for Leaders')
})

test('long article citations fit mobile screens', async ({page}) => {
  await page.setViewportSize({width:390,height:844})
  await page.goto('/articles/prompt-injection-runtime-controls/')
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('retired tools have no static route or form artifact', async ({request}) => {
  expect((await request.get('/ai-assessment/')).status()).toBe(404)
  expect((await request.get('/ai-assessment-form.html')).status()).toBe(404)
})
