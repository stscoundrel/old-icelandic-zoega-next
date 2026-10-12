import { getSitemapContent, formatSitemap } from 'lib/services/sitemap'
import { readFileSync } from 'node:fs'

const readEntries = (xml) => {
  const document = new DOMParser().parseFromString(xml, 'application/xml')
  expect(document.querySelector('parsererror')).toBeNull()
  expect(document.documentElement.localName).toBe('urlset')
  expect(document.documentElement.namespaceURI).toBe(
    'http://www.sitemaps.org/schemas/sitemap/0.9',
  )
  return Array.from(document.querySelectorAll('url')).map((entry) => ({
    url: entry.querySelector('loc')?.textContent,
    changefreq: entry.querySelector('changefreq')?.textContent,
    priority: Number(entry.querySelector('priority')?.textContent),
  }))
}

describe('Sitemap tests', () => {
  beforeAll(() => {
    // Node streams need their real scheduling APIs.
    jest.useRealTimers()
    process.env.NEXT_PUBLIC_SITE_URL = 'https://old-icelandic.vercel.app'
  })

  test('Generates XML containing every dictionary and letter entry', async () => {
    const content = getSitemapContent()
    const entries = readEntries(await formatSitemap(content))
    expect(entries).toEqual(content)
    expect(entries).toContainEqual({
      url: 'https://old-icelandic.vercel.app/word/skilja',
      changefreq: 'monthly',
      priority: 0.5,
    })
  }, 5000)

  test('Public sitemap contains the current dictionary and letter entries', () => {
    const xml = readFileSync(
      `${__dirname}/../../../../public/sitemap.xml`,
      'utf8',
    )
    expect(readEntries(xml)).toEqual(getSitemapContent())
  })
})
