import { joinWithConj } from 'teljari'
import { capitalize } from 'lib/utils/strings'

/**
 * Get meta tags by type.
 */
export const getSeo = (content = null, type = null) => {
  if (type === 'word') {
    return {
      title: `Old Icelandic Dictionary - ${capitalize(content.word)}`,
      description: `Meaning of Old Icelandic word "${content.word.toLowerCase()}"`,
    }
  }

  if (type === 'letter') {
    const firstWords = content.slice(0, 4).map((word) => word.word.toLowerCase())
    return {
      title: `Old Icelandic words starting with letter ${firstWords[0].charAt(0).toUpperCase()}`,
      description: `Meanings of Old Icelandic words starting with "${firstWords[0].charAt(0).toUpperCase()}", such as ${joinWithConj(firstWords)}`,
    }
  }

  // Default tags.
  return {
    title: 'Old Icelandic Dictionary - Geir Zoëga',
    description: 'A Concise Dictionary of Old Icelandic - 29 000 words',
  }
}

export default getSeo
