import { getCrosslinks as getAllCrossLinks, Crosslink } from 'scandinavian-dictionary-crosslinker'
import { DictionaryEntry } from './dictionary'

export type { Crosslink } from 'scandinavian-dictionary-crosslinker'

let crossLinkCache: Record<string, Crosslink[]> | null = null

const populateCrossLinks = () => {
  if (!crossLinkCache) {
    crossLinkCache = getAllCrossLinks()
  }

  return crossLinkCache
}

export const getCrossLinks = (entry: DictionaryEntry): Crosslink[] => {
  const crosslinks = populateCrossLinks()
  if (Object.prototype.hasOwnProperty.call(crosslinks, entry.slug)) {
    // Only return foreign links, not ones pointing to self.
    return crosslinks[entry.slug].filter((link) => link.source !== 'old-icelandic')
  }

  return []
}

export default {
  getCrossLinks,
}
