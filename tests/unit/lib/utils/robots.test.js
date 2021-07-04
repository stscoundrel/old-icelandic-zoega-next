import { getRobots } from 'lib/utils/robots'

describe('Robots.txt util', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://oldicelandic.test'

  test('Contains link to sitemap.xml', () => {
    const expected = 'Sitemap: https://oldicelandic.test/sitemap.xml'

    const result = getRobots()

    expect(result.includes(expected)).toBeTruthy()
  })
})
