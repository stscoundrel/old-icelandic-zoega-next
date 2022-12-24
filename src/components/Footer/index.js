import ExternalLink from 'components/ExternalLink'
import LetterLink from 'components/LetterLink'
import ContentArea from 'components/ContentArea'
import styles from './Footer.module.scss'

export default function Footer({ letters }) {
  return (
    <footer className={styles.section}>
      <div className="container">

        <ContentArea>
          <h2>About</h2>
          <p>Based on `&quot;A Concise Dictionary of Old Icelandic`&quot; dictionary.</p>
          <p>Geir Zoëga attempted to to make an easier-to-approach version
            of the more full <ExternalLink
                title="Cleasby - Vigfusson dictionary."
                href="https://cleasby-vigfusson-dictionary.vercel.app/"
              /></p>
          <p>It was published in 1910,
          which leads to there being many public domain versions of the book available.</p>
        </ContentArea>

        <ContentArea>
          <h3 className="h4">Old Icelandic language</h3>
          <p>The Old Icelandic language was a later branch of Old West Norse,
            spoken and written in Iceland in the Middle Ages. It was close to Old Norwegian,
            but differed in orthography and phonology.</p>

          <p>Old Icelandic is also the language of the Viking Sagas</p>
        </ContentArea>

        <ContentArea>
          <h3 className="h4">Old Norse language</h3>
          <p>Old Norse was a North Germanic language that was spoken by inhabitants of
          Scandinavia and their overseas settlements from about the 7th to the 15th centuries.</p>

          <p>Also known as &quot;the viking language&quot;,
          &quot;Old Nordic&quot;, or
          &quot;Old Scandinavian&quot;</p>
        </ContentArea>

        <div className={styles.navs}>
          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Dictionary project</h4>
            <ul>
              <li>
                <ExternalLink
                  title="Source code"
                  href="https://github.com/stscoundrel/old-icelandic-zoega-next"
                />
              </li>
              <li>
                <ExternalLink
                  title="Data source"
                  href="https://github.com/stscoundrel/old-icelandic-zoega"
                />
              </li>
              <li>
                <ExternalLink
                  title="Abbreviations"
                  href="https://github.com/stscoundrel/old-icelandic-zoega-abbreviations"
                />
              </li>
              <li>
                <ExternalLink
                  title="Younger Futhark Runes"
                  href="https://github.com/stscoundrel/younger-futhark"
                />
              </li>
            </ul>
          </nav>

          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Related dictionary projects</h4>
            <ul>
              <li>
                <ExternalLink
                  title="Cleasby and Vigfusson Old Norse Dictionary"
                  href="https://cleasby-vigfusson-dictionary.vercel.app/"
                />
              </li>
              <li>
                <ExternalLink
                  title="Dictionary of the Old Norwegian Language"
                  href="https://old-norwegian-dictionary.vercel.app/"
                />
              </li>
              <li>
                <ExternalLink
                  title="K.F Söderwall's Old Swedish Dictionary"
                  href="https://old-swedish-dictionary.vercel.app/"
                />
              </li>
              <li>
                <ExternalLink
                  title="Old Norse Alphabet"
                  href="https://github.com/stscoundrel/old-norse-alphabet"
                />
              </li>
            </ul>
          </nav>

          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Quick links</h4>
            <ul className={styles.navColumns}>
              {letters.map((entry) => (
                <li className={styles.navColumnItem} key={entry.slug}>
                  <LetterLink letter={entry} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <small className={styles.copyright}>{`Copyright © 2021 - ${new Date().getFullYear()}`}
          <br />
          <ExternalLink
            title="Sampo Silvennoinen / StScoundrel"
            href="https://github.com/stscoundrel"
          />
        </small>
      </div>
    </footer>
  )
}
