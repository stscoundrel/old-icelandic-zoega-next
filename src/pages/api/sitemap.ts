import type { NextApiRequest, NextApiResponse } from 'next'
import { getSitemapContent, formatSitemap } from 'lib/services/sitemap'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const content = getSitemapContent()
  const sitemap = await formatSitemap(content)
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
}
