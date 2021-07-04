import styles from './LetterHeader.module.scss'

export default function LetterLink({ letter, count }) {
  return (
   <header className={styles.section}>
    <h1 className={styles.title}>Letter {letter.toUpperCase()}</h1>
    <small className={styles.subHeading}>
      Old Icelandic Dictionary - Letter {letter.toUpperCase()}
    </small>
    <p>Old Icelandic words starting with letter {letter.toUpperCase()}</p>
    <small className={styles.count}>Total of {count} words</small>
  </header>
  )
}
