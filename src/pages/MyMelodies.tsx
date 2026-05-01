import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { PastMelodyGridCard } from '@/components/PastMelodyGridCard'
import { PastMelodyListCard } from '@/components/PastMelodyListCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { cn } from '@/lib/utils'

type FilterId = 'all' | 'month' | 'favorites' | 'melancholy'

const FILTER_CHIPS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Time' },
  { id: 'month', label: 'This Month' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'melancholy', label: 'Melancholy' },
]

const MOCK_MONTH_FOCUS = '2023-10'
const PAGE_SIZE = 3

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

export function MyMelodiesPage() {
  const { data, isLoading, isError } = useGetDiary()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const entries = data?.entries ?? []

  const filtered = useMemo(() => {
    const afterFilter = applyFilter(entries, filter)
    return afterFilter.filter((e) => matchesSearch(e, search))
  }, [entries, filter, search])

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])

  const canLoadMore = visibleCount < filtered.length

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">Past Melodies</h1>
        <p className="italic text-on-surface-variant">
          A chronological journey through your musical soul.
        </p>
      </header>

      {/* Mobile / tablet: search + chips (Stitch “Past Melodies (Mobile)”) */}
      <section className="space-y-4 lg:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-outline"
            aria-hidden
          />
          <Input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="Search melodies..."
            className="h-12 rounded-xl border-0 bg-surface-container-lowest pl-11 shadow-[0_4px_12px_rgba(107,86,119,0.06)] focus-visible:ring-1 focus-visible:ring-primary-container"
            aria-label="Search melodies"
          />
        </div>
        <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto pb-2">
          {FILTER_CHIPS.map((chip) => {
            const selected = filter === chip.id
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setFilter(chip.id)
                  setVisibleCount(PAGE_SIZE)
                }}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.05em] transition-colors',
                  selected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container',
                )}
              >
                {chip.label}
              </button>
            )
          })}
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

      {/* Mobile list */}
      <div className="space-y-6 lg:hidden">
        {visible.map((entry) => (
          <PastMelodyListCard key={entry.id} entry={entry} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-on-surface-variant">No melodies match your filters.</p>
        )}
      </div>

      {/* Desktop grid (Stitch “Past Melodies”) */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-3">
        {visible.map((entry) => (
          <PastMelodyGridCard key={entry.id} entry={entry} />
        ))}

        <Link
          to="/new-entry"
          className="group flex min-h-[280px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-outline-variant p-8 transition-colors hover:bg-surface-container-low"
        >
          <div className="space-y-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary-container/40 text-primary transition-transform group-hover:scale-110">
              <Plus className="size-8" aria-hidden />
            </div>
            <span className="block font-serif text-lg text-primary">Record a New Memory</span>
          </div>
        </Link>
      </div>

      <div className="flex justify-center pt-2">
        <Button
          type="button"
          size="lg"
          className={cn(
            'rounded-full px-10 font-serif text-lg shadow-lg shadow-primary/20',
            filtered.length === 0 && 'pointer-events-none opacity-40',
          )}
          disabled={!canLoadMore || filtered.length === 0}
          onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))}
        >
          Load More Memories
        </Button>
      </div>
    </div>
  )
}
