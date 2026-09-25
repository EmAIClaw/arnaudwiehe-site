import { test, expect } from '@playwright/test'

test('homepage highlights the 2026 talks and omits 2023 talk listings', async ({ page }) => {
  await page.goto('/')
  const list = page.locator('.engagements-list')
  await expect(list.locator('.engagement-row').first()).toContainText('2026')
  await expect(list.locator('a[href="/speaking/gitex-europe-berlin-2026/"]')).toHaveCount(1)
  await expect(list.locator('a[href="/speaking/next-it-security-benelux-2026/"]')).toHaveCount(1)
  await expect(list).not.toContainText('2023')
  await expect(list.locator('.engagement-row')).toHaveCount(5)
  await list.locator('a[href="/speaking/gitex-europe-berlin-2026/"]').click()
  await expect(page.getByRole('heading', {level: 1})).toContainText('GITEX Europe')
  await page.goto('/speaking/next-it-security-benelux-2026/')
  await expect(page.getByRole('heading', {level: 1})).toContainText('Next IT Security')
})
