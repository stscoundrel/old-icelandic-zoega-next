import Link from 'next/link'
import type { DictionaryEntry } from 'lib/services/dictionary'
import styles from './WordLink.module.scss'

interface WordLinkProps{
  data: DictionaryEntry,
}

export default function WordLink({ data }: WordLinkProps) {
  const { slug, word } = data

  return (
   <Link key={`link${slug}`} href={`/word/${slug}`} className={styles.link} prefetch={false}>
      {word.toLowerCase()}
    </Link>
  )
}
