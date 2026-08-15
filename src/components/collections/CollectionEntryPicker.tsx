import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { CollectionDiaryPickItem } from '@/components/collections/CollectionDiaryPickItem'
import { Alert } from '@/components/ui/alert'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ItemGroup } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'
import { getMonthRange, startOfMonth } from '@/lib/diary-calendar'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { cn } from '@/lib/utils'

const YEAR_LOOKBACK = 10

type EntryFilter = 'all' | 'selected'

type CollectionEntryPickerProps = {
  selectedIds: string[]
  onToggle: (id: string) => void
}

type PeriodDropdownProps = {
  label: string
  value: string
  ariaLabel: string
  triggerClassName?: string
  options: { value: string; label: string }[]
  onValueChange: (value: string) => void
}

function clampToCurrentMonth(date: Date, today = new Date()): Date {
  const next = startOfMonth(date)
  const current = startOfMonth(today)
  return next > current ? current : next
}

function monthOptions(year: number, locale: string, today: Date) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  const lastMonth = year === today.getFullYear() ? today.getMonth() : 11

  return Array.from({ length: lastMonth + 1 }, (_, month) => ({
    value: String(month),
    label: formatter.format(new Date(year, month, 1)),
  }))
}

function yearOptions(today: Date) {
  const currentYear = today.getFullYear()
  return Array.from({ length: YEAR_LOOKBACK + 1 }, (_, index) => {
    const year = currentYear - index
    return { value: String(year), label: String(year) }
  })
}

function PeriodDropdown({
  label,
  value,
  ariaLabel,
  triggerClassName,
  options,
  onValueChange,
}: PeriodDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          'inline-flex h-8 min-w-[7.25rem] items-center justify-between gap-2 rounded-full border border-warm-border bg-card-bg px-3 text-xs font-semibold text-ink outline-none transition-colors',
          'hover:border-peach focus-visible:ring-2 focus-visible:ring-coral/35',
          triggerClassName,
        )}
      >
        {label}
        <ChevronDown className="size-3.5 shrink-0 text-muted" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[9.5rem]">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CollectionEntryPicker({
  selectedIds,
  onToggle,
}: CollectionEntryPickerProps) {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState<EntryFilter>('all')
  const [monthDate, setMonthDate] = useState(() => startOfMonth(new Date()))

  const today = useMemo(() => new Date(), [])
  const diaryParams = useMemo(
    () => ({ ...getMonthRange(monthDate), limit: 200 }),
    [monthDate],
  )
  const { data, isLoading, isError } = useGetDiary(diaryParams)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const months = useMemo(
    () => monthOptions(monthDate.getFullYear(), i18n.language, today),
    [i18n.language, monthDate, today],
  )
  const years = useMemo(() => yearOptions(today), [today])
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, { month: 'long' }).format(monthDate),
    [i18n.language, monthDate],
  )

  const sortedEntries = useMemo(
    () =>
      [...(data ?? [])].sort(
        (a, b) =>
          parseDiaryCreatedAt(b.createdAt).getTime() -
          parseDiaryCreatedAt(a.createdAt).getTime(),
      ),
    [data],
  )

  const visibleEntries = useMemo(() => {
    if (filter === 'selected') {
      return sortedEntries.filter((entry) => selectedSet.has(entry.id))
    }
    return sortedEntries
  }, [filter, selectedSet, sortedEntries])

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="label-caps text-sand">{t('collections.entriesSection')}</h2>
          <p className="text-sm text-muted">{t('collections.entriesSectionHint')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-body">
            {t('collections.selectedCount', { count: selectedIds.length })}
          </p>

          <div
            className="inline-flex rounded-full border border-warm-border bg-card-bg p-0.5"
            role="group"
            aria-label={t('collections.filterAria')}
          >
            <button
              type="button"
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
                filter === 'all'
                  ? 'bg-coral text-white'
                  : 'text-muted hover:text-ink',
              )}
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              {t('collections.filterAll')}
            </button>
            <button
              type="button"
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
                filter === 'selected'
                  ? 'bg-coral text-white'
                  : 'text-muted hover:text-ink',
              )}
              aria-pressed={filter === 'selected'}
              onClick={() => setFilter('selected')}
            >
              {t('collections.filterSelected')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PeriodDropdown
          label={monthLabel}
          value={String(monthDate.getMonth())}
          ariaLabel={t('collections.filterMonthAria')}
          options={months}
          onValueChange={(value) => {
            setMonthDate(
              clampToCurrentMonth(
                new Date(monthDate.getFullYear(), Number(value), 1),
                today,
              ),
            )
          }}
        />
        <PeriodDropdown
          label={String(monthDate.getFullYear())}
          value={String(monthDate.getFullYear())}
          ariaLabel={t('collections.filterYearAria')}
          triggerClassName="min-w-[5.5rem]"
          options={years}
          onValueChange={(value) => {
            setMonthDate(
              clampToCurrentMonth(
                new Date(Number(value), monthDate.getMonth(), 1),
                today,
              ),
            )
          }}
        />
      </div>

      {isLoading && (
        <div
          className="flex flex-col gap-2.5"
          aria-busy="true"
          aria-label={t('collections.entriesLoading')}
        >
          <Skeleton className="h-16 w-full rounded-[14px]" />
          <Skeleton className="h-16 w-full rounded-[14px]" />
          <Skeleton className="h-16 w-full rounded-[14px]" />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">{t('collections.entriesError')}</Alert>
      )}

      {!isLoading && !isError && sortedEntries.length === 0 && (
        <p className="text-sm text-muted">{t('collections.entriesMonthEmpty')}</p>
      )}

      {!isLoading &&
        !isError &&
        sortedEntries.length > 0 &&
        visibleEntries.length === 0 && (
          <p className="text-sm text-muted">
            {selectedIds.length > 0
              ? t('collections.entriesSelectedMonthEmpty')
              : t('collections.entriesSelectedEmpty')}
          </p>
        )}

      {!isLoading && !isError && visibleEntries.length > 0 && (
        <ItemGroup className="gap-2.5">
          {visibleEntries.map((entry) => (
            <CollectionDiaryPickItem
              key={entry.id}
              entry={entry}
              locale={i18n.language}
              selected={selectedSet.has(entry.id)}
              onToggle={onToggle}
            />
          ))}
        </ItemGroup>
      )}
    </section>
  )
}
