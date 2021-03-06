import { useRouter } from 'next/router'

// Services.
import { getWord, getAlphabet } from 'lib/services/dictionary'
import { getAbbreviations } from 'lib/services/abbreviations'

// Utils.
import { redirect404 } from 'lib/utils/redirect-404'

// Components.
import Layout from 'components/Layout'
import WordDefinition from 'components/WordDefinition'
import Button from 'components/Button'

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

  return {
    props: {
      entry,
      letters,
      abbreviations,
    },
  }
}

export default function Word({ entry, letters, abbreviations }) {
  const router = useRouter()

  if (!entry) {
    return null
  }

  return (
    <Layout type="word" content={entry} letters={letters}>
      <WordDefinition data={entry} abbreviations={abbreviations} />
      <Button text="Back" action={() => router.back()} />
    </Layout>
  )
}
