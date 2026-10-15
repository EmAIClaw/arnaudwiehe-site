import { test, expect } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`recording links land on local previews at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const external = []
    page.on('request', request => {
      if (/(^|\.)(youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com)$/.test(new URL(request.url()).hostname)) external.push(request.url())
    })
    await page.goto('/speaking/')
    const links = page.locator('.speaking-events-list a').filter({ hasText: 'Watch recording' })
    await expect(links).toHaveCount(2)
    for (const slug of ['reinvent-security-podcast', 'isaca-risk-event-2023']) {
      await page.goto('/speaking/')
      const link = page.locator(`a[href="/speaking/${slug}/#recording"]`)
      await expect(link).toHaveText('Watch recording →')
      await link.click()
      await expect(page).toHaveURL(new RegExp(`/speaking/${slug}/#recording$`))
      const video = page.locator('#recording')
      await expect(video).toBeVisible()
      await expect(video.locator('iframe')).toHaveCount(0)
      await expect(video.locator('img')).toHaveAttribute('src', /^\/images\/video-previews\//)
      await expect.poll(async () => video.evaluate(el => {
        const rect = el.getBoundingClientRect()
        const nav = document.querySelector('nav')?.getBoundingClientRect()
        return rect.top >= (nav?.bottom || 0) - 1 && rect.top < innerHeight
      })).toBe(true)
    }
    expect(external).toEqual([])
  })
}
