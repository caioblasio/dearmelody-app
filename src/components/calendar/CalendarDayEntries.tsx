import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { DiaryEntryRow } from '@/components/DiaryEntryRow'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'

type CalendarDayEntriesProps = {
  selectedDayKey: string | null
  entries: DiaryListItem[]
  locale: string
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

export function CalendarDayEntries({ selectedDayKey, entries, locale }: CalendarDayEntriesProps) {
  const { t } = useTranslation()

  if (!selectedDayKey) {
    return (
      <div className="rounded-[24px] border border-warm-border bg-card-bg p-6">
        <p className="text-sm text-muted">{t('pastMelodies.calendar.selectDayPrompt')}</p>
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
      <p className="label-caps text-sand">{heading}</p>

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
            />
          ))}
        </div>
      )}
    </div>
  )
}
