// Services.
import { AlphabetLetter, getAlphabet } from 'lib/services/dictionary'

// Components.
import Layout from 'components/Layout'
import ContentArea from 'components/ContentArea'

interface NotFoundProps {
  letters: AlphabetLetter[]
}

interface NotFoundStaticProps {
  props: NotFoundProps,
}

/**
 * Get navigations.
 */
export async function getStaticProps(): Promise<NotFoundStaticProps> {
  const letters = getAlphabet()

  return {
    props: {
      letters,
    },
  }
}

export default function ErrorPage404({ letters }: NotFoundProps) {
  return (
    <Layout type="page" letters={letters} content={null}>
      <ContentArea>
        <h1>Page not found</h1>
        <p>Huh, that&apos;s weird.</p>
      </ContentArea>
    </Layout>
  )
}
