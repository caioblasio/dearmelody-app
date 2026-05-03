import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { PastMelodyEntry } from '@/lib/past-melodies-mock'
import { cn } from '@/lib/utils'

import { DiaryEntryPage } from './DiaryEntryPage'

type DiarySectionProps = {
  groupKey: string
  label: string
  items: PastMelodyEntry[]
  moodLabel: string
  locale: string
  isCollapsed: boolean
  onToggle: () => void
}

export function DiarySection({
  groupKey,
  label,
  items,
  moodLabel,
  locale,
  isCollapsed,
  onToggle,
}: DiarySectionProps) {
  const { t } = useTranslation()
  const count = items.length

  return (
    <section className="relative scroll-mt-2">
      <div>
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-between gap-3 px-0 py-3.5 text-left',
            'border-0 bg-transparent transition-colors hover:bg-primary/[0.025] sm:py-4'
          )}
          aria-expanded={!isCollapsed}
          aria-controls={`diary-section-panel-${groupKey}`}
          aria-labelledby={`diary-heading-${groupKey}`}
          title={t('pastMelodies.diary.sectionToggle', { label })}
        >
          <div className="min-w-0 space-y-1.5 pr-2">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h2
                id={`diary-heading-${groupKey}`}
                className="font-serif text-lg font-semibold text-primary sm:text-xl"
              >
                {label}
              </h2>
              <span
                className="inline-flex shrink-0 items-center rounded border border-primary/20 bg-white/50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant"
                aria-hidden
              >
                {t('pastMelodies.diary.entriesStamp', { count })}
              </span>
            </div>
            <p
              className="text-xs leading-6 text-on-surface-variant sm:text-sm sm:leading-7"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, transparent 23px, rgb(207 196 205 / 0.45) 24px)',
                backgroundSize: '100% 24px',
              }}
            >
              <span>{t('pastMelodies.group.entryCount', { count })}</span>
              <span className="mx-1.5 text-outline-variant">·</span>
              <span className="font-medium text-primary">
                {t('pastMelodies.group.topMood', { mood: moodLabel })}
              </span>
            </p>
          </div>
          <ChevronDown
            className={cn(
              'diary-chevron size-5 shrink-0 text-primary/70',
              isCollapsed && 'diary-chevron-collapsed'
            )}
            aria-hidden
          />
        </button>

        <div
          id={`diary-section-panel-${groupKey}`}
          role="region"
          aria-labelledby={`diary-heading-${groupKey}`}
          inert={isCollapsed ? true : undefined}
          className={cn('diary-section-panel grid', isCollapsed && 'diary-section-panel-collapsed')}
        >
          <div className="diary-section-panel-clip min-h-0 overflow-hidden">
            <div className="space-y-4 pt-1 [&>article:first-child]:shadow-[0_-3px_14px_rgba(107,86,119,0.05)]">
              {items.map((entry, index) => (
                <DiaryEntryPage key={entry.id} entry={entry} locale={locale} indexInGroup={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
