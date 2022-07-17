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

describe('WordDefinition component', () => {
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<WordDefinition data={word} abbreviations={abbreviations} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(
      <WordDefinition data={word} abbreviations={abbreviations} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct label', () => {
    const tree = renderer.create(<WordDefinition data={word} abbreviations={abbreviations} />)
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Leynidyrr'])
  })

  test('Has correct amount of definitions', () => {
    const tree = renderer.create(<WordDefinition data={word} abbreviations={abbreviations} />)
    const { root } = tree

    expect(root.findAllByProps({ className: styles.abbreviation }).length).toEqual(2)
  })
})
