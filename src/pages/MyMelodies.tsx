import type { TFunction } from 'i18next'
import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
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
  t: TFunction
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
    <div className="mb-6 flex items-center gap-4 lg:mb-8 lg:block lg:border-b lg:border-outline-variant/35 lg:pb-2">
      <h2
        id={id}
        className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-primary lg:text-sm lg:font-semibold lg:normal-case lg:tracking-wide lg:text-on-surface-variant"
      >
        {label}
      </h2>
      <div className="h-px flex-1 bg-primary/15 lg:hidden" aria-hidden />
    </div>
  )
}

export function MyMelodiesPage() {
  const { t, i18n } = useTranslation()

  const { data, isLoading, isError } = useGetDiary()
  const groupedEntries = useMemo(
    () => groupDiaryEntriesByMonth(data ?? [], i18n.language, t),
    [data, i18n.language, t]
  )

  return (
    <div className="space-y-8 pb-28">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">
          {t('pastMelodies.title')}
        </h1>
        <p className="italic text-on-surface-variant">{t('pastMelodies.subtitle')}</p>
      </header>

      <div>
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

      <Link
        to="/new-entry"
        aria-label={t('aria.recordMemory')}
        className="fixed bottom-8 right-5 z-40 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary text-on-primary shadow-[0_10px_30px_rgba(107,86,119,0.35)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 lg:h-auto lg:w-auto lg:gap-2 lg:px-5 lg:py-3 lg:text-sm lg:font-semibold lg:hover:-translate-y-0.5 lg:hover:scale-[1.02]"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/10 to-white/20" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/80" />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-white/60" />
        <Plus className="relative z-[1] size-6 shrink-0 lg:size-4" aria-hidden />
        <span className="relative z-[1] hidden lg:inline">{t('pastMelodies.recordMemory')}</span>
      </Link>
    </div>
  )
}
