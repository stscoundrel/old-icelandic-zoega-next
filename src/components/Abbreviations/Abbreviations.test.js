import { createRenderer } from '../../../tests/helpers/react'
import React from 'react'
import Abbreviations from './index'

describe('Abbreviations component', () => {
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

  test('Matches the snapshot', () => {
    const tree = createRenderer(
      <Abbreviations abbreviations={abbreviations} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
