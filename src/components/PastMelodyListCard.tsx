import { Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { cn } from '@/lib/utils'

const listToneClass: Record<PastMelodyEntry['listMoodTone'], string> = {
  serene: 'bg-secondary-container/50',
  surface: 'bg-surface-variant',
  container: 'bg-primary-container',
}

const listToneTextClass: Record<PastMelodyEntry['listMoodTone'], string> = {
  serene: 'text-on-secondary-container',
  surface: 'text-on-surface-variant',
  container: 'text-on-primary-container',
}

type PastMelodyListCardProps = {
  entry: PastMelodyEntry
}

export function PastMelodyListCard({ entry }: PastMelodyListCardProps) {
  const { t } = useTranslation()
  const dateCaps = entry.dateLabel.toUpperCase()
  const pillBg = listToneClass[entry.listMoodTone]
  const pillText = listToneTextClass[entry.listMoodTone]

  return (
    <article className="relative rounded-xl border border-primary/[0.05] bg-surface-container-lowest p-6 shadow-[0_8px_20px_-8px_rgba(107,86,119,0.12)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-primary/60">
            {dateCaps}
          </span>
          <h2 className="font-serif text-[22px] leading-snug font-medium text-primary sm:text-[28px] sm:leading-[1.3]">
            {entry.title}
          </h2>
        </div>
        <div className={cn('shrink-0 rounded-full px-3 py-1', pillBg)}>
          <span className={cn('text-[10px] font-semibold uppercase tracking-wide', pillText)}>
            {entry.moodLabel}
          </span>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="size-12 shrink-0 overflow-hidden rounded-lg shadow-sm">
          <img
            src={entry.artSrc}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-background">{entry.trackTitle}</p>
          <p className="truncate text-xs text-outline">{entry.trackArtist}</p>
        </div>
        <button
          type="button"
          aria-label={t('pastMelodies.playTrack', { title: entry.trackTitle })}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-transform active:scale-95"
        >
          <Play className="size-5 fill-current" aria-hidden />
        </button>
      </div>

      <div className="border-t border-primary/[0.05] pt-4">
        <p className="line-clamp-2 text-sm italic leading-relaxed text-on-surface-variant">
          {entry.excerpt}
        </p>
      </div>
    </article>
  )
}
