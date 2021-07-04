import AbbreviationList from 'components/AbbreviationList'
import styles from './Abbreviations.module.scss'

export default function Abbreviations({ abbreviations }) {
  return (
    <div className={styles.abbreviations}>
      {abbreviations.length > 0
        && <div className={styles.column}>
          <h4>Abbreviations used:</h4>
          <AbbreviationList abbreviations={abbreviations} />
        </div>
      }
    </div>
  )
}
