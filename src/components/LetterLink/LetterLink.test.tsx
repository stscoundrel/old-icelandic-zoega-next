import ReactDOM from 'react-dom/client'
import renderer from 'react-test-renderer'
import { AlphabetLetter } from 'lib/services/dictionary'
import LetterLink from './index'

describe('LetterLink component', () => {
  const letter: AlphabetLetter = { letter: 's', slug: 's' }
  test('Does not crash', () => {
    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(<LetterLink letter={letter} />)
  })

  test('Matches snapshot', () => {
    const tree = renderer.create(<LetterLink letter={letter} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
