import { capitalize, removeHTML } from 'lib/utils/strings'
import { slugifyLetter } from 'lib/utils/slugs'
import { getWordLink, getLetterLink } from 'lib/utils/links'

const getDefinedTermSetData = (content) => {
  const letter = {
    letter: content[0].word.charAt(0),
    slug: slugifyLetter(content[0].word.charAt(0)),
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'DefinedTermSet',
    '@id': getLetterLink(letter),
    name: removeHTML(`Old Icelandic Dictionary - Letter ${letter.letter.toUpperCase()}`),
    description: removeHTML(`Old Icelandic words starting with letter ${letter.letter.toUpperCase()}`),
  }
}

const getDefinedTermData = (content) => ({
  '@context': 'https://schema.org/',
  '@type': 'DefinedTerm',
  '@id': getWordLink(content),
  name: removeHTML(`Old Icelandic Dictionary - ${capitalize(content.word)}`),
  description: removeHTML(content.definitions[0]),
  inDefinedTermSet: process.env.NEXT_PUBLIC_SITE_URL,
})

const getBreadcrumbListData = (content) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  const listItems = content.map(({ label, url }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: label,
    item: siteUrl + url,
  }))

  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  }
}

const getDefault = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return {
    '@context': 'https://schema.org/',
    '@type': 'DefinedTermSet',
    '@id': `${siteUrl}`,
    name: 'Old Icelandic Dictionary',
    description: 'Old Icelandic words with English definitions',
  }
}

/**
 * Get schema.org JSON-LD by type.
 */
export const getSchema = (content, type) => {
  if (type === 'word') {
    const data = getDefinedTermData(content)

    return JSON.stringify(data)
  }

  if (type === 'letter') {
    const termSet = getDefinedTermSetData(content)
    return JSON.stringify(termSet)
  }

  if (type === 'breadcrumbs') {
    const data = getBreadcrumbListData(content)

    return JSON.stringify(data)
  }

  const data = getDefault()
  return JSON.stringify(data)
}

export default getSchema
