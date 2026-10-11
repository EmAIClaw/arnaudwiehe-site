import { test, expect } from '@playwright/test'

for (const width of [390,1280]) {
  test(`article search filters locally at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900})
    await page.goto('/articles/',{waitUntil:'networkidle'})
    const all = await page.locator('.article-list-card').evaluateAll(cards => cards.map(c=>({title:c.querySelector('h2').textContent, excerpt:c.querySelector('.article-excerpt').textContent})))
    const before=await page.locator('.article-list-card h2').allTextContents()
    const search=page.getByRole('searchbox',{name:'Search articles'})
    const requests=[]
    page.on('request',r=>requests.push(r.url()))
    for (const query of ['  GOVERNANCE  ',all[0].excerpt.trim().slice(0,35),'zzzz-no-such-article-zzzz']) {
      await search.fill(query)
      const expected=all.filter(c=>`${c.title} ${c.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())).map(c=>c.title)
      await expect(page.locator('.article-list-card:visible h2')).toHaveText(expected)
      await expect(page.getByRole('status')).toHaveText(expected.length ? `${expected.length} ${expected.length===1?'article':'articles'}`:'No matching articles')
    }
    await search.fill('')
    await expect(page.locator('.article-list-card:visible h2')).toHaveText(before)
    expect(requests.filter(u=>!u.startsWith('http://127.0.0.1:8187/'))).toEqual([])
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  })
}

test('archive remains complete without JavaScript',async ({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false})
  const page=await context.newPage()
  await page.goto('http://127.0.0.1:8187/articles/')
  expect(await page.locator('.article-list-card:visible').count()).toBe(await page.locator('.article-list-card').count())
  expect(await page.locator('.article-list-card').count()).toBeGreaterThan(0)

  await context.close()
})
