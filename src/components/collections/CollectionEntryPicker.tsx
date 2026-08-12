import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { CollectionDiaryPickItem } from '@/components/collections/CollectionDiaryPickItem'
import { Alert } from '@/components/ui/alert'
import { ItemGroup } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { cn } from '@/lib/utils'

type EntryFilter = 'all' | 'selected'

type CollectionEntryPickerProps = {
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function CollectionEntryPicker({
  selectedIds,
  onToggle,
}: CollectionEntryPickerProps) {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState<EntryFilter>('all')

  const { data, isLoading, isError } = useGetDiary({ limit: 100 })

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

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
        <p className="text-sm text-muted">{t('collections.entriesEmpty')}</p>
      )}

      {!isLoading &&
        !isError &&
        sortedEntries.length > 0 &&
        visibleEntries.length === 0 && (
          <p className="text-sm text-muted">{t('collections.entriesSelectedEmpty')}</p>
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
