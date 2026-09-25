import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('staged hash CSP permits hydration/navigation and blocks an unlisted inline script', async ({ page }) => {
  const headers = await readFile('out/_headers', 'utf8')
  await page.route('**/*', async route => {
    const request = route.request()
    if (!request.isNavigationRequest()) return route.continue()
    const path = new URL(request.url()).pathname
    const block = headers.split('\n\n').find(b => b.startsWith(path + '\n'))
    const policy = block?.match(/Content-Security-Policy-Report-Only: (.+)/)?.[1]
    const response = await route.fetch()
    return route.fulfill({ response, headers: { ...response.headers(), ...(policy ? { 'content-security-policy': policy } : {}) } })
  })
  await page.addInitScript(() => {
    window.cspViolations = []
    document.addEventListener('securitypolicyviolation', e => window.cspViolations.push(e.violatedDirective))
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('dialog').getByRole('link', { name: 'Contact' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => window.cspViolations)).toEqual([])
  await page.evaluate(() => {
    const script = document.createElement('script')
    script.textContent = 'window.unlistedScriptExecuted = true'
    document.body.appendChild(script)
  })
  await expect.poll(() => page.evaluate(() => window.cspViolations.length)).toBeGreaterThan(0)
  expect(await page.evaluate(() => window.unlistedScriptExecuted)).toBeUndefined()
})
