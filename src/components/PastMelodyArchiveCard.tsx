import { PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { PastMelodyMoodIcon } from '@/components/PastMelodyMoodIcon'
import { useInViewOnce } from '@/hooks/use-in-view-once'
import { ARCHIVE_CARD_SHELL_LAYOUT } from '@/lib/archive-card-shell'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import { cn } from '@/lib/utils'

type PastMelodyArchiveCardProps = {
  entry: DiaryListItem
  locale: string
}

function formatDateCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

function formatDateCompact(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(d)
}

export function PastMelodyArchiveCard({ entry, locale }: PastMelodyArchiveCardProps) {
  const { t } = useTranslation()
  const { ref, visible } = useInViewOnce<HTMLElement>()
  const theme = getArchiveMoodTheme(toMoodIcon(entry.mood))
  const parsed = parseDiaryCreatedAt(entry.createdAt)
  const moodLabel = capitalizeMood(entry.mood)

  return (
    <article
      ref={ref}
      className={cn(
        'past-melody-archive-card group',
        ARCHIVE_CARD_SHELL_LAYOUT,
        'border shadow-sm transition-[opacity,transform,box-shadow] duration-700 ease-out lg:shadow-md',
        'hover:shadow-xl motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        theme.card,
      )}
    >
      <Link
        to={`/melodies/${entry.id}`}
        className={cn(
          'flex min-h-0 flex-1 flex-col rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/35',
        )}
        aria-label={t('pastMelodies.openEntry', { title: entry.title })}
      >
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              'font-semibold uppercase tracking-tight lg:tracking-wide',
              'text-[10px] lg:text-[11px]',
              theme.date,
            )}
          >
            <span className="lg:hidden">{formatDateCompact(parsed, locale)}</span>
            <span className="hidden lg:inline">{formatDateCaps(parsed, locale)}</span>
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            <div
              className={cn(
                'flex items-center gap-1 rounded-full border px-2 py-0.5 lg:gap-1.5 lg:px-3 lg:py-1',
                theme.moodPill,
              )}
            >
              <PastMelodyMoodIcon mood={toMoodIcon(entry.mood)} className="size-3.5 lg:size-4" />
              <span className="max-w-[4.5rem] truncate text-[9px] font-semibold uppercase tracking-wider lg:max-w-none lg:text-[10px]">
                {moodLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 lg:mt-0 lg:space-y-3">
          <h2
            className={cn(
              'font-serif font-semibold leading-tight lg:text-2xl',
              'line-clamp-2 text-sm lg:line-clamp-none',
              theme.title,
            )}
          >
            {entry.title}
          </h2>
          <p
            className={cn(
              'min-h-0 flex-1 text-[10px] leading-snug lg:line-clamp-4 lg:text-base lg:leading-relaxed',
              'line-clamp-3 italic',
              theme.excerpt,
            )}
          >
            {entry.entry}
          </p>
        </div>
      </Link>

      {entry.music ? (
        <div
          className={cn(
            'mt-auto flex items-center gap-2 border p-2 backdrop-blur-sm lg:gap-4 lg:rounded-2xl lg:p-3',
            'rounded-xl border-black/5 lg:mt-auto',
            theme.player,
          )}
        >
          <div className="size-7 shrink-0 overflow-hidden rounded-md shadow-sm ring-1 ring-black/5 lg:size-12 lg:rounded-xl">
            <img
              src={entry.music.imageLocation}
              alt=""
              className="size-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold lg:text-sm">{entry.music.title}</p>
          </div>
          <button
            type="button"
            aria-label={t('pastMelodies.playTrack', { title: entry.music.title })}
            className={cn(
              'flex shrink-0 items-center justify-center transition-transform hover:scale-110 motion-reduce:hover:scale-100',
              theme.play,
            )}
          >
            <PlayCircle className="size-7 lg:size-10" aria-hidden />
          </button>
        </div>
      ) : null}
    </article>
  )
}
