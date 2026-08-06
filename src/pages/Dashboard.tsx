import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import logo from '@/assets/logo.svg'
import { useGetDiary } from '@/api/diary/use-get-diary'
import { useUserInfo } from '@/api/user/use-user-info'
import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { DashboardProgressSection } from '@/components/DashboardProgressSection'
import { DraftEntryCard } from '@/components/DraftEntryCard'
import { EntryInspirationCard } from '@/components/EntryInspirationCard'
import { MoodOfTheMonth } from '@/components/MoodOfTheMonth'
import { DiaryEntryRow } from '@/components/DiaryEntryRow'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { getLastNDaysRange } from '@/lib/diary-date-range'
import { loadNewEntryDraft } from '@/lib/new-entry-draft'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'

function getGreetingKey():
  | 'dashboard.goodMorning'
  | 'dashboard.goodAfternoon'
  | 'dashboard.goodEvening' {
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

  const recentDiaryParams = useMemo(() => ({ ...getLastNDaysRange(7), limit: 100 }), [])
  const { data, isLoading, isError } = useGetDiary(recentDiaryParams)

  const recentEntries = useMemo(
    () =>
      [...(data ?? [])].sort(
        (a, b) =>
          parseDiaryCreatedAt(b.createdAt).getTime() - parseDiaryCreatedAt(a.createdAt).getTime()
      ),
    [data]
  )

  const name = user?.first_name ?? ''
  const greetingKey = useMemo(() => getGreetingKey(), [])
  const todayLabel = useMemo(() => formatTodayDate(i18n.language), [i18n.language])
  const hasDraft = useMemo(() => loadNewEntryDraft() !== null, [])

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-2 font-heading text-xl font-semibold text-ink md:hidden">
        <img src={logo} alt="" className="size-6 shrink-0" aria-hidden />
        <DearMelodyWordmark />
      </div>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-sand">{todayLabel}</p>
          <h1 className="mt-1 font-heading text-[2.125rem] font-semibold leading-tight text-ink sm:text-[2.125rem]">
            {t(greetingKey, { name })}
          </h1>
        </div>
      </header>

      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
        <div className="order-2 md:flex md:w-1/2">
          <MoodOfTheMonth />
        </div>
        <div className="order-1 md:flex md:w-1/2">
          {hasDraft ? <DraftEntryCard /> : <EntryInspirationCard />}
        </div>
      </div>

      <DashboardProgressSection userName={name} />

      <section className="space-y-3.5" aria-labelledby="recent-entries-heading">
        <h2
          id="recent-entries-heading"
          className="font-heading text-[1.375rem] font-semibold text-ink"
        >
          {t('dashboard.recentEntries')}
        </h2>

        {isLoading && (
          <div
            className="flex flex-col gap-2.5"
            aria-busy="true"
            aria-live="polite"
            aria-label={t('dashboard.recentEntriesLoading')}
          >
            <Skeleton className="h-16 w-full rounded-[18px]" />
            <Skeleton className="h-16 w-full rounded-[18px]" />
            <Skeleton className="h-16 w-full rounded-[18px]" />
          </div>
        )}

        {isError && <Alert variant="destructive">{t('dashboard.recentEntriesError')}</Alert>}

        {!isLoading && !isError && recentEntries.length === 0 && (
          <p className="text-sm text-muted">{t('dashboard.recentEntriesEmpty')}</p>
        )}

        {!isLoading && !isError && recentEntries.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {recentEntries.map((entry) => (
              <DiaryEntryRow key={entry.id} entry={entry} locale={i18n.language} />
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
