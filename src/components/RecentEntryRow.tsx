import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import { cn } from '@/lib/utils'

type RecentEntryRowProps = {
  entry: DiaryListItem
  locale: string
}

function formatRowDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date)
}

function getMelodyStatus(
  entry: DiaryListItem,
  t: (key: string, options?: Record<string, string>) => string,
): { label: string; className: string } {
  if (!entry.music) {
    return {
      label: t('dashboard.noMelodyYet'),
      className: 'text-coral',
    }
  }

  if (entry.music.generateStatus === 'done') {
    return {
      label: t('dashboard.melodyReady', { title: entry.music.title }),
      className: 'text-plum',
    }
  }

  return {
    label: t('dashboard.melodyGenerating'),
    className: 'text-muted',
  }
}

export function RecentEntryRow({ entry, locale }: RecentEntryRowProps) {
  const { t } = useTranslation()
  const theme = getArchiveMoodTheme(toMoodIcon(entry.mood))
  const parsed = parseDiaryCreatedAt(entry.createdAt)
  const moodLabel = capitalizeMood(entry.mood)
  const melodyStatus = getMelodyStatus(entry, t)

  return (
    <Link
      to={`/melodies/${entry.id}`}
      className={cn(
        'flex items-center gap-4 rounded-[18px] border border-warm-border bg-card-bg px-5 py-4',
        'transition-colors hover:border-peach',
        'outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
      )}
      aria-label={t('pastMelodies.openEntry', { title: entry.title })}
    >
      <span className={cn('size-3 shrink-0 rounded-full', theme.moodDot)} aria-hidden />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-ink">{entry.title}</p>
        <p className="text-[13px] text-muted">
          {formatRowDate(parsed, locale)} · {moodLabel}
        </p>
      </div>

      <p className={cn('shrink-0 text-[13px] font-semibold', melodyStatus.className)}>
        {melodyStatus.label}
      </p>
    </Link>
  )
}
