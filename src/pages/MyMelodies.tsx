import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { CalendarDayEntries } from '@/components/calendar/CalendarDayEntries'
import { CalendarGrid } from '@/components/calendar/CalendarGrid'
import {
  addMonths,
  buildCalendarCells,
  getMonthRange,
  getTopMood,
  groupEntriesByDayKey,
  isSameMonth,
  startOfMonth,
} from '@/lib/diary-calendar'
import { formatLocalDateYmd } from '@/lib/diary-date-range'
import { getMoodTextColor } from '@/lib/mood-colors'

export function MyMelodiesPage() {
  const { t, i18n } = useTranslation()
  const today = useMemo(() => new Date(), [])
  const todayKey = useMemo(() => formatLocalDateYmd(today), [today])

  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()))
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(() =>
    formatLocalDateYmd(new Date())
  )

  const diaryParams = useMemo(
    () => ({ ...getMonthRange(currentMonth), limit: 200 }),
    [currentMonth]
  )
  const { data, isLoading, isError } = useGetDiary(diaryParams)

  const entries = data ?? []
  const entriesByDay = useMemo(() => groupEntriesByDayKey(entries), [entries])
  const cells = useMemo(
    () => buildCalendarCells(currentMonth, entriesByDay),
    [currentMonth, entriesByDay]
  )
  const topMood = useMemo(() => getTopMood(entries), [entries])
  const canGoNext = !isSameMonth(currentMonth, today)

  const selectedEntries = selectedDayKey ? (entriesByDay.get(selectedDayKey) ?? []) : []

  function goToMonth(next: Date) {
    setCurrentMonth(next)
    if (isSameMonth(next, today)) {
      setSelectedDayKey(todayKey)
    } else {
      setSelectedDayKey(null)
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
            {t('pastMelodies.title')}
          </h1>
          {!isLoading && !isError && (
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              <span className="rounded-full border border-warm-border bg-card-bg px-4 py-1.5 text-sm font-semibold text-muted">
                {t('pastMelodies.calendar.entryCount', { count: entries.length })}
              </span>
              {topMood ? (
                <span
                  className="rounded-full border border-warm-border bg-card-bg px-4 py-1.5 text-sm font-semibold"
                  style={{ color: getMoodTextColor(topMood.mood) }}
                >
                  {topMood.label}
                </span>
              ) : null}
            </div>
          )}
        </div>
        <p className="text-muted">{t('pastMelodies.subtitle')}</p>
      </header>

      {isError && (
        <p className="text-sm text-error" role="alert">
          {t('pastMelodies.calendar.error')}
        </p>
      )}

      {!isError && (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 lg:flex-[1.4]">
            <CalendarGrid
              monthDate={currentMonth}
              cells={cells}
              selectedDayKey={selectedDayKey}
              locale={i18n.language}
              canGoNext={canGoNext}
              isLoading={isLoading}
              onPrevMonth={() => goToMonth(addMonths(currentMonth, -1))}
              onNextMonth={() => {
                if (!canGoNext) return
                goToMonth(addMonths(currentMonth, 1))
              }}
              onSelectDay={setSelectedDayKey}
            />
          </div>

          <div className="min-w-0 lg:sticky lg:top-6 lg:flex-1">
            <CalendarDayEntries
              selectedDayKey={selectedDayKey}
              entries={selectedEntries}
              locale={i18n.language}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}
