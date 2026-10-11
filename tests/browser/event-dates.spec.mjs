import { test, expect } from '@playwright/test'

test('verified dates preserve both Benelux appearances and conference range', async ({page}) => {
  const cases = [
    ['next-it-security-benelux-2026','16 April 2026','Past','2026-04-16'],
    ['next-it-security-benelux-november-2026','12 November 2026','Upcoming','2026-11-12'],
    ['next-it-security-benelux-2024','14 November 2024','Past','2024-11-14'],
    ['next-it-security-c-suite-stockholm-2024','14 March 2024','Past','2024-03-14'],
    ['isaca-risk-event-2023','16 November 2023','Past','2023-11-16'],
    ['gitex-europe-berlin-2026','30 June–1 July 2026','Past','2026-06-30'],
  ]
  for (const width of [390,1280]) {
    await page.setViewportSize({width,height:900})
    for (const [slug,date,status,start] of cases) {
      await page.goto(`/speaking/${slug}/`)
      await expect(page.locator('.speaking-event-hero-year')).toHaveText(date)
      await expect(page.locator('.speaking-event-status')).toHaveText(status)
      const event = await page.locator('script[type="application/ld+json"]').evaluateAll(ss => ss.map(s => JSON.parse(s.textContent)).find(s => s['@type']==='Event'))
      expect(event.startDate).toBe(start)
      if(slug==='gitex-europe-berlin-2026') expect(event.endDate).toBe('2026-07-01')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await page.goto('/speaking/')
    for (const [,date] of cases) await expect(page.getByText(date,{exact:true})).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
