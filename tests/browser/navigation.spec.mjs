import { test, expect } from '@playwright/test'

test('mobile menu manages expanded state, focus, Escape and background interaction', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Open navigation menu' })
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' })
  await expect(dialog).toBeVisible()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(dialog.getByRole('button', { name: 'Close menu' })).toBeFocused()
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await dialog.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about\//)
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.locator('h1')).toBeVisible()
})

test('mobile navigation remains usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:8187/')
  const fallback = page.getByRole('navigation', { name: 'Navigation without JavaScript' })
  await expect(fallback).toBeVisible()
  await fallback.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page.locator('h1')).toBeVisible()
  await context.close()
})
