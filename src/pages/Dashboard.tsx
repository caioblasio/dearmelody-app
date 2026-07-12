import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { useUserInfo } from '@/api/user/use-user-info'
import { EntryInspirationCard } from '@/components/EntryInspirationCard'
import { RecentEntryRow } from '@/components/RecentEntryRow'
import { getLastNDaysRange } from '@/lib/diary-date-range'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'

function getGreetingKey(): 'dashboard.goodMorning' | 'dashboard.goodAfternoon' | 'dashboard.goodEvening' {
  const hour = new Date().getHours()
  if (hour < 12) return 'dashboard.goodMorning'
  if (hour < 17) return 'dashboard.goodAfternoon'
  return 'dashboard.goodEvening'
}

function formatTodayDate(locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

export function DashboardPage() {
  const { t, i18n } = useTranslation()
  const { data: user } = useUserInfo()

  const recentDiaryParams = useMemo(
    () => ({ ...getLastNDaysRange(7), limit: 100 }),
    [],
  )
  const { data, isLoading, isError } = useGetDiary(recentDiaryParams)

  const recentEntries = useMemo(
    () =>
      [...(data ?? [])].sort(
        (a, b) =>
          parseDiaryCreatedAt(b.createdAt).getTime() - parseDiaryCreatedAt(a.createdAt).getTime(),
      ),
    [data],
  )

  const name = user?.first_name ?? ''
  const greetingKey = useMemo(() => getGreetingKey(), [])
  const todayLabel = useMemo(() => formatTodayDate(i18n.language), [i18n.language])

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-sand">{todayLabel}</p>
          <h1 className="mt-1 font-heading text-[2.125rem] font-semibold leading-tight text-ink sm:text-[2.125rem]">
            {t(greetingKey, { name })}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-warm-border bg-card-bg px-4 py-2">
            <span className="size-2.5 rounded-full bg-butter" aria-hidden />
            <span className="text-sm font-bold text-ink">{t('dashboard.streak', { days: 7 })}</span>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-plum font-heading text-sm font-semibold text-butter">
            {name ? `${name[0]?.toLowerCase()}m` : 'dm'}
          </div>
        </div>
      </header>

      <EntryInspirationCard />

      <section className="space-y-3.5" aria-labelledby="recent-entries-heading">
        <h2 id="recent-entries-heading" className="font-heading text-[1.375rem] font-semibold text-ink">
          {t('dashboard.recentEntries')}
        </h2>

        {isLoading && (
          <p className="text-sm text-muted" role="status" aria-live="polite">
            {t('dashboard.recentEntriesLoading')}
          </p>
        )}

        {isError && (
          <p className="text-sm text-error" role="alert">
            {t('dashboard.recentEntriesError')}
          </p>
        )}

        {!isLoading && !isError && recentEntries.length === 0 && (
          <p className="text-sm text-muted">{t('dashboard.recentEntriesEmpty')}</p>
        )}

        {!isLoading && !isError && recentEntries.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {recentEntries.map((entry) => (
              <RecentEntryRow key={entry.id} entry={entry} locale={i18n.language} />
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
