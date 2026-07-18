import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { DiaryEntryRow } from '@/components/DiaryEntryRow'
import { Skeleton } from '@/components/ui/skeleton'
import type { TopMood } from '@/lib/diary-calendar'
import { getMoodTextColor } from '@/lib/mood-colors'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'

type CalendarDayEntriesProps = {
  selectedDayKey: string | null
  entries: DiaryListItem[]
  locale: string
  isLoading?: boolean
  monthEntryCount: number
  topMood: TopMood | null
}

function formatSelectedDay(dayKey: string, locale: string): string {
  const [y, m, d] = dayKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function MonthSummary({
  monthEntryCount,
  topMood,
}: {
  monthEntryCount: number
  topMood: TopMood | null
}) {
  const { t } = useTranslation()

  return (
    <p className="text-sm text-muted">
      {t('pastMelodies.calendar.entryCount', { count: monthEntryCount })}
      {topMood ? (
        <>
          {' · '}
          {t('pastMelodies.calendar.topMoodPrefix')}{' '}
          <span className="font-semibold" style={{ color: getMoodTextColor(topMood.mood) }}>
            {topMood.label}
          </span>
        </>
      ) : null}
    </p>
  )
}

export function CalendarDayEntries({
  selectedDayKey,
  entries,
  locale,
  isLoading = false,
  monthEntryCount,
  topMood,
}: CalendarDayEntriesProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3.5 rounded-[24px] border border-warm-border bg-card-bg p-5 sm:p-6"
        aria-hidden
      >
        <Skeleton className="h-3 w-32" />
        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!selectedDayKey) {
    return (
      <div className="flex flex-col gap-1.5 rounded-[24px] border border-warm-border bg-card-bg p-5 sm:p-6">
        <p className="text-sm text-muted">{t('pastMelodies.calendar.selectDayPrompt')}</p>
        <MonthSummary monthEntryCount={monthEntryCount} topMood={topMood} />
      </div>
    )
  }

  const heading = formatSelectedDay(selectedDayKey, locale)
  const sorted = [...entries].sort(
    (a, b) =>
      parseDiaryCreatedAt(b.createdAt).getTime() - parseDiaryCreatedAt(a.createdAt).getTime(),
  )

  return (
    <div className="flex flex-col gap-3.5 rounded-[24px] border border-warm-border bg-card-bg p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="label-caps text-sand">{heading}</p>
        <MonthSummary monthEntryCount={monthEntryCount} topMood={topMood} />
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted">{t('pastMelodies.calendar.dayEmpty')}</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {sorted.map((entry) => (
            <DiaryEntryRow
              key={entry.id}
              entry={entry}
              locale={locale}
              showDate={false}
              showSongName={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
