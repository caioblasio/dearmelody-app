import { Heart, PlayCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PastMelodyMoodIcon } from '@/components/PastMelodyMoodIcon'
import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { parsePastMelodyEntryDate } from '@/lib/past-melody-date'
import { cn } from '@/lib/utils'

type DiaryEntryPageProps = {
  entry: PastMelodyEntry
  locale: string
  indexInGroup: number
}

const RULE_LINE_BG = 'linear-gradient(to bottom, transparent 31px, rgb(207 196 205 / 0.55) 32px)'

export function DiaryEntryPage({ entry, locale, indexInGroup }: DiaryEntryPageProps) {
  const { t } = useTranslation()
  const d = parsePastMelodyEntryDate(entry)
  const dayNum = d.getDate()
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d)
  const monthShort = new Intl.DateTimeFormat(locale, { month: 'short' }).format(d)

  const staggerMs = Math.min(indexInGroup, 6) * 45

  return (
    <article
      className="diary-entry-reveal relative overflow-hidden rounded-xl border border-outline-variant/50 bg-[#fffaf2] shadow-[2px_4px_0_rgba(107,86,119,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]"
      style={{ animationDelay: `${staggerMs}ms` }}
    >
      <div className="grid gap-4 p-4 pl-7 sm:p-5 sm:pl-9 lg:grid-cols-[minmax(4.5rem,6.5rem)_minmax(0,1fr)] lg:gap-6 lg:pl-8">
        <aside className="flex flex-row gap-3 border-b border-outline-variant/40 pb-3 lg:flex-col lg:border-b-0 lg:pb-0">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="font-serif text-4xl font-semibold leading-none text-primary tabular-nums">
              {dayNum}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              {weekday}
            </span>
            <span className="text-xs text-on-surface-variant">{monthShort}</span>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 lg:items-start">
            {entry.favorite ? (
              <span
                className="inline-flex items-center gap-1 rounded-md border border-secondary/30 bg-secondary-container/25 px-2 py-1 text-secondary"
                aria-label={t('pastMelodies.diary.favorite')}
              >
                <Heart className="size-3.5 fill-secondary/45" aria-hidden />
              </span>
            ) : null}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-container/40 px-2.5 py-1 text-primary">
              <PastMelodyMoodIcon mood={entry.moodIcon} className="size-3.5 shrink-0" />
              <span className="max-w-[7rem] truncate text-[10px] font-semibold uppercase tracking-tight">
                {entry.moodLabel}
              </span>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-4">
          <div
            className="space-y-2 pl-1"
            style={{ backgroundImage: RULE_LINE_BG, backgroundSize: '100% 32px' }}
          >
            <h2 className="font-serif text-xl font-semibold leading-snug text-primary sm:text-2xl">
              {entry.title}
            </h2>
            <p className="line-clamp-4 text-sm leading-8 text-on-surface-variant">
              {entry.excerpt}
            </p>
          </div>

          <div className="flex justify-start lg:justify-end lg:pt-0.5">
            <div
              className={cn(
                'flex w-full max-w-md items-center gap-3 rounded-lg border border-dashed border-primary/25',
                'bg-surface-container-low/90 p-2.5 shadow-inner sm:p-3',
                'lg:max-w-[min(100%,20rem)]'
              )}
            >
              <p className="sr-only">{t('pastMelodies.diary.soundtrack')}</p>
              <div className="size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-outline-variant/60">
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
                <p className="truncate text-[10px] text-on-secondary-container/85">
                  {entry.trackArtist}
                </p>
              </div>
              <button
                type="button"
                aria-label={t('pastMelodies.playTrack', { title: entry.trackTitle })}
                className="shrink-0 text-primary transition-opacity hover:opacity-80"
              >
                <PlayCircle className="size-7" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
