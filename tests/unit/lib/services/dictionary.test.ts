import { getDictionary } from 'old-icelandic-zoega'
import { isArray } from 'volva'
import { matchesSchema } from 'jafningjar'
import {
  getAllWords, getByLetter, getWord, getAlphabet,
} from 'lib/services/dictionary'

describe('Dictionary tests', () => {
  const dictionary = getAllWords()

  test('Gets array of words', () => {
    expect(isArray(dictionary)).toBeTruthy()
  })

  test('Dictionary is not identical with original source.', () => {
    const originalDictionary = getDictionary()

    expect(originalDictionary).not.toMatchObject(dictionary)
  })

  test('Dictionary has added url slugs to source', () => {
    dictionary.forEach((entry) => {
      expect(Object.keys(entry)).toEqual(['word', 'definitions', 'slug'])
    })
  })

  test('Dictionary slugs are unique', () => {
    const slugs = new Set()

    dictionary.forEach((entry) => {
      slugs.add(entry.slug)
    })

    expect(slugs.size).toEqual(dictionary.length)
  })

  test('Dictionary gets words by letter', () => {
    const aWords = getByLetter('A')
    const þWords = getByLetter('þ')

    expect(aWords.length).toBe(1679)
    expect(þWords.length).toBe(918)

    aWords.forEach((entry) => {
      expect(entry.word.charAt(0).toLowerCase()).toBe('a')
    })

    þWords.forEach((entry) => {
      expect(entry.word.charAt(0).toLowerCase()).toBe('þ')
    })
  })

  test('Dictionary gets individual words by slug', () => {
    const word1 = getWord('aflsmadr')
    const word2 = getWord('karlfjoldi')
    const word3 = getWord('keppa')

    expect(word1.word.toLowerCase()).toBe('aflsmaðr')
    expect(word1.slug).toBe('aflsmadr')
    expect(word1.definitions).toEqual(['m. <i>strong man</i>.'])

    expect(word2.word.toLowerCase()).toBe('karlfjöldi')
    expect(word2.slug).toBe('karlfjoldi')
    expect(word2.definitions).toEqual(['m. <i>multitude of male persons</i>.'])

    expect(word3.word.toLowerCase()).toBe('keppa')
    expect(word3.slug).toBe('keppa')
    expect(word3.definitions).toEqual([
      '(-ta, -t), v. <i>to contend, strive hard</i>;',
      '~ um e-t, <i>to contend for or about a thing</i>;',
      '~ við e-n, <i>to contend with one</i>;',
      'refl., ~st, <i>to exert oneself</i>;',
      '~ við e-n, <i>to contend with or against one</i>;',
      '~ til e-s or um e-t, <i>to strive after, contend for a thing</i>.',
    ])
  })

  test('Dictionary gets alphabet constants with slugs', () => {
    const alphabet = getAlphabet()

    const expected = {
      letter: '',
      slug: '',
    }

    alphabet.forEach((entry) => {
      expect(matchesSchema(entry, expected)).toBeTruthy()
    })
  })

  test('Alphabet does not contain invalid chars.', () => {
    const alphabet = getAlphabet()
    const invalids = ['ǫ', 'ø']

    alphabet.forEach((letter) => {
      expect(invalids.includes(letter.letter)).toBeFalsy()
    })
  })

  test('Alphabet contains added ö letter.', () => {
    const alphabet = getAlphabet()
    let foundÖ = false

    alphabet.forEach((letter) => {
      if (letter.letter === 'ö') {
        foundÖ = true
      }
    })

    expect(foundÖ).toBeTruthy();
  })
})
