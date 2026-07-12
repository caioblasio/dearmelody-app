import { Trans, useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

type Milestone = {
  icon: string
  label: string
  sub: string
  color: string
  earned: boolean
}

const MILESTONES: Milestone[] = [
  { icon: '♪', label: 'First song', sub: 'Jul 2', earned: true, color: '#FF7A59' },
  { icon: '7', label: 'One week', sub: 'streak', earned: true, color: '#FFD66B' },
  { icon: '✦', label: 'Night owl', sub: '5 late entries', earned: true, color: '#8B5BB0' },
  { icon: '♬', label: 'First album', sub: '10 songs in one collection', earned: false, color: '#D8CDBF' },
  { icon: '30', label: 'One month', sub: 'streak', earned: false, color: '#D8CDBF' },
  { icon: '❋', label: 'Full spectrum', sub: 'every mood used', earned: false, color: '#D8CDBF' },
]

type MilestonesCardProps = {
  className?: string
}

export function MilestonesCard({ className }: MilestonesCardProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h2 className="font-heading text-2xl font-semibold text-ink">
        {t('dashboard.progress.milestonesTitle')}
      </h2>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {MILESTONES.map((badge) => (
          <div
            key={badge.label}
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
              style={{ backgroundColor: badge.color }}
              aria-hidden
            >
              {badge.icon}
            </div>
            <div className="text-center">
              <p className="text-xs font-bold leading-tight text-ink sm:text-[13px]">{badge.label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted sm:text-[11px]">{badge.sub}</p>
            </div>
          </div>
        ))}
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
