import { getAllWords } from 'lib/services/dictionary'
import { searchDictionary } from 'lib/services/search'
import { isArray } from 'volva'
import { hasProperty } from 'spyrjari'

describe('Search tests', () => {
  const dictionary = getAllWords()

  test('Returns array of results', () => {
    const result = searchDictionary('skilja', dictionary)

    expect(isArray(result)).toBeTruthy()
  })

  test('Results contain foundIn statement', () => {
    const result = searchDictionary('skilja', dictionary)

    result.forEach((entry) => {
      expect(hasProperty(entry, 'foundIn')).toBeTruthy()
    })
  })

  test('Returns results in correct formatting', () => {
    const result = searchDictionary('atskiljanligr', dictionary)

    const expected = {
      word: 'atskiljanligr',
      definitions: ['a. <i>various, different</i>.'],
      slug: 'atskiljanligr',
      foundIn: [
        'In headword: <mark>atskiljanligr</mark>',
      ],
    }

    expect(result[0]).toEqual(expected)
  })

  test('Finds results from descriptions', () => {
    const result = searchDictionary('útmakligt', dictionary)

    const expected = {
      word: 'a',
      definitions: [
        'a negative suffix to verbs, <i>not</i>;',
        'era útmakligt, <i>at it is not unmeet that</i>.',
      ],
      slug: 'a',
      foundIn: [
        'era <mark>útmakligt</mark>, <i>at it is not unmeet that</i>.',
      ],
    }

    expect(result[0]).toEqual(expected)
  })

  test('Finds results from slug', () => {
    const result = searchDictionary('afarúðigr', dictionary)

    const expected = {
      word: 'afarúðigr',
      definitions: ['a. <i>overbearing</i>.'],
      slug: 'afarudigr',
      foundIn: [
        'In headword: <mark>afarúðigr</mark>',
      ],
    }

    expect(result[0]).toEqual(expected)
  })
})
