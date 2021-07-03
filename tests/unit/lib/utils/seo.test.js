import { getSeo } from 'lib/utils/seo'

describe('SEO / meta tags tests', () => {
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
    {
      word: 'ketilhrím',
      definitions: [
        'n. <i>kettle-grime, soot</i>.',
      ],
      slug: 'ketilhrim',
    },
    {
      word: 'ketill',
      definitions: [
        '(dat. katli, pl. katlar), m. <i>kettle, pot, cauldron</i> (í eldahúsinu var eldr mikill ok katlar yfir).',
      ],
      slug: 'ketill',
    },
    {
      word: 'ketiltak',
      definitions: [
        'n. <i>taking a hot stone out of a boiling kettle</i> (as an ordeal).',
      ],
      slug: 'ketiltak',
    },
    {
      word: 'ketlingr',
      definitions: [
        '(-s, -ar), m. <i>kitten</i>.',
      ],
      slug: 'ketlingr',
    },
  ]

  test('Handles "word" seo fields', () => {
    const expected = {
      title: 'Old Icelandic Dictionary - Kesti',
      description: 'Meaning of Old Icelandic word "kesti"',
    }

    const result = getSeo(words[0], 'word')

    expect(result).toEqual(expected)
  })

  test('Handles "letter" seo fields', () => {
    const expected = {
      title: 'Old Icelandic words starting with letter K',
      description: 'Meanings of Old Icelandic words starting with "K", such as kesti, ketilhadda, ketilhrím and ketill',
    }

    const result = getSeo(words, 'letter')

    expect(result).toEqual(expected)
  })

  test('Handles default response', () => {
    const expected = {
      title: 'Old Icelandic Dictionary - Geir Zoëga',
      description: 'A Concise Dictionary of Old Icelandic - 29 000 words',
    }

    const result = getSeo()

    expect(result).toEqual(expected)
  })
})
