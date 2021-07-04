import { createMocks } from 'node-mocks-http'
// eslint-disable-next-line import/no-unresolved
import sitemapHandler from 'pages/api/sitemap'

describe('Sitemap  API endpoint', () => {
  test('Should return xml sitemap', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://oldicelandic.test'

    const { req, res } = createMocks()

    // Ensure response is blank.
    expect(res.finished).toBeFalsy()
    expect(res._headers).toEqual({}) // eslint-disable-line

    await sitemapHandler(req, res)

    // Ensure getServerSideProps modified response.
    expect(res.finished).toBeTruthy()
    expect(res._headers).toEqual({ 'content-type': 'text/xml' }) // eslint-disable-line

    expect(res._getData().includes('<?xml version="1.0" encoding="UTF-8"?>')).toBeTruthy() // eslint-disable-line
    expect(res._getData().includes('<url><loc>https://oldicelandic.test/word/spyrja</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>')).toBeTruthy() // eslint-disable-line
  })
})
