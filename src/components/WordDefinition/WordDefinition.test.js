import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import WordDefinition from './index'
import styles from './WordDefinition.module.scss'

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

describe('WordDefinition component', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(
      <WordDefinition data={word} abbreviations={abbreviations} crosslinks={crosslinks} />,
    )
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition data={word} abbreviations={abbreviations} crosslinks={crosslinks} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct label', () => {
    const tree = renderer.create(
      <WordDefinition data={word} abbreviations={abbreviations} crosslinks={crosslinks} />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Leynidyrr'])
  })

  test('Has correct amount of definitions', () => {
    const tree = renderer.create(
      <WordDefinition data={word} abbreviations={abbreviations} crosslinks={crosslinks} />,
    )
    const { root } = tree

    expect(root.findAllByProps({ className: styles.abbreviation }).length).toEqual(2)
  })
})
