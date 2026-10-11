import { test, expect } from '@playwright/test'

for (const route of ['/speaking/','/speaking/reinvent-security-podcast/','/speaking/isaca-risk-event-2023/','/music/']) {
  test(`video previews stay local until Play: ${route}`, async ({page}) => {
    const requests = []
    const isVideoHost = url => /(^|\.)(youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com)$/.test(new URL(url).hostname)
    page.on('request', request => { if(isVideoHost(request.url())) requests.push(request.url()) })
    await page.goto(route,{waitUntil:'networkidle'})
    const previews=page.locator('.youtube-embed-thumbnail')
    expect(await previews.count()).toBeGreaterThan(0)
    for(const preview of await previews.all()) {
      await preview.scrollIntoViewIfNeeded()
      await expect(preview).toHaveAttribute('src',/^\/images\/video-previews\//)
      await expect.poll(() => preview.evaluate(img => img.complete && img.naturalWidth === 1280)).toBe(true)
    }
    expect(requests).toEqual([])
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0)
    await expect(page.locator('link[rel="preconnect"][href*="youtube"],link[rel="dns-prefetch"][href*="youtube"]')).toHaveCount(0)
    await page.locator('.youtube-embed-link').first().click()
    await expect(page.locator('iframe[src*="youtube-nocookie.com/embed/"]')).toHaveCount(1)
    await expect.poll(() => requests.some(url=>url.includes('youtube-nocookie.com/embed/'))).toBe(true)
  })
}
