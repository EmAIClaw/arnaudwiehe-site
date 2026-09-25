import { test, expect } from '@playwright/test'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

async function accessibilityViolations(page) {
  await page.addScriptTag({ path: require.resolve('axe-core') })
  return page.evaluate(async () => {
    const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })
    return result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) }))
  })
}

test('representative templates meet automated WCAG AA checks', async ({ page }) => {
  test.setTimeout(120_000)
  for (const route of ['/', '/about/', '/contact/', '/privacy/', '/articles/', '/books/', '/books/the-book-on-cybersecurity/', '/speaking/', '/speaking/reinvent-security-podcast/', '/music/', '/articles/export-control-ai-models/']) {
    await page.goto(route)
    await expect.soft(await accessibilityViolations(page), route).toEqual([])
  }

})

test('privacy information is reachable from the contact form and footer', async ({ page }) => {
  await page.goto('/contact/')
  await expect(page.locator('form').getByRole('link', { name: 'Privacy notice' })).toHaveAttribute('href', '/privacy/')
  await expect(page.locator('footer').getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy/')
  await page.goto('/privacy/')
  await expect(page.getByRole('heading', { name: 'Privacy notice', exact: true })).toBeVisible()
  await expect(page.locator('main')).toContainText('Netlify')

})
