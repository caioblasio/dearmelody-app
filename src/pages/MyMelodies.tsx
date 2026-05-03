import type { TFunction } from 'i18next'
import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { DiaryAggregationTabs } from '@/components/diary/DiaryAggregationTabs'
import type { DiaryAggregationTabId } from '@/components/diary/diary-aggregation-types'
import { DiaryNotebookShell } from '@/components/diary/DiaryNotebookShell'
import { DiarySection } from '@/components/diary/DiarySection'
import { Input } from '@/components/ui/input'
import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { parsePastMelodyEntryDate } from '@/lib/past-melody-date'
import { cn } from '@/lib/utils'

const FILTER_IDS = ['all', 'thisMonth', 'favorites', 'melancholy'] as const
type FilterId = (typeof FILTER_IDS)[number]

const MOCK_MONTH_FOCUS = '2023-10'

type DiaryGroup = {
  key: string
  label: string
  items: PastMelodyEntry[]
  moodLabel: string
}

const searchNotebookClass =
  'h-12 w-full rounded-lg border border-outline-variant/55 bg-white/45 pl-10 pr-3 text-on-surface shadow-none outline-none placeholder:text-on-surface-variant/65 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/25 lg:h-11 lg:pl-10'

function filterChipClass(selected: boolean) {
  return cn(
    'shrink-0 rounded-md border px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors sm:text-xs',
    selected
      ? 'border-primary/75 bg-primary/[0.07] text-primary'
      : 'border-transparent text-on-surface-variant hover:border-outline-variant/50 hover:bg-white/50',
  )
}

function applyFilter(entries: PastMelodyEntry[], filter: FilterId): PastMelodyEntry[] {
  switch (filter) {
    case 'thisMonth':
      return entries.filter((e) => e.monthKey === MOCK_MONTH_FOCUS)
    case 'favorites':
      return entries.filter((e) => e.favorite)
    case 'melancholy':
      return entries.filter((e) => e.moodIcon === 'melancholy')
    case 'all':
    default:
      return entries
  }
}

function matchesSearch(entry: PastMelodyEntry, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const blob = [entry.title, entry.excerpt, entry.trackTitle, entry.trackArtist, entry.moodLabel]
    .join(' ')
    .toLowerCase()
  return blob.includes(q)
}

function startOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - day)
  return d
}

function formatMonthLabel(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)
}

function formatWeekLabel(date: Date, locale: string, t: TFunction): string {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const startLabel = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(
    start
  )
  const endLabel = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(end)

  return t('pastMelodies.weekLabel', {
    start: startLabel,
    end: endLabel,
    year: start.getFullYear(),
  })
}

function getTopMood(entries: PastMelodyEntry[], t: TFunction): string {
  const counters = entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.moodLabel] = (acc[entry.moodLabel] ?? 0) + 1
    return acc
  }, {})
  const top = Object.entries(counters).sort((a, b) => b[1] - a[1])[0]
  return top?.[0] ?? t('pastMelodies.mixedMood')
}

function groupDiaryEntries(
  entries: PastMelodyEntry[],
  mode: DiaryAggregationTabId,
  locale: string,
  t: TFunction
): DiaryGroup[] {
  const grouped = entries.reduce<Map<string, DiaryGroup>>((acc, entry) => {
    const date = parsePastMelodyEntryDate(entry)
    const key =
      mode === 'month'
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        : startOfWeek(date).toISOString().slice(0, 10)
    const label =
      mode === 'month' ? formatMonthLabel(date, locale) : formatWeekLabel(date, locale, t)

    const existing = acc.get(key)
    if (existing) {
      existing.items.push(entry)
      existing.moodLabel = getTopMood(existing.items, t)
      return acc
    }

    acc.set(key, {
      key,
      label,
      items: [entry],
      moodLabel: entry.moodLabel,
    })
    return acc
  }, new Map<string, DiaryGroup>())

  return [...grouped.values()].sort((a, b) => {
    const dateA = parsePastMelodyEntryDate(a.items[0]).getTime()
    const dateB = parsePastMelodyEntryDate(b.items[0]).getTime()
    return dateB - dateA
  })
}

export function MyMelodiesPage() {
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError } = useGetDiary()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')
  const [aggregationMode, setAggregationMode] = useState<DiaryAggregationTabId>('week')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const entriesList = data?.entries

  const filtered = useMemo(() => {
    const entries = entriesList ?? []
    const afterFilter = applyFilter(entries, filter)
    return afterFilter.filter((e) => matchesSearch(e, search))
  }, [entriesList, filter, search])

  const groupedEntries = useMemo(
    () => groupDiaryEntries(filtered, aggregationMode, i18n.language, t),
    [aggregationMode, filtered, i18n.language, t]
  )

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }))
  }

  return (
    <div className="space-y-8 pb-28">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">
          {t('pastMelodies.title')}
        </h1>
        <p className="italic text-on-surface-variant">{t('pastMelodies.subtitle')}</p>
      </header>

      <DiaryNotebookShell>
        <div className="space-y-4 py-4 pr-2 sm:py-5 sm:pr-3 lg:space-y-5 lg:pb-6 lg:pt-5">
          <div className="space-y-4 lg:hidden">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-outline"
                aria-hidden
              />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('pastMelodies.searchPlaceholder')}
                className={searchNotebookClass}
                aria-label={t('aria.searchMelodies')}
              />
            </div>

            <DiaryAggregationTabs value={aggregationMode} onChange={setAggregationMode} />

            <div className="scrollbar-hide -mx-0.5 flex gap-2 overflow-x-auto pb-0.5">
              {FILTER_IDS.map((id) => {
                const selected = filter === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFilter(id)}
                    className={filterChipClass(selected)}
                  >
                    {t(`pastMelodies.filters.${id}`)}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-primary/12 pb-3">
              <DiaryAggregationTabs
                value={aggregationMode}
                onChange={setAggregationMode}
                className="min-w-0 flex-1 border-b-0 pb-0"
              />
              <div className="flex max-w-full flex-wrap justify-end gap-2">
                {FILTER_IDS.map((id) => {
                  const selected = filter === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFilter(id)}
                      className={filterChipClass(selected)}
                    >
                      {t(`pastMelodies.filters.${id}`)}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-4">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 z-[1] size-4 -translate-y-1/2 text-outline"
                  aria-hidden
                />
                <Input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('pastMelodies.searchPlaceholder')}
                  className={searchNotebookClass}
                  aria-label={t('aria.searchMelodies')}
                />
              </div>
            </div>
          </div>

          {isLoading && (
            <p className="text-sm text-on-surface-variant" role="status" aria-live="polite">
              {t('pastMelodies.loading')}
            </p>
          )}

          {isError && (
            <p className="text-sm text-error" role="alert">
              {t('pastMelodies.error')}
            </p>
          )}

          {groupedEntries.length === 0 && !isLoading && (
            <p className="text-center text-sm text-on-surface-variant">{t('pastMelodies.empty')}</p>
          )}

          {groupedEntries.length > 0 && !isLoading && (
            <div className="space-y-0 divide-y divide-dashed divide-primary/18 pt-1">
              {groupedEntries.map((group) => {
                const isCollapsed = collapsedGroups[group.key] ?? false

                return (
                  <DiarySection
                    key={group.key}
                    groupKey={group.key}
                    label={group.label}
                    items={group.items}
                    moodLabel={group.moodLabel}
                    locale={i18n.language}
                    isCollapsed={isCollapsed}
                    onToggle={() => toggleGroup(group.key)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </DiaryNotebookShell>

      <Link
        to="/new-entry"
        aria-label={t('aria.recordMemory')}
        className="fixed bottom-0 right-5 z-40 hidden items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-[0_10px_30px_rgba(107,86,119,0.35)] backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 lg:inline-flex"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/10 to-white/20" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/80" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-white/60" />
        <Plus className="size-4" aria-hidden />
        <span className="relative">{t('pastMelodies.recordMemory')}</span>
      </Link>

      <Link
        to="/new-entry"
        aria-label={t('aria.recordMemory')}
        className="fixed bottom-8 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-[0_10px_30px_rgba(107,86,119,0.35)] backdrop-blur-sm transition-transform hover:scale-[1.01] active:scale-95 lg:hidden"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/10 to-white/20" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/80" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-white/60" />
        <Plus className="size-4" aria-hidden />
        <span className="relative">{t('pastMelodies.recordMemory')}</span>
      </Link>
    </div>
  )
}
