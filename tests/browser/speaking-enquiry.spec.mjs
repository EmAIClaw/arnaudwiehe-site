import { test, expect } from '@playwright/test'

test('speaking CTA prefills an editable subject without changing delivery', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Enquire about speaking', exact: true }).click()
  await expect(page).toHaveURL(/\/contact\/\?subject=speaking$/)
  const subject = page.getByLabel('Subject', { exact: true })
  await expect(subject).toHaveValue('Speaking engagement')
  await subject.fill('Speaking at our leadership event')
  await expect(subject).toHaveValue('Speaking at our leadership event')
  await subject.fill('')
  await expect(subject).toHaveValue('')
  await expect(page.locator('form[name="contact"]')).toHaveAttribute('method', 'POST')
  await expect(page.locator('form[name="contact"]')).toHaveAttribute('action', '/contact/thanks/')
  await expect(page.locator('input[name="form-name"]')).toHaveValue('contact')
  await expect(page.locator('input[name="bot-field"]')).toHaveCount(1)
  await page.reload()
  await expect(subject).toHaveValue('Speaking engagement')
})

test('ordinary and unrecognised enquiry links keep the subject empty', async ({ page }) => {
  for (const url of ['/contact/', '/contact/?subject=unrecognised']) {
    await page.goto(url)
    await expect(page.getByLabel('Subject', { exact: true })).toHaveValue('')
  }
})

test('contact form remains usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/contact/?subject=speaking')
  await expect(page.getByLabel('Subject', { exact: true })).toBeVisible()
  await page.getByLabel('Subject', { exact: true }).fill('Speaking engagement')
  await expect(page.getByLabel('Subject', { exact: true })).toHaveValue('Speaking engagement')
  await expect(page.getByRole('button', { name: 'Send Message' })).toBeEnabled()
  await context.close()
})
