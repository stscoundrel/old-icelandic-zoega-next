// Services.
import Link from 'next/link'
import {
  type AlphabetLetter, type DictionaryEntry, getAlphabet, getRandomEntries,
} from 'lib/services/dictionary'

// Components.
import Layout from 'components/Layout'
import ContentArea from 'components/ContentArea'
import SampleText from 'components/SampleText'
import WordList from 'components/WordList'

interface IndexProps {
  letters: AlphabetLetter[]
  words: DictionaryEntry[],
}

interface IndexStaticProps {
  props: IndexProps
}

export async function getStaticProps(): Promise<IndexStaticProps> {
  const letters = getAlphabet()
  const randomEntries = getRandomEntries()

  return {
    props: {
      letters,
      words: randomEntries,
    },
  }
}

export default function Index({ letters, words }: IndexProps) {
  return (
    <Layout letters={letters} type='page' content={null}>
      <ContentArea>
        <h1 className="h2">A Concise Dictionary of Old Icelandic</h1>
        <p>Online version of the `&quot;A Concise Dictionary of Old Icelandic`&quot;
        dictionary by Geir Zoëga, originally published in 1910</p>

        <p>Zoëgas attempt was to made easier-to-approach version of the more full
          Cleasby - Vigfusson dictionary, specifically for beginners and those interested in
          Old Icelandic prose writing.</p>

        <Link href="/search" passHref className="button" prefetch={false}>
          Search the dictionary
        </Link>
      </ContentArea>

      <ContentArea>
        <h2 className="h3">What is Old Icelandic?</h2>
        <p>Old Icelandic was a western dialect of Old Norse.
          Old Norse is a dead language, that was the father of modern languages
        like Icelandic, Swedish, Norwegian, Danish, Faroese and Elfdalian.
        Popularly known as the language that vikings spoke.</p>

        <SampleText />
      </ContentArea>

      <h3>Random entries from the dictionary:</h3>
      <WordList words={words} showDefinition={true}/>
    </Layout>
  )
}
