import { test, expect } from '@playwright/test'

test('mobile article hero selects the small source and preserves its actual aspect ratio', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/articles/export-control-ai-models/')
  const image = page.locator('.article-hero-image')
  await expect(image).toHaveAttribute('width', '1280')
  await expect(image).toHaveAttribute('height', '960')
  await expect.poll(() => image.evaluate(img => img.currentSrc)).toContain('export-control-ai-models-640.webp')
  expect(await image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
})
