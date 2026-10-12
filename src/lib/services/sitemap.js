import { Readable } from 'node:stream'
import { SitemapStream, streamToPromise } from 'sitemap'
import { getAllWords, getAlphabet } from 'lib/services/dictionary'
import { getWordLink, getLetterLink } from 'lib/utils/links'

const formatWords = (words) =>
  words.map((word) => ({
    url: getWordLink(word),
    changefreq: 'monthly',
    priority: 0.5,
  }))

const formatLetters = (letters) =>
  letters.map((letter) => ({
    url: getLetterLink(letter),
    changefreq: 'monthly',
    priority: 0.5,
  }))

export const formatSitemap = (content) => {
  const stream = new SitemapStream({
    hostname: process.env.NEXT_PUBLIC_SITE_URL,
  })
  return streamToPromise(Readable.from(content).pipe(stream)).then((data) =>
    data.toString(),
  )
}

export const getSitemapContent = () => {
  const words = formatWords(getAllWords())
  const letters = formatLetters(getAlphabet())

  return [...words, ...letters]
}

export default {
  formatSitemap,
  getSitemapContent,
}
