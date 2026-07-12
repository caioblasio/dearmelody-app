import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { useGetDiary } from '@/api/diary/use-get-diary'
import { PastMelodyArchiveCard } from '@/components/PastMelodyArchiveCard'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { capitalizeMood } from '@/lib/past-melody-mood'

type DiaryGroup = {
  key: string
  label: string
  items: DiaryListItem[]
  moodLabel: string
}

function formatMonthLabel(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)
}

function getTopMood(entries: DiaryListItem[], t: TFunction): string {
  const counters = entries.reduce<Record<string, number>>((acc, entry) => {
    const label = capitalizeMood(entry.mood)
    acc[label] = (acc[label] ?? 0) + 1
    return acc
  }, {})
  const top = Object.entries(counters).sort((a, b) => b[1] - a[1])[0]
  return top?.[0] ?? t('pastMelodies.mixedMood')
}

function groupDiaryEntriesByMonth(
  entries: DiaryListItem[],
  locale: string,
  t: TFunction,
): DiaryGroup[] {
  const grouped = entries.reduce<Map<string, DiaryGroup>>((acc, entry) => {
    const date = parseDiaryCreatedAt(entry.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const label = formatMonthLabel(date, locale)

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
      moodLabel: capitalizeMood(entry.mood),
    })
    return acc
  }, new Map<string, DiaryGroup>())

  return [...grouped.values()].sort((a, b) => {
    const dateA = parseDiaryCreatedAt(a.items[0].createdAt).getTime()
    const dateB = parseDiaryCreatedAt(b.items[0].createdAt).getTime()
    return dateB - dateA
  })
}

function ArchiveGroupHeading({ id, label }: { id: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 lg:mb-8 lg:block lg:border-b lg:border-warm-border lg:pb-2">
      <h2
        id={id}
        className="shrink-0 font-heading text-lg font-semibold text-ink lg:text-xl"
      >
        {label}
      </h2>
      <div className="h-px flex-1 bg-warm-border lg:hidden" aria-hidden />
    </div>
  )
}

export function MyMelodiesPage() {
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError } = useGetDiary()
  const groupedEntries = useMemo(
    () => groupDiaryEntriesByMonth(data ?? [], i18n.language, t),
    [data, i18n.language, t],
  )

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {t('pastMelodies.title')}
        </h1>
        <p className="text-muted">{t('pastMelodies.subtitle')}</p>
      </header>

      <div>
        {isLoading && (
          <p className="text-sm text-muted" role="status" aria-live="polite">
            {t('pastMelodies.loading')}
          </p>
        )}

        {isError && (
          <p className="text-sm text-error" role="alert">
            {t('pastMelodies.error')}
          </p>
        )}

        {groupedEntries.length === 0 && !isLoading && (
          <p className="text-center text-sm text-muted">{t('pastMelodies.empty')}</p>
        )}

        {groupedEntries.length > 0 && !isLoading && (
          <div className="space-y-10 lg:space-y-14">
            {groupedEntries.map((group) => (
              <section key={group.key} aria-labelledby={`archive-group-${group.key}`}>
                <ArchiveGroupHeading id={`archive-group-${group.key}`} label={group.label} />
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 lg:gap-8">
                  {group.items.map((entry) => (
                    <PastMelodyArchiveCard key={entry.id} entry={entry} locale={i18n.language} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
