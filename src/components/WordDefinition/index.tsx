import { capitalize } from 'lib/utils/strings'
import { type Abbreviation, addAbbreviationsToContent } from 'lib/services/abbreviations'
import Abbreviations from 'components/Abbreviations'
import Crosslinks from 'components/Crosslinks'
import type { DictionaryEntry } from 'lib/services/dictionary'
import type { Crosslink } from 'scandinavian-dictionary-crosslinker'
import styles from './WordDefinition.module.scss'

interface WordDefinitionProps{
  entry: DictionaryEntry,
  abbreviations: Abbreviation[],
  crosslinks: Crosslink[],
  runes: string,
}

export default function WordDefinition({
  entry, abbreviations, crosslinks, runes,
}: WordDefinitionProps) {
  const { word, definitions } = entry

  return (
    <article className={styles.section}>
      <header>
        <h1 lang="non">{capitalize(word)}</h1>

        <small className={styles.subHeading}>
          Old Icelandic Dictionary - {word.toLowerCase()}
        </small>
        <p>Meaning of Old Icelandic word <em>&quot;{word}&quot;</em> in English.</p>
      </header>

      <p>As defined by <em>A Concise Dictionary of Old Icelandic</em> (Geir Zoëga):</p>

      {definitions.length > 1 && <p><dfn className="capitalize">{word}</dfn> Old Icelandic word can mean:</p>}
      {definitions.map((definition, index) => (
        <dl className={styles.definitionList} key={`definition-${index}`}>
          <dt><strong>{word}</strong></dt>
          <dd
            className={styles.itemDescription}
            dangerouslySetInnerHTML={{
              __html: addAbbreviationsToContent(definition, abbreviations),
            } }
          />
        </dl>
      ))}

      <p>Possible runic inscription in <em>Younger Futhark:</em>
          <span className={styles.rune}>{ runes }</span>
        </p>

      <Abbreviations abbreviations={abbreviations} />
      <Crosslinks crosslinks={crosslinks} />
    </article>
  )
}
