import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { CalendarCell } from '@/lib/diary-calendar'
import { getWeekdayLabels } from '@/lib/diary-calendar'
import { cn } from '@/lib/utils'

type CalendarGridProps = {
  monthDate: Date
  cells: CalendarCell[]
  selectedDayKey: string | null
  locale: string
  canGoNext: boolean
  onPrevMonth: () => void
  onNextMonth: () => void
  onSelectDay: (dayKey: string) => void
}

function formatMonthTitle(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)
}

export function CalendarGrid({
  monthDate,
  cells,
  selectedDayKey,
  locale,
  canGoNext,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
}: CalendarGridProps) {
  const { t } = useTranslation()
  const weekdayLabels = getWeekdayLabels(locale)
  const monthTitle = formatMonthTitle(monthDate, locale)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-[1.75rem] font-semibold text-ink sm:text-[2.125rem]">
          {monthTitle}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            aria-label={t('pastMelodies.calendar.prevMonth')}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border border-warm-border bg-card-bg text-muted',
              'transition-colors hover:border-peach hover:text-ink',
              'outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
            )}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            disabled={!canGoNext}
            aria-label={t('pastMelodies.calendar.nextMonth')}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border border-warm-border bg-card-bg text-muted',
              'transition-colors hover:border-peach hover:text-ink',
              'outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
              'disabled:pointer-events-none disabled:opacity-40',
            )}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-7 gap-1.5 sm:gap-2"
        role="grid"
        aria-label={monthTitle}
      >
        {weekdayLabels.map((label) => (
          <div
            key={label}
            role="columnheader"
            className="px-0.5 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-sand sm:text-xs"
          >
            {label}
          </div>
        ))}

        {cells.map((cell) => {
          const isSelected = selectedDayKey === cell.dayKey
          const isDisabled = !cell.inCurrentMonth || cell.isFuture
          const dayNumber = cell.date.getDate()

          return (
            <button
              key={cell.dayKey + (cell.inCurrentMonth ? '' : '-pad')}
              type="button"
              role="gridcell"
              disabled={isDisabled}
              aria-pressed={isSelected}
              aria-current={cell.isToday ? 'date' : undefined}
              aria-label={t('pastMelodies.calendar.dayAriaLabel', {
                day: dayNumber,
                count: cell.entryCount,
              })}
              onClick={() => onSelectDay(cell.dayKey)}
              className={cn(
                'flex min-h-[3.25rem] flex-col justify-between rounded-2xl border p-2 text-left transition-colors sm:min-h-[5.25rem] sm:p-2.5',
                'outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
                isDisabled && 'cursor-default border-transparent bg-transparent text-[#D8CDBF]',
                !isDisabled && !isSelected && 'border-warm-border bg-card-bg text-ink hover:border-peach',
                !isDisabled && !isSelected && cell.hasEntry && 'bg-chip-bg',
                !isDisabled && !isSelected && cell.isToday && 'ring-2 ring-coral ring-offset-1 ring-offset-cream-bg',
                isSelected && 'border-coral bg-coral text-on-primary hover:border-coral',
              )}
            >
              <span
                className={cn(
                  'text-[13px] font-semibold sm:text-[15px]',
                  isSelected ? 'text-on-primary' : cell.isFuture || !cell.inCurrentMonth ? 'text-[#D8CDBF]' : 'text-ink',
                )}
              >
                {dayNumber}
              </span>
              {cell.hasEntry && cell.inCurrentMonth ? (
                <span
                  className={cn(
                    'size-2 rounded-full sm:size-2.5',
                    isSelected ? 'bg-on-primary/90' : 'bg-peach',
                  )}
                  aria-hidden
                />
              ) : (
                <span className="size-2 sm:size-2.5" aria-hidden />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
