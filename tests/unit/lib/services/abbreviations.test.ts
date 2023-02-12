import {
  getAbbreviations,
  addAbbreviationsToContent,
} from 'lib/services/abbreviations'

describe('Abbreviations tests', () => {
  const entry = {
    word: 'leynidyrr',
    definitions: [
      'f. pl. <i>secret door</i>.',
    ],
    slug: 'leynidyrr',
  }

  test('Abbreviations have expected content', () => {
    const result = getAbbreviations(entry)

    const expected = [
      {
        abbreviation: 'f.',
        explanation: 'feminine.',
      },
      {
        abbreviation: 'pl.',
        explanation: 'plural.',
      },
    ]

    expect(result).toEqual(expected)
  })

  test('Adds abbr tags to content', () => {
    const abbreviations = getAbbreviations(entry)

    const result = addAbbreviationsToContent(entry.definitions[0], abbreviations)
    const expected = '<abbr title="feminine.">f.</abbr> <abbr title="plural.">pl.</abbr> <i>secret door</i>.'

    expect(result).toEqual(expected)
  })
})
