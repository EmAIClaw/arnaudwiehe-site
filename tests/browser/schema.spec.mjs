import { test, expect } from '@playwright/test'

async function schema(page, route, type) {
  await page.goto(route)
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts, type) => scripts.map(s => JSON.parse(s.textContent)).find(s => s['@type'] === type), type)
}

test('book metadata uses typed ASINs and separate people, not invented ISBNs or edition facts', async ({ page }) => {
  const book = await schema(page, '/books/emerging-tech-emerging-threats/', 'Book')
  expect(book.isbn).toBeUndefined()
  expect(book.identifier).toEqual({ '@type': 'PropertyValue', propertyID: 'ASIN', value: 'B0CXXL8W58' })
  expect(book.author.map(person => person.name)).toEqual(['Arnaud Wiehe', 'Tiago Teles'])
  expect(book.numberOfPages).toBeUndefined()
  expect(book.bookFormat).toBeUndefined()
})

test('speaking schema does not turn month-only records into exact dates or speakers into organizers', async ({ page }) => {
  const event = await schema(page, '/speaking/gitex-europe-berlin-2026/', 'Event')
  expect(event.startDate).toBeUndefined()
  expect(event.organizer).toBeUndefined()
  const exactEvent = await schema(page, '/speaking/gitex-global-dubai-2025/', 'Event')
  expect(exactEvent.startDate).toBe('2025-10-14')
})
