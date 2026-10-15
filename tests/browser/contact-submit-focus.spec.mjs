import { test, expect } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Send Message has a dark offset keyboard focus ring at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/contact/')
    const button = page.getByRole('button', { name: 'Send Message', exact: true })
    const before = await button.evaluate(e => ({ background: getComputedStyle(e).backgroundColor, color: getComputedStyle(e).color }))
    await page.locator('#message').focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
    await expect(button).toHaveCSS('outline-color', 'rgb(42, 36, 32)')
    await expect(button).toHaveCSS('outline-width', '3px')
    await expect(button).toHaveCSS('outline-style', 'solid')
    await expect(button).toHaveCSS('outline-offset', '4px')
    await expect(button).toHaveCSS('background-color', before.background)
    await expect(button).toHaveCSS('color', before.color)
    await expect(page.locator('.contact-form')).toHaveAttribute('method', 'POST')
    await expect(page.locator('.contact-form')).toHaveAttribute('action', '/contact/thanks/')
    await page.screenshot({ path: `/Users/ai/.hermes/profiles/ops/cache/scratch/contact-submit-focus-${width}.png`, fullPage: true })
    // Never activate Send or submit this form.
  })
}
