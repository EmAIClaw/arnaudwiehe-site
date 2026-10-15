import { test, expect } from '@playwright/test'

test('approved citations link to exact official sources in static article bodies', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/articles/iso-42001-compliance-final/')
  const body = page.locator('.article-body')
  await expect(body.getByRole('link', { name: 'EU AI Act (Regulation 2024/1689)', exact: true })).toHaveAttribute('href', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng')
  await expect(body.getByRole('link', { name: 'NIST AI Risk Management Framework 1.0 (January 2023)', exact: true })).toHaveAttribute('href', 'https://www.nist.gov/itl/ai-risk-management-framework')
  await expect(body.locator('a[href*="iso.org"]')).toHaveCount(0)
  await page.goto('/articles/agent-governance-kill-switch/')
  const owasp = page.locator('.article-body').getByRole('link', { name: 'OWASP’s Top 10 for Agentic Applications 2026', exact: true })
  await expect(owasp).toHaveCount(1)
  await expect(owasp).toHaveAttribute('href', 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026')
  await context.close()
})
