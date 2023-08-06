import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import Word, { getStaticProps, getStaticPaths } from 'pages/word/[word]'
import { getAlphabet } from 'lib/services/dictionary'

const mockHandler = jest.fn()

/**
 * Mock router
 */
jest.mock('next/router', () => ({
  useRouter() {
    return {
      locale: undefined,
      defaultLocale: undefined,
      asPath: '/test',
      back: mockHandler,
    }
  },
}))

describe('Word page: render & usage', () => {
  const word = {
    word: 'leynidyrr',
    definitions: [
      'f. pl. <i>secret door</i>.',
    ],
    slug: 'leynidyrr',
  }

  const abbreviations = [
    {
      abbreviation: 'f.',
      explanation: 'feminine.',
    },
    {
      abbreviation: 'pl.',
      explanation: 'plural.',
    },
  ]

  const crosslinks = [
    {
      url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/abbadis',
      source: 'old-norse',
    },
    {
      url: 'https://old-norwegian-dictionary.vercel.app/word/abbadis',
      source: 'old-norwegian',
    },
  ]

  const alphabet = getAlphabet()

  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(
      <Word
        entry={word}
        letters={alphabet}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <Word
        entry={word}
        letters={alphabet}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Returns null if entry is unavailable', () => {
    const tree = renderer.create(
      <Word entry={null} letters={getAlphabet()} abbreviations={abbreviations} crosslinks={[]} />,
    ).toJSON()
    expect(tree).toBeNull()
  })

  test('Back button works', async () => {
    const tree = renderer.create(
      <Word
        entry={word}
        letters={alphabet}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
      />,
    )

    // Click back btn.
    await renderer.act(async () => {
      expect(mockHandler).not.toHaveBeenCalled()
      await tree.root.findByProps({ text: 'Back' }).props.action()

      // Assert mockrouter received a push.
      expect(mockHandler).toHaveBeenCalled()
      expect(mockHandler.mock.calls.length).toBe(1);
    })
  })
})

describe('Word page: data fetching', () => {
  test('getStaticPaths works', async () => {
    const expected = {
      paths: [],
      fallback: 'blocking',
    }

    const result = await getStaticPaths()

    expect(result).toMatchObject(expected)
  })

  test('getStaticProps works', async () => {
    const expected = {
      props: {
        entry: {
          word: 'leynidyrr',
          definitions: [
            'f. pl. <i>secret door</i>.',
          ],
          slug: 'leynidyrr',
        },
        abbreviations: [
          {
            abbreviation: 'f.',
            explanation: 'feminine.',
          },
          {
            abbreviation: 'pl.',
            explanation: 'plural.',
          },
        ],
        letters: getAlphabet(),
        crosslinks: [
          {
            source: 'old-norwegian',
            url: 'https://old-norwegian-dictionary.vercel.app/word/leynidyrr',
          },
          {
            url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/leyni-dyrr',
            source: 'old-norse',
          },
        ],
      },
    }

    const result = await getStaticProps({ params: { word: 'leynidyrr' } })

    expect(result).toEqual(expected)
  })

  test('getStaticProps returns 404 redirect for unknown words', async () => {
    const expected = {
      props: {},
      notFound: true,
    }

    const result = await getStaticProps({ params: { word: 'loremipsum' } })

    expect(result).toEqual(expected)
  })
})
