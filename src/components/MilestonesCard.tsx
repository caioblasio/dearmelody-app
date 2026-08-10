import { Trans, useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'

import type { Achievement } from '@/api/dashboard/dashboard-metrics'
import { useDashboardMetrics } from '@/api/dashboard/use-dashboard-metrics'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const UNEARNED_COLOR = '#D8CDBF'
const MILESTONE_SKELETON_COUNT = 6

const ACHIEVEMENT_STYLE: Record<string, { icon: string; color: string }> = {
  first_song: { icon: '♪', color: '#FF7A59' },
  one_week: { icon: '7', color: '#FFD66B' },
  night_owl: { icon: '✦', color: '#8B5BB0' },
  one_month: { icon: '30', color: '#FFD66B' },
  full_spectrum: { icon: '❋', color: '#8B5BB0' },
  renaissance_composer: { icon: '♬', color: '#FF7A59' },
}

const FALLBACK_STYLE = { icon: '★', color: '#FF7A59' }

function getAchievementStyle(code: string) {
  return ACHIEVEMENT_STYLE[code] ?? FALLBACK_STYLE
}

function formatEarnedAt(earnedAt: string, locale: string): string {
  const date = new Date(earnedAt)
  if (Number.isNaN(date.getTime())) return earnedAt
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date)
}

function getAchievementName(achievement: Achievement, t: TFunction): string {
  return t(`dashboard.progress.achievements.${achievement.code}.name`, {
    defaultValue: achievement.name,
  })
}

function getAchievementSub(achievement: Achievement, t: TFunction, locale: string): string {
  if (achievement.earned && achievement.earnedAt) {
    return formatEarnedAt(achievement.earnedAt, locale)
  }
  return t(`dashboard.progress.achievements.${achievement.code}.description`, {
    defaultValue: achievement.description,
  })
}

function MilestoneSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[20px] border border-warm-border bg-card-bg px-2 py-3 sm:gap-2 sm:px-2.5 sm:py-3.5">
      <Skeleton className="size-9 rounded-full sm:size-10" />
      <div className="flex w-full flex-col items-center gap-1.5">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-2.5 w-10" />
      </div>
    </div>
  )
}

type MilestonesCardProps = {
  className?: string
}

export function MilestonesCard({ className }: MilestonesCardProps) {
  const { t, i18n } = useTranslation()
  const { data, isLoading } = useDashboardMetrics()
  const achievements = data?.achievements ?? []

  return (
    <div
      className={cn('flex flex-col gap-4', className)}
      aria-busy={isLoading || undefined}
      aria-live={isLoading ? 'polite' : undefined}
      aria-label={isLoading ? t('dashboard.progress.milestonesLoading') : undefined}
    >
      <h2 className="font-heading text-2xl font-semibold text-ink">
        {t('dashboard.progress.milestonesTitle')}
      </h2>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {isLoading
          ? Array.from({ length: MILESTONE_SKELETON_COUNT }, (_, index) => (
              <MilestoneSkeleton key={index} />
            ))
          : achievements.map((badge) => {
              const style = getAchievementStyle(badge.code)
              const color = badge.earned ? style.color : UNEARNED_COLOR

              return (
                <div
                  key={badge.code}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-[20px] border border-warm-border bg-card-bg px-2 py-3 sm:gap-2 sm:px-2.5 sm:py-3.5',
                    !badge.earned && 'opacity-45',
                  )}
                >
                  <div
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full font-heading text-base font-bold sm:size-10 sm:text-lg',
                      badge.earned ? 'text-on-primary' : 'text-body',
                    )}
                    style={{ backgroundColor: color }}
                    aria-hidden
                  >
                    {style.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold leading-tight text-ink sm:text-[13px]">
                      {getAchievementName(badge, t)}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-muted sm:text-[11px]">
                      {getAchievementSub(badge, t, i18n.language)}
                    </p>
                  </div>
                </div>
              )
            })}
      </div>

      <div className="mt-auto flex items-center gap-3.5 rounded-[20px] bg-plum-bg px-5 py-4 sm:gap-3.5 sm:px-[22px] sm:py-[18px]">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-plum font-heading text-lg font-semibold text-butter"
          aria-hidden
        >
          ♬
        </div>
        <p className="text-sm font-medium text-body">
          <Trans i18nKey="dashboard.progress.soundRewards" components={{ strong: <strong /> }} />
        </p>
      </div>
    </div>
  )
}
