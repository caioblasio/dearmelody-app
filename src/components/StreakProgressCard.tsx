import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useDashboardMetrics } from '@/api/dashboard/use-dashboard-metrics'
import { MeloLevelAvatar } from '@/components/MeloLevelAvatar'
import { Skeleton } from '@/components/ui/skeleton'
import { getWeekdayLabels } from '@/lib/diary-calendar'
import { computeWeekRowFromHistory, getMeloStreakCopy, type WeekDayState } from '@/lib/diary-streak'
import { cn } from '@/lib/utils'

type StreakProgressCardProps = {
  userName: string
  className?: string
}

const WEEK_DAY_CIRCLE_CLASSES: Record<WeekDayState, string> = {
  completed: 'border-[3px] border-card-bg/90 bg-card-bg/90 text-[#B3651F]',
  today: 'border-[3px] border-card-bg/90 bg-coral text-on-primary',
  pending: 'border-[3px] border-transparent bg-card-bg/35 text-butter-deep/50',
}

function StreakProgressCardSkeleton({
  userName,
  weekdayLabels,
}: {
  userName: string
  weekdayLabels: string[]
}) {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex items-center gap-5">
        <Skeleton className="size-[72px] shrink-0 rounded-full bg-card-bg/55 sm:size-[92px]" />
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-semibold text-[#5A3A10] sm:text-[1.625rem]">
            {t('dashboard.progress.streakTitle', { name: userName })}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#7A5A16] sm:text-[15px]">
            {t('dashboard.progress.streakSubtitle')}
          </p>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-2.5">
        {weekdayLabels.map((label, index) => (
          <div key={`${label}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <Skeleton className="size-10 rounded-full bg-card-bg/55 sm:size-[46px]" />
            <span className="text-xs font-bold text-[#7A5A16]">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 rounded-[20px] bg-card-bg/75 px-5 py-4 sm:gap-[18px] sm:px-6">
        <Skeleton className="size-14 shrink-0 rounded-full bg-outline-variant/30 sm:size-16" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-outline-variant/30" />
          <Skeleton className="h-3.5 w-full bg-outline-variant/25" />
        </div>
      </div>
    </>
  )
}

export function StreakProgressCard({ userName, className }: StreakProgressCardProps) {
  const { t, i18n } = useTranslation()
  const { data, isLoading } = useDashboardMetrics()

  const weekdayLabels = useMemo(
    () => getWeekdayLabels(i18n.language, 'narrow'),
    [i18n.language]
  )
  const streakDays = data?.streak.streak ?? 0
  const weekRow = useMemo(
    () => computeWeekRowFromHistory(data?.streak.history ?? [], i18n.language),
    [data?.streak.history, i18n.language]
  )
  const meloCopy = useMemo(() => getMeloStreakCopy(streakDays), [streakDays])

  return (
    <div
      className={cn(
        'flex flex-col gap-5 rounded-[26px] bg-gradient-to-br from-butter to-coral-light p-6 sm:gap-[22px] sm:p-[34px]',
        className
      )}
      aria-busy={isLoading || undefined}
      aria-live={isLoading ? 'polite' : undefined}
      aria-label={isLoading ? t('dashboard.progress.streakLoading') : undefined}
    >
      {isLoading ? (
        <StreakProgressCardSkeleton userName={userName} weekdayLabels={weekdayLabels} />
      ) : (
        <>
          <div className="flex items-center gap-5">
            <div className="flex size-[72px] shrink-0 flex-col items-center justify-center rounded-full bg-card-bg/90 sm:size-[92px]">
              <span className="font-heading text-[1.75rem] font-bold leading-none text-[#B3651F] sm:text-[2.125rem]">
                {streakDays}
              </span>
              <span className="text-[11px] font-bold tracking-wide text-[#B3651F]">
                {t('dashboard.progress.daysLabel')}
              </span>
            </div>

            <div className="min-w-0">
              <h2 className="font-heading text-xl font-semibold text-[#5A3A10] sm:text-[1.625rem]">
                {t('dashboard.progress.streakTitle', { name: userName })}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#7A5A16] sm:text-[15px]">
                {t('dashboard.progress.streakSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-2.5">
            {weekRow.map((day, index) => (
              <div key={`${day.label}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full font-heading text-[17px] font-bold sm:size-[46px]',
                    WEEK_DAY_CIRCLE_CLASSES[day.state]
                  )}
                  aria-hidden
                >
                  {day.mark}
                </div>
                <span className="text-xs font-bold text-[#7A5A16]">{day.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 rounded-[20px] bg-card-bg/75 px-5 py-4 sm:gap-[18px] sm:px-6">
            <MeloLevelAvatar level={meloCopy.level} className="size-14 sm:size-16" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#5A3A10] sm:text-[15px]">{t(meloCopy.titleKey)}</p>
              <p className="mt-0.5 text-[13px] text-[#7A5A16] sm:text-[13.5px]">
                {t(meloCopy.nextKey)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
