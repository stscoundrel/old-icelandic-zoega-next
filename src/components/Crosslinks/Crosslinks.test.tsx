import renderer from 'react-test-renderer'
import { Crosslink } from 'lib/services/crosslinks'
import { DictionarySource } from 'scandinavian-dictionary-crosslinker'
import Crosslinks from './index'
import styles from './Crosslinks.module.scss'

describe('Crosslinks component', () => {
  const crosslinks: Crosslink[] = [
    {
      url: 'https://cleasby-vigfusson-dictionary.vercel.app/word/abbadis',
      source: DictionarySource.OldNorse,
    },
    {
      url: 'https://old-norwegian-dictionary.vercel.app/word/abbadis',
      source: DictionarySource.OldNorwegian,
    },
  ]

  test('Only renders when content is available', () => {
    const tree = renderer.create(
      <Crosslinks crosslinks={[]} />,
    )
    expect(tree.toJSON()).toBeNull()
  })

  test('Matches the snapshot', () => {
    const tree = renderer.create(
      <Crosslinks crosslinks={crosslinks} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Has correct amount of crosslinks', () => {
    const tree = renderer.create(<Crosslinks crosslinks={crosslinks} />)
    const { root } = tree

    expect(root.findAllByProps({ className: styles.listItem }).length).toEqual(2)
  })

  test('Has expected crosslink content', () => {
    const tree = renderer.create(<Crosslinks crosslinks={crosslinks} />)

    expect(JSON.stringify(tree)).toContain('Old Norse - Cleasby & Vigfusson Dictionary')
    expect(JSON.stringify(tree)).toContain('Old Norwegian - Johan Fritzner\'s Dictionary')
  })
})
