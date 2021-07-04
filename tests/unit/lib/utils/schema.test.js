import { getSchema } from 'lib/utils/schema'

describe('Schema structure tests', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://oldicelandic.test'

  const words = [
    {
      word: 'kesti',
      definitions: [
        'from köstr, <i>pile</i>.',
      ],
      slug: 'kesti',
    },
    {
      word: 'ketilhadda',
      definitions: [
        'f. <i>kettle-handle</i>.',
      ],
      slug: 'ketilhadda',
    },
  ]

  test('Handles "word" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'DefinedTerm',
        '@id': 'https://oldicelandic.test/word/ketilhadda',
        name: 'Old Icelandic Dictionary - Ketilhadda',
        description: 'f. kettle-handle.',
        inDefinedTermSet: 'https://oldicelandic.test',
      },
    )

    const result = getSchema(words[1], 'word')

    expect(result).toEqual(expected)
  })

  test('Handles "letter" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'DefinedTermSet',
        '@id': 'https://oldicelandic.test/letter/k',
        name: 'Old Icelandic Dictionary - Letter K',
        description: 'Old Icelandic words starting with letter K',
      },
    )

    const result = getSchema(words, 'letter')

    expect(result).toEqual(expected)
  })

  test('Handles "breadcrumbs" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'First breadcrumb',
            item: 'https://oldicelandic.test/first-link',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Second breadcrumb',
            item: 'https://oldicelandic.test/second-link',
          },
        ],
      },
    )

    const breadcrumbs = [
      {
        label: 'First breadcrumb',
        url: '/first-link',
      },
      {
        label: 'Second breadcrumb',
        url: '/second-link',
      },
    ]
    const result = getSchema(breadcrumbs, 'breadcrumbs')

    expect(result).toEqual(expected)
  })

  test('Handles "default" Schema', () => {
    const expected = JSON.stringify(
      {
        '@context': 'https://schema.org/',
        '@type': 'DefinedTermSet',
        '@id': 'https://oldicelandic.test',
        name: 'Old Icelandic Dictionary',
        description: 'Old Icelandic words with English definitions',
      },
    )

    const result = getSchema()

    expect(result).toEqual(expected)
  })
})
