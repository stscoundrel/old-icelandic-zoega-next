import { findAbbreviations } from 'old-icelandic-zoega-abbreviations'
import { abbreviate } from 'abbreviatrix'

export const getAbbreviations = ({ definitions }) => {
  const combinedAbbreviations = []
  const abbreviationSet = new Set()

  definitions.forEach((definition) => {
    const abbreviations = findAbbreviations(definition)
    abbreviations.forEach((explanation, abbreviation) => {
      if (!abbreviationSet.has(abbreviation)) {
        abbreviationSet.add(abbreviation)
        combinedAbbreviations.push({ abbreviation, explanation })
      }
    })
  })

  return combinedAbbreviations;
}

/**
 * Add abbr tags to content with explanations.
 */
export const addAbbreviationsToContent = (content, abbreviations) => {
  let result = content

  abbreviations.forEach(({ abbreviation, explanation }) => {
    result = abbreviate(abbreviation, explanation, result)
  })

  return result
}

export default {
  getAbbreviations,
  addAbbreviationsToContent,
}
