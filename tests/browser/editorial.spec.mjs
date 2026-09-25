import { test, expect } from '@playwright/test'

test('editorial output contains verified citations, no known broken links, and the current publication bio', async ({ page }) => {
  await page.goto('/articles/openclaw-email-agent-phishing-test/')
  await expect(page.locator('a[href="https://www.varonis.com/blog/openclaw-phishing"]')).toBeVisible()
  await expect(page.locator('.author-bio')).toContainText('The Book on Cybersecurity')
  await expect(page.locator('.author-bio')).toContainText('AI Governance for Leaders')
  await expect(page.locator('.author-bio')).not.toContainText('AI Governance Guide')
  await page.goto('/articles/prompt-injection-runtime-controls/')
  await expect(page.locator('a[href="https://blog.google/security/google-workspaces-continuous-approach-to-mitigating-indirect-prompt-injections/"]')).toBeVisible()
  await page.goto('/articles/trusted-feature-breach/')
  await expect(page.locator('a[href*="/pulse/next-ai-breach-may-not-hack"]')).toHaveCount(0)
})
