import { AlphabetLetter, DictionaryEntry } from 'lib/services/dictionary'

export const getWordLink = (word: DictionaryEntry): string => `${process.env.NEXT_PUBLIC_SITE_URL}/word/${word.slug}`

export const getLetterLink = (letter: AlphabetLetter): string => `${process.env.NEXT_PUBLIC_SITE_URL}/letter/${letter.slug}`

export const getWordPath = (word: DictionaryEntry): string => `/word/${word.slug}`

export const getMainUrl = (): string => String(process.env.NEXT_PUBLIC_SITE_URL)

export const getCanonicalUrl = (content, type, letter: AlphabetLetter | null = null): string => {
  if (type === 'word') {
    return getWordLink(content)
  }

  if (type === 'letter' && letter) {
    return getLetterLink(letter)
  }

  return getMainUrl()
}
