import { test, expect } from '@playwright/test'

for (const javaScriptEnabled of [true, false]) {
  for (const width of [390, 1280]) {
    test(`contact fields have visible boundaries before focus at ${width}px (JS ${javaScriptEnabled})`, async ({ browser, baseURL }, testInfo) => {
      const context = await browser.newContext({ baseURL, javaScriptEnabled, viewport: { width, height: 1000 } })
      try {
        const page = await context.newPage()
        await page.goto('/contact/')
        const fields = page.locator('.contact-form-input, .contact-form-textarea')
        await expect(fields).toHaveCount(4)
        const measurements = await fields.evaluateAll(elements => {
          const root = getComputedStyle(document.documentElement)
          const canvas = document.createElement('canvas').getContext('2d')
          const luminance = value => {
            canvas.fillStyle = value.trim()
            const color = canvas.fillStyle
            const rgb = color.startsWith('#')
              ? color.slice(1).match(/../g).map(v => parseInt(v, 16))
              : color.match(/[\d.]+/g).slice(0, 3).map(Number)
            const linear = rgb.map(v => { const n = v / 255; return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4 })
            return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
          }
          const ratio = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
          return elements.map(el => {
            const css = getComputedStyle(el)
            return {
              id: el.id,
              focused: document.activeElement === el,
              border: css.borderTopColor,
              style: css.borderTopStyle,
              width: parseFloat(css.borderTopWidth),
              contrast: Math.min(...[css.backgroundColor, root.getPropertyValue('--warm-50'), root.getPropertyValue('--warm-100')].map(bg => ratio(css.borderTopColor, bg))),
            }
          })
        })
        console.log(JSON.stringify({ width, javaScriptEnabled, measurements }))
        for (const field of measurements) {
          expect(field.focused).toBe(false)
          expect(field.style).toBe('solid')
          expect(field.width).toBeGreaterThanOrEqual(1)
          expect(field.contrast, `${field.id}: unfocused boundary contrast`).toBeGreaterThanOrEqual(3)
        }
        if (javaScriptEnabled) {
          await page.locator('.contact-form-card').screenshot({ path: testInfo.outputPath(`contact-${width}.png`) })
        }
        await page.locator('#name').focus()
        await page.keyboard.press('Tab')
        await expect(page.locator('#email')).toBeFocused()
        expect(await page.locator('#email').evaluate(el => parseFloat(getComputedStyle(el).outlineWidth))).toBeGreaterThanOrEqual(2)
      } finally {
        await context.close()
      }
    })
  }
}
