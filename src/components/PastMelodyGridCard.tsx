import { PlayCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { cn } from '@/lib/utils'

import { PastMelodyMoodIcon } from './PastMelodyMoodIcon'

type PastMelodyGridCardProps = {
  entry: PastMelodyEntry
  className?: string
}

export function PastMelodyGridCard({ entry, className }: PastMelodyGridCardProps) {
  const { t } = useTranslation()
  const dateCaps = entry.dateLabel.toUpperCase()

  return (
    <article
      className={cn(
        'deckled-edge flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-6 shadow-md shadow-primary/5 transition-transform duration-300 hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-secondary">
          {dateCaps}
        </span>
        <div className="flex shrink-0 items-center gap-1 text-primary">
          <PastMelodyMoodIcon mood={entry.moodIcon} className="size-4" />
          <span className="text-[10px] font-semibold uppercase tracking-tighter text-primary">
            {entry.moodLabel}
          </span>
        </div>
      </div>

      <h2 className="font-serif text-2xl leading-tight font-medium text-primary sm:text-[28px] sm:leading-[1.3]">
        {entry.title}
      </h2>

      <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">{entry.excerpt}</p>

      <div className="mt-auto flex items-center gap-3 rounded-full bg-secondary-container/30 p-2">
        <div className="size-8 shrink-0 overflow-hidden rounded-full">
          <img
            src={entry.artSrc}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-primary">
            {entry.trackTitle}
          </p>
          <p className="truncate text-[10px] text-on-secondary-container/80">{entry.trackArtist}</p>
        </div>
        <button
          type="button"
          aria-label={t('pastMelodies.playTrack', { title: entry.trackTitle })}
          className="mr-2 text-primary transition-opacity hover:opacity-80"
        >
          <PlayCircle className="size-7" aria-hidden />
        </button>
      </div>
    </article>
  )
}
