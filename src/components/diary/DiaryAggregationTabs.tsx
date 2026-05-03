import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

import { DIARY_AGGREGATION_TAB_IDS, type DiaryAggregationTabId } from './diary-aggregation-types'

type DiaryAggregationTabsProps = {
  value: DiaryAggregationTabId
  onChange: (id: DiaryAggregationTabId) => void
  className?: string
}

export function DiaryAggregationTabs({ value, onChange, className }: DiaryAggregationTabsProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'flex flex-wrap items-end gap-x-3 gap-y-1 border-b border-primary/15 pb-0.5',
        className,
      )}
    >
      <CalendarDays
        className="mb-2 size-3.5 shrink-0 text-on-surface-variant opacity-70"
        aria-hidden
      />
      <div
        role="tablist"
        aria-label={t('pastMelodies.diary.groupBy')}
        className="flex flex-wrap items-end gap-x-1"
      >
        {DIARY_AGGREGATION_TAB_IDS.map((id) => {
          const selected = value === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(id)}
              className={cn(
                'relative -mb-px px-2.5 pb-2 pt-1 font-serif text-sm font-medium transition-colors sm:px-3 sm:text-base',
                selected
                  ? 'text-primary after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary'
                  : 'text-on-surface-variant/90 hover:text-primary',
              )}
            >
              {t(`pastMelodies.aggregation.${id}`)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
