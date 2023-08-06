import {
  DictionaryEntry,
} from 'lib/services/dictionary'
import {
  getCrossLinks,
} from 'lib/services/crosslinks'

// Entry which does not produce crosslink matches.
const entry1: DictionaryEntry = {
  word: '',
  definitions: [],
  slug: 'lorem-ipsum',
}

// Dummy entry which produces cross links
const entry2: DictionaryEntry = {
  word: '',
  definitions: [],
  slug: 'aaustr',

}

describe('Crosslinks service tests', () => {
  test('Returns empty list when no crosslinks results', () => {
    const result = getCrossLinks(entry1)
    expect(result.length).toEqual(0)
  })

  test('Returns crosslinks when slugs match', () => {
    const expected = [
      // Should omit link to old-icelandic dictionary, as it would be self-referencing.
      {
        url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/a-austr',
        source: 'old-norse',
      },
      {
        url: 'https://old-norwegian-dictionary.vercel.app/word/aaustr',
        source: 'old-norwegian',
      },
    ].sort((a, b) => (a.source > b.source ? 1 : -1))

    const result = getCrossLinks(entry2).sort((a, b) => (a.source > b.source ? 1 : -1))

    expect(result).toEqual(expected)
  })
})
