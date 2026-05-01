import { CalendarDays, ChevronDown, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { PastMelodyGridCard } from '@/components/PastMelodyGridCard'
import { PastMelodyListCard } from '@/components/PastMelodyListCard'
import { Input } from '@/components/ui/input'
import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { cn } from '@/lib/utils'

type FilterId = 'all' | 'month' | 'favorites' | 'melancholy'
type AggregationMode = 'week' | 'month'

const FILTER_CHIPS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Time' },
  { id: 'month', label: 'This Month' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'melancholy', label: 'Melancholy' },
]

const AGGREGATION_OPTIONS: { id: AggregationMode; label: string }[] = [
  { id: 'week', label: 'By Week' },
  { id: 'month', label: 'By Month' },
]

const MOCK_MONTH_FOCUS = '2023-10'

type DiaryGroup = {
  key: string
  label: string
  items: PastMelodyEntry[]
  moodLabel: string
}

function applyFilter(entries: PastMelodyEntry[], filter: FilterId): PastMelodyEntry[] {
  switch (filter) {
    case 'month':
      return entries.filter((e) => e.monthKey === MOCK_MONTH_FOCUS)
    case 'favorites':
      return entries.filter((e) => e.favorite)
    case 'melancholy':
      return entries.filter((e) => e.moodLabel.toLowerCase() === 'melancholy')
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

function parseEntryDate(entry: PastMelodyEntry): Date {
  const parsed = new Date(entry.dateLabel)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

function startOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - day)
  return d
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
}

function formatWeekLabel(date: Date): string {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const startLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
    start
  )
  const endLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(end)
  return `Week of ${startLabel} - ${endLabel}, ${start.getFullYear()}`
}

function getTopMood(entries: PastMelodyEntry[]): string {
  const counters = entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.moodLabel] = (acc[entry.moodLabel] ?? 0) + 1
    return acc
  }, {})
  const top = Object.entries(counters).sort((a, b) => b[1] - a[1])[0]
  return top?.[0] ?? 'Mixed'
}

function groupDiaryEntries(entries: PastMelodyEntry[], mode: AggregationMode): DiaryGroup[] {
  const grouped = entries.reduce<Map<string, DiaryGroup>>((acc, entry) => {
    const date = parseEntryDate(entry)
    const key =
      mode === 'month'
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        : startOfWeek(date).toISOString().slice(0, 10)
    const label = mode === 'month' ? formatMonthLabel(date) : formatWeekLabel(date)

    const existing = acc.get(key)
    if (existing) {
      existing.items.push(entry)
      existing.moodLabel = getTopMood(existing.items)
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
    const dateA = parseEntryDate(a.items[0]).getTime()
    const dateB = parseEntryDate(b.items[0]).getTime()
    return dateB - dateA
  })
}

export function MyMelodiesPage() {
  const { data, isLoading, isError } = useGetDiary()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')
  const [aggregationMode, setAggregationMode] = useState<AggregationMode>('week')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const entries = data?.entries ?? []

  const filtered = useMemo(() => {
    const afterFilter = applyFilter(entries, filter)
    return afterFilter.filter((e) => matchesSearch(e, search))
  }, [entries, filter, search])

  const groupedEntries = useMemo(
    () => groupDiaryEntries(filtered, aggregationMode),
    [aggregationMode, filtered]
  )

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }))
  }

  return (
    <div className="space-y-8 pb-28">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">
          Past Melodies
        </h1>
        <p className="italic text-on-surface-variant">
          A chronological journey through your musical soul.
        </p>
      </header>

      <section className="space-y-4">
        <div className="space-y-4 lg:hidden">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-outline"
              aria-hidden
            />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search melodies..."
              className="h-12 rounded-xl border-0 bg-surface-container-lowest pl-11 shadow-[0_4px_12px_rgba(107,86,119,0.06)] focus-visible:ring-1 focus-visible:ring-primary-container"
              aria-label="Search melodies"
            />
          </div>

          <div className="inline-flex rounded-full bg-surface-container p-1">
            {AGGREGATION_OPTIONS.map((option) => {
              const selected = aggregationMode === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAggregationMode(option.id)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] transition-colors',
                    selected
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  )}
                >
                  <CalendarDays className="size-3.5" aria-hidden />
                  {option.label}
                </button>
              )
            })}
          </div>

          <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto pb-2">
            {FILTER_CHIPS.map((chip) => {
              const selected = filter === chip.id
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.05em] transition-colors',
                    selected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                  )}
                >
                  {chip.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="hidden items-start gap-4 lg:grid lg:grid-cols-[auto_minmax(260px,1fr)_auto]">
          <div className="inline-flex rounded-full bg-surface-container p-1">
            {AGGREGATION_OPTIONS.map((option) => {
              const selected = aggregationMode === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAggregationMode(option.id)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] transition-colors',
                    selected
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  )}
                >
                  <CalendarDays className="size-3.5" aria-hidden />
                  {option.label}
                </button>
              )
            })}
          </div>

          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-outline"
              aria-hidden
            />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search melodies..."
              className="h-11 rounded-xl border-0 bg-surface-container-lowest pl-11 shadow-[0_4px_12px_rgba(107,86,119,0.06)] focus-visible:ring-1 focus-visible:ring-primary-container"
              aria-label="Search melodies"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {FILTER_CHIPS.map((chip) => {
              const selected = filter === chip.id
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.05em] transition-colors',
                    selected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                  )}
                >
                  {chip.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {isLoading && (
        <p className="text-sm text-on-surface-variant" role="status" aria-live="polite">
          Loading your melodies...
        </p>
      )}

      {isError && (
        <p className="text-sm text-error" role="alert">
          Could not load diary entries. Please try again.
        </p>
      )}

      {groupedEntries.length === 0 && !isLoading && (
        <p className="text-center text-sm text-on-surface-variant">
          No melodies match your filters.
        </p>
      )}

      <div className="space-y-5">
        {groupedEntries.map((group) => {
          const isCollapsed = collapsedGroups[group.key] ?? false

          return (
            <section
              key={group.key}
              className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest/70"
            >
              <button
                type="button"
                onClick={() => toggleGroup(group.key)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
                aria-expanded={!isCollapsed}
              >
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-semibold text-primary">{group.label}</h2>
                  <p className="text-sm text-on-surface-variant">
                    {group.items.length} {group.items.length > 1 ? 'melodies' : 'melody'} - Top
                    mood: <span className="font-medium text-primary">{group.moodLabel}</span>
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'size-5 text-on-surface-variant transition-transform',
                    isCollapsed && '-rotate-90'
                  )}
                  aria-hidden
                />
              </button>

              {!isCollapsed && (
                <div className="space-y-6 px-4 pb-4 sm:px-5 sm:pb-5">
                  <div className="space-y-6 lg:hidden">
                    {group.items.map((entry) => (
                      <PastMelodyListCard key={entry.id} entry={entry} />
                    ))}
                  </div>

                  <div className="hidden gap-6 lg:grid lg:grid-cols-3">
                    {group.items.map((entry) => (
                      <PastMelodyGridCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )
        })}
      </div>

      <Link
        to="/new-entry"
        aria-label="Record a New Memory"
        className="fixed bottom-0 right-5 z-40 hidden items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-[0_10px_30px_rgba(107,86,119,0.35)] backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 lg:inline-flex"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/10 to-white/20" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/80" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-white/60" />
        <Plus className="size-4" aria-hidden />
        <span className="relative">Record a New Memory</span>
      </Link>

      <Link
        to="/new-entry"
        aria-label="Record a New Memory"
        className="fixed bottom-20 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-[0_10px_30px_rgba(107,86,119,0.35)] backdrop-blur-sm transition-transform hover:scale-[1.01] active:scale-95 lg:hidden"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/10 to-white/20" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/80" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-white/60" />
        <Plus className="size-4" aria-hidden />
        <span className="relative">Record a New Memory</span>
      </Link>
    </div>
  )
}
