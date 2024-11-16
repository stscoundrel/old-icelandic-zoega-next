import { useRouter } from 'next/router'

// Services.
import {
  getWord, getAlphabet, type DictionaryEntry, type AlphabetLetter,
} from 'lib/services/dictionary'
import { getAbbreviations } from 'lib/services/abbreviations'
import { youngerFuthark } from 'riimut'

// Utils.
import { redirect404 } from 'lib/utils/redirect-404'

// Components.
import Layout from 'components/Layout'
import WordDefinition from 'components/WordDefinition'
import Button from 'components/Button'
import { type Crosslink, getCrossLinks } from 'lib/services/crosslinks'

interface Abbreviation {
  abbreviation: string,
  explanation: string,
}

interface WordPageProps {
  entry: DictionaryEntry,
  letters: AlphabetLetter[],
  abbreviations: Abbreviation[], // TODO: real typing in service.
  crosslinks: Crosslink[],
  runes: string,
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

/**
 * Get word by slug.
 */
export async function getStaticProps({ params }) {
  const { word } = params
  const entry = getWord(word)

  if (!entry) {
    return redirect404()
  }

  const letters = getAlphabet()
  const abbreviations = getAbbreviations(entry)
  const crosslinks = getCrossLinks(entry)
  const runes = youngerFuthark.lettersToRunes(entry.word)

  return {
    props: {
      entry,
      letters,
      abbreviations,
      crosslinks,
      runes,
    },
  }
}

export default function Word({
  entry, letters, abbreviations, crosslinks, runes,
}: WordPageProps) {
  const router = useRouter()

  if (!entry) {
    return null
  }

  return (
    <Layout type="word" content={entry} letters={letters}>
      <WordDefinition
        entry={entry}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />
      <Button text="Back" action={() => router.back()} />
    </Layout>
  )
}
