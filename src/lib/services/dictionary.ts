import { getDictionary, getNoMarkupDictionary } from 'old-icelandic-zoega'
import { oldNorseSort } from 'old-norse-alphabet-sort'
import type { DictionaryEntry as RawDictionaryEntry } from 'cleasby-vigfusson-dictionary'
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
let cachedInitialPages: string[] | null = null

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

export const getAllWordsWithoutMarkup = (): DictionaryEntry[] => {
  const words = getNoMarkupDictionary()

  /**
   * Add URL safe slugs.
   */
  const formattedWords = addSlugs(words)

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

export const getRandomEntries = (): DictionaryEntry[] => (
  // Return entries fit to be randomized "teasers"
  // Therefore, content should be short, but not too short.
  getAllWordsWithoutMarkup()
    .sort(() => Math.random() - 0.5)
    .filter((entry) => entry.definitions[0].length < 50 && entry.definitions[0].length > 15)
    .slice(0, 36)
    .sort((a, b) => oldNorseSort(a.word, b.word))
)

export const getAlphabet = (): AlphabetLetter[] => {
  const letters = [...VALID_AS_FIRST.filter((letter) => letter !== 'ǫ' && letter !== 'ø'), 'ö']

  const formattedLetters = letters.map((letter) => ({
    letter,
    slug: slugifyLetter(letter),
  }))

  return formattedLetters
}

/**
 * Initial word pages to build are basically 6000
 * headword pages based on modulus. Larger number
 * can not be deployed in one go.
 */
export const getInitialWordsToBuild = (): string[] => {
  if (cachedInitialPages) return cachedInitialPages

  const allWords = getAllWords()

  const result: string[] = []
  for (let i = 0; i < allWords.length; i += 5) {
    result.push(allWords[i].slug);
  }

  cachedInitialPages = result
  return cachedInitialPages
}

export default {
  getAllWords,
  getByLetter,
  getWord,
  getAlphabet,
}
