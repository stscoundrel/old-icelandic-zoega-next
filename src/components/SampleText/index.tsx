import Link from 'next/link'

export default function SampleText() {
  return (
    <>
      <p className="h4">
        A sample of Old Icelandic:
      </p>
      <p>
        <em>
        <Link href="/word/ulfr" prefetch={false}>Úlfr</Link> <Link href="/word/heita" prefetch={false}>hét</Link> <Link href="/word/madr" prefetch={false}>maðr</Link>, <Link href="/word/sonr" prefetch={false}>sonr</Link> Bjálfa <Link href="/word/ok" prefetch={false}>ok</Link> Hallberu, <Link href="/word/dottir" prefetch={false}>dóttur</Link> <Link href="/word/ulfr" prefetch={false}>Úlfs</Link> <Link href="/word/inn" prefetch={false}>ins</Link> <Link href="/word/o-2" prefetch={false}>ó</Link><Link href="/word/argr" prefetch={false}>arga</Link>.&nbsp;
        <Link href="/word/hon" prefetch={false}>Hon</Link> <Link href="/word/vera" prefetch={false}>var</Link> <Link href="/word/systir" prefetch={false}>systir</Link> Hallbjarnar <Link href="/word/halftroll" prefetch={false}>hálftrölls</Link> í Hrafnistu, <Link href="/word/fadir" prefetch={false}>föður</Link> <Link href="/word/ketill" prefetch={false}>Ketils</Link> hængs.&nbsp;
        <Link href="/word/ulfr" prefetch={false}>Úlfr</Link> <Link href="/word/var" prefetch={false}>var</Link> <Link href="/word/madr" prefetch={false}>maðr</Link> <Link href="/word/sva" prefetch={false}>svá</Link> <Link href="/word/mikill" prefetch={false}>mikill</Link> <Link href="/word/ok" prefetch={false}>ok</Link> <Link href="/word/sterkr" prefetch={false}>sterkr</Link>, <Link href="/word/at" prefetch={false}>at</Link> <Link href="/word/eigi" prefetch={false}>eigi</Link> <Link href="/word/varu" prefetch={false}>váru</Link> <Link href="/word/hann" prefetch={false}>hans</Link> <Link href="/word/jafningi" prefetch={false}>jafningjar</Link>.&nbsp;
        <Link href="/word/en" prefetch={false}>En</Link> <Link href="/word/er" prefetch={false}>er</Link> <Link href="/word/hann" prefetch={false}>hann</Link> <Link href="/word/vera" prefetch={false}>var</Link> á <Link href="/word/ungr" prefetch={false}>unga</Link> <Link href="/word/aldr" prefetch={false}>aldri</Link>, lá <Link href="/word/hann" prefetch={false}>hann</Link> <Link href="/word/i" prefetch={false}>í</Link> <Link href="/word/vikingr" prefetch={false}>víkingu</Link> <Link href="/word/ok" prefetch={false}>ok</Link> <Link href="/word/herja" prefetch={false}>herjaði</Link>.&nbsp;
        <Link href="/word/med" prefetch={false}>Með</Link> <Link href="/word/hann" prefetch={false}>honum</Link> <Link href="/word/vera" prefetch={false}>var</Link> <Link href="/word/i" prefetch={false}>í</Link> <Link href="/word/felagskapr" prefetch={false}>félagsskap</Link> <Link href="/word/sa" prefetch={false}>sá</Link> <Link href="/word/madr" prefetch={false}>maðr</Link>, <Link href="/word/er" prefetch={false}>er</Link> <Link href="/word/kalla" prefetch={false}>kallaðr</Link> <Link href="/word/var" prefetch={false}>var</Link> Berðlu-Kári,&nbsp;
        <Link href="/word/gofugr" prefetch={false}>göfugr maðr</Link> <Link href="/word/ok" prefetch={false}>ok</Link> <Link href="/word/inn" prefetch={false}>inn</Link> <Link href="/word/mest" prefetch={false}>mesti</Link> <Link href="/word/afreksmadr" prefetch={false}>afreksmaðr</Link> <Link href="/word/at" prefetch={false}>at</Link> <Link href="/word/afli" prefetch={false}>afli</Link> <Link href="/word/ok" prefetch={false}>ok</Link> <Link href="/word/araedi" prefetch={false}>áræði</Link>. <Link href="/word/hann" prefetch={false}>Hann</Link> <Link href="/word/var" prefetch={false}>var</Link> <Link href="/word/berserkr" prefetch={false}>berserkr</Link>.
        </em>
      </p>

      <p>
        - Excerpt from Egils saga Skalla-Grímssonar, from 1220 - 1240 AD.
      </p>
      <hr />
    </>
  )
}
