import { test, expect } from '@playwright/test'

test('approved external-link cleanups are present without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/contact/')
  await expect(page.locator('a[href="https://linkedin.com/in/arnaudwiehe"]')).toHaveCount(0)
  expect(await page.locator('a[href="https://www.linkedin.com/in/arnaudwiehe"]').count()).toBeGreaterThan(0)
  await page.goto('/articles/prompt-injection-runtime-controls/')
  await expect(page.locator('a[href="https://blog.google/security/prompt-injections-web/"]')).toHaveCount(1)
  await expect(page.locator('a[href="https://security.googleblog.com/2026/04/ai-threats-in-wild-current-state-of.html"]')).toHaveCount(0)
  await context.close()
})
