import { createRenderer, renderToDOM } from '../../../tests/helpers/react'
import { DictionarySource } from 'scandinavian-dictionary-crosslinker'
import WordDefinition from './index'
import styles from './WordDefinition.module.scss'

const word = {
  word: 'leynidyrr',
  definitions: ['f. pl. <i>secret door</i>.'],
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
    source: 'old-norse' as DictionarySource,
  },
  {
    url: 'https://old-norwegian-dictionary.vercel.app/word/abbadis',
    source: 'old-norwegian' as DictionarySource,
  },
]
const runes = 'ᛚᛁᚢᚾᛁᛏᚢᚱᚱ'

describe('WordDefinition component', () => {
  test('Does not crash', () => {
    renderToDOM(
      <WordDefinition
        entry={word}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    )
  })

  test('Matches snapshot', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={word}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct label', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={word}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    )
    const { root } = tree

    expect(root.findByType('h1').children).toEqual(['Leynidyrr'])
  })

  test('Has correct amount of definitions', () => {
    const tree = createRenderer(
      <WordDefinition
        entry={word}
        abbreviations={abbreviations}
        crosslinks={crosslinks}
        runes={runes}
      />,
    )
    const { root } = tree

    expect(
      root.findAllByProps({ className: styles.abbreviation }).length,
    ).toEqual(2)
  })
})
