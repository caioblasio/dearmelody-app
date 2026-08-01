import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDashboardMetrics } from '@/api/dashboard/use-dashboard-metrics'
import { getMeloCardMeta, MeloMoodGenreCard } from '@/components/melo/MeloMoodGenrePoses'
import { Skeleton } from '@/components/ui/skeleton'
import { pickMeloCard, resolveMeloCardCandidates } from '@/lib/melo-weekly-card'

export function MoodOfTheMonth() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useDashboardMetrics()

  const candidates = useMemo(
    () =>
      resolveMeloCardCandidates(data?.weeklyMood.mood ?? null, data?.weeklyStyle.style ?? null),
    [data?.weeklyMood.mood, data?.weeklyStyle.style]
  )

  /** Fixed for this mount when both mood and genre match. */
  const [bothPrefer] = useState<'mood' | 'genre'>(() =>
    Math.random() < 0.5 ? 'mood' : 'genre'
  )

  const meta = useMemo(() => {
    if (!data || isError) return getMeloCardMeta('official')

    const resolved = pickMeloCard(
      candidates.mood,
      candidates.genre,
      candidates.mood && candidates.genre ? bothPrefer : null
    )

    if (resolved.kind === 'official') return getMeloCardMeta('official')
    return getMeloCardMeta(resolved.kind, resolved.key)
  }, [bothPrefer, candidates.genre, candidates.mood, data, isError])

  if (isLoading) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 md:gap-4 md:p-6"
        aria-busy="true"
        aria-live="polite"
        aria-label={t('dashboard.weeklyMeloLoading')}
      >
        <Skeleton className="aspect-[290/274] w-full max-w-[290px] rounded-3xl" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-48" />
      </div>
    )
  }

  const ariaLabel =
    meta.kind === 'official'
      ? t('dashboard.weeklyMeloOfficial')
      : meta.kind === 'mood'
        ? t('dashboard.weeklyMeloMood', { mood: meta.title })
        : t('dashboard.weeklyMeloGenre', { genre: meta.title })

  return (
    <div aria-label={ariaLabel}>
      <MeloMoodGenreCard meta={meta} />
    </div>
  )
}
