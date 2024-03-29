import { getDictionary } from 'old-icelandic-zoega'
import { DictionaryEntry as RawDictionaryEntry } from 'cleasby-vigfusson-dictionary'
import { VALID_AS_FIRST } from 'old-norse-alphabet'
import { slugifyWord, slugifyLetter } from '../utils/slugs'

export interface DictionaryEntry extends RawDictionaryEntry {
  slug: string,
}

// Light weight alternative when definitions are not needed.
// Next.js caches all props as JSON, so no need to store megabytes of definitions when not used.
export interface DictionaryEntryDTO {
  word: string,
  slug: string
}

export interface AlphabetLetter {
  letter: string,
  slug: string
}

let dictionaryCache: DictionaryEntry[] | null = null

const addSlugs = (words: RawDictionaryEntry[]): DictionaryEntry[] => {
  const existingSlugs = {}

  const formattedWords = words.map((word) => {
    let slug = slugifyWord(word.word)

    if (existingSlugs[slug]) {
      // Double slug, make unique.
      existingSlugs[slug] += 1
      slug = `${slug}-${existingSlugs[slug]}`
    } else {
      existingSlugs[slug] = 1
    }

    return {
      ...word,
      slug,
    }
  })

  return formattedWords
}

export const getAllWords = (): DictionaryEntry[] => {
  if (dictionaryCache) return dictionaryCache

  const words = getDictionary()

  /**
   * Add URL safe slugs.
   */
  const formattedWords = addSlugs(words)

  dictionaryCache = formattedWords

  return formattedWords
}

export const getByLetter = (letter: string): DictionaryEntryDTO[] => {
  const words = getAllWords()
  const byLetter = words
    .filter((entry) => (
      entry.word.charAt(0).toLowerCase() === letter.toLowerCase()))
    .map((entry) => ({ word: entry.word, slug: entry.slug }))

  return byLetter
}

export const getWord = (slug: string): DictionaryEntry => (
  getAllWords().filter((entry) => entry.slug === slug)[0]
)

export const getAlphabet = (): AlphabetLetter[] => {
  const letters = [...VALID_AS_FIRST.filter((letter) => letter !== 'ǫ' && letter !== 'ø'), 'ö']

  const formattedLetters = letters.map((letter) => ({
    letter,
    slug: slugifyLetter(letter),
  }))

  return formattedLetters
}

export default {
  getAllWords,
  getByLetter,
  getWord,
  getAlphabet,
}
