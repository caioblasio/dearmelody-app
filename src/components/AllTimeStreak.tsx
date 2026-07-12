import { Flame, Snowflake, Sun, type LucideIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetDiary } from '@/api/diary/use-get-diary'
import { computeCurrentStreak, getStreakTier, type StreakTier } from '@/lib/diary-streak'
import { cn } from '@/lib/utils'

const STREAK_ICONS: Record<StreakTier, LucideIcon> = {
  cold: Snowflake,
  warm: Sun,
  hot: Flame,
}

const STREAK_ICON_CLASSES: Record<StreakTier, string> = {
  cold: 'text-[#7A8BB0]',
  warm: 'text-butter-deep',
  hot: 'text-coral',
}

export function AllTimeStreak() {
  const { t } = useTranslation()
  const { data } = useGetDiary({ limit: 100 })

  const streakDays = useMemo(() => computeCurrentStreak(data ?? []), [data])
  const tier = getStreakTier(streakDays)
  const Icon = STREAK_ICONS[tier]

  return (
    <div className="flex items-center gap-2 rounded-full border border-warm-border bg-card-bg px-4 py-2">
      <Icon className={cn('size-4 shrink-0', STREAK_ICON_CLASSES[tier])} aria-hidden />
      <span className="text-sm font-bold text-ink">{t('dashboard.streak', { days: streakDays })}</span>
    </div>
  )
}
