import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getMeloCardMeta, MeloMoodGenreCard } from '@/components/melo/MeloMoodGenrePoses'

const SHARE_MELO_CARDS = [
  { kind: 'mood' as const, key: 'dreamy' },
  { kind: 'genre' as const, key: 'jazz' },
  { kind: 'mood' as const, key: 'outgoing' },
]

type ShareMoodGenreStripProps = {
  tryNowHref: string
}

export function ShareMoodGenreStrip({ tryNowHref }: ShareMoodGenreStripProps) {
  const { t } = useTranslation()

  return (
    <section className="space-y-5" aria-labelledby="share-moods-heading">
      <h2
        id="share-moods-heading"
        className="font-heading text-xl font-semibold text-ink sm:text-2xl"
      >
        {t('shareMelody.moods.heading')}
      </h2>

      <ul className="grid gap-4 sm:grid-cols-3">
        {SHARE_MELO_CARDS.map(({ kind, key }) => {
          const meta = getMeloCardMeta(kind, key)
          return (
            <li key={`${kind}-${key}`} className="flex flex-col gap-3">
              <MeloMoodGenreCard meta={meta} />
              <Link
                to={tryNowHref}
                className="text-center text-sm font-semibold text-plum transition-colors hover:text-plum-light"
              >
                {t('shareMelody.moods.tryNow')}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
