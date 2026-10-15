import { test, expect } from '@playwright/test'

for (const javaScriptEnabled of [true, false]) {
  test(`contact input hints preserve native validation (JS ${javaScriptEnabled})`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled, viewport: { width: 390, height: 844 } })
    const page = await context.newPage()
    await page.goto('/contact/')
    const name = page.locator('#name')
    const email = page.locator('#email')
    await expect(name).toHaveAttribute('autocomplete', 'name')
    await expect(email).toHaveAttribute('type', 'email')
    await expect(email).toHaveAttribute('autocomplete', 'email')
    await expect(email).toHaveAttribute('inputmode', 'email')
    await expect(email).toHaveAttribute('autocapitalize', 'none')
    await expect(email).toHaveAttribute('spellcheck', 'false')
    await expect(page.locator('input[type="tel"]')).toHaveCount(0)
    await expect(page.locator('input[name="bot-field"]')).toHaveAttribute('autocomplete', 'off')
    expect(await email.evaluate(el => el.validity.valueMissing)).toBe(true)
    await email.fill('not-an-email')
    expect(await email.evaluate(el => el.validity.typeMismatch)).toBe(true)
    await email.fill('reader@example.com')
    expect(await email.evaluate(el => el.checkValidity())).toBe(true)
    await expect(page.locator('form[name="contact"]')).toHaveAttribute('method', 'POST')
    await expect(page.locator('form[name="contact"]')).toHaveAttribute('action', '/contact/thanks/')
    await context.close()
  })
}
