import { createRenderer, renderToDOM } from '../../../tests/helpers/react'
import { AlphabetLetter } from 'lib/services/dictionary'
import LetterLink from './index'

describe('LetterLink component', () => {
  const letter: AlphabetLetter = { letter: 's', slug: 's' }
  test('Does not crash', () => {
    renderToDOM(<LetterLink letter={letter} />)
  })

  test('Matches snapshot', () => {
    const tree = createRenderer(<LetterLink letter={letter} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
