import { capitalize } from 'lib/utils/strings'
import { lettersToRunes } from 'younger-futhark'
import { addAbbreviationsToContent } from 'lib/services/abbreviations'
import Abbreviations from 'components/Abbreviations'
import styles from './WordDefinition.module.scss'

export default function WordDefinition({ data, abbreviations }) {
  const { word, definitions } = data

  return (
    <article className={styles.section}>
      <header>
        <h1 lang="non">{capitalize(word)}</h1>

        <small className={styles.subHeading}>
          Old Icelandic Dictionary - {word.toLowerCase()}
        </small>
        <p>Possible runic inscription in <em>Younger Futhark:</em>
          <span className={styles.rune}>{ lettersToRunes(word) }</span>
        </p>
        <p>Meaning of Old Icelandic word <em>&quot;{word}&quot;</em></p>
      </header>

      {definitions.length > 1 && <p><dfn className="capitalize">{word}</dfn> Old Icelandic word can mean:</p>}
      {definitions.map((definition, index) => (
        <dl className={styles.definitionList} key={`definition-${index}`}>
          <dt><strong>{word}</strong></dt>
          <dd
            className={styles.itemDescription}
            dangerouslySetInnerHTML={{
              __html: addAbbreviationsToContent(definition, abbreviations),
            } }
          ></dd>
        </dl>
      ))}

      <Abbreviations abbreviations={abbreviations} />
    </article>
  )
}
