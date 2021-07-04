import type { NextApiRequest, NextApiResponse } from 'next'
import { getSitemapContent, formatSitemap } from 'lib/services/sitemap'
import { SitemapStream, streamToPromise } from 'sitemap'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const content = getSitemapContent()
  const sitemap = await formatSitemap(content, SitemapStream, streamToPromise)
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
}
