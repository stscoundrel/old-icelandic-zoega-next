import { useRouter } from 'next/router'

// Services.
import {
  getWord, getAlphabet, DictionaryEntry, AlphabetLetter,
} from 'lib/services/dictionary'
import { getAbbreviations } from 'lib/services/abbreviations'

// Utils.
import { redirect404 } from 'lib/utils/redirect-404'

// Components.
import Layout from 'components/Layout'
import WordDefinition from 'components/WordDefinition'
import Button from 'components/Button'
import { Crosslink, getCrossLinks } from 'lib/services/crosslinks'

interface Abbreviation {
  abbreviation: string,
  explanation: string,
}

interface WordPageProps {
  entry: DictionaryEntry,
  letters: AlphabetLetter[],
  abbreviations: Abbreviation[], // TODO: real typing in service.
  crosslinks: Crosslink[],
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

  return {
    props: {
      entry,
      letters,
      abbreviations,
      crosslinks,
    },
  }
}

export default function Word({
  entry, letters, abbreviations, crosslinks,
}: WordPageProps) {
  const router = useRouter()

  if (!entry) {
    return null
  }

  return (
    <Layout type="word" content={entry} letters={letters}>
      <WordDefinition data={entry} abbreviations={abbreviations} crosslinks={crosslinks}/>
      <Button text="Back" action={() => router.back()} />
    </Layout>
  )
}
