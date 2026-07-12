import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { VerticalAutoSlider } from '@/components/VerticalAutoSlider'
import { cn } from '@/lib/utils'

function normalizeInspirationTitle(raw: string): string {
  const trimmed = raw.trim()
  return trimmed.endsWith('...') ? trimmed.slice(0, -3).trimEnd() : trimmed
}

export function EntryInspirationCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const titles = t('dashboard.inspirationTitles', { returnObjects: true }) as string[]
  const [activeIndex, setActiveIndex] = useState(0)

  const activeTitle = titles[activeIndex] ?? titles[0] ?? ''

  const goToNewEntry = (title: string) => {
    navigate(`/new-entry?placeholder=${encodeURIComponent(normalizeInspirationTitle(title))}`)
  }

  return (
    <div
      className={cn(
        'group relative block w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-coral-light to-coral p-5 text-left md:rounded-3xl md:p-8',
      )}
    >
      <div
        className="pointer-events-none absolute -bottom-10 -right-8 size-[180px] rounded-full bg-peach opacity-35"
        aria-hidden
      />

      <div className="relative flex flex-col gap-2.5 md:gap-3.5">
        <p className="label-caps text-on-primary/80">{t('dashboard.inspirationLabel')}</p>

        <VerticalAutoSlider
          items={titles}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          infinite
          getItemKey={(title) => title}
          viewportClassName="h-16 md:h-[4.5rem]"
          slideClassName="flex h-16 items-center md:h-[4.5rem]"
          renderSlide={(title) => (
            <button
              type="button"
              onClick={() => goToNewEntry(title)}
              className={cn(
                'w-full text-left font-heading text-lg font-semibold leading-snug text-on-primary transition-opacity hover:opacity-90 md:text-[1.625rem]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary/40',
              )}
              aria-label={`${t('dashboard.inspirationCta')}: ${title}`}
            >
              &ldquo;{title}&rdquo;
            </button>
          )}
        />

        <button
          type="button"
          onClick={() => goToNewEntry(activeTitle)}
          className="mt-1 inline-flex w-fit rounded-full bg-on-primary px-4 py-2.5 text-[13px] font-bold text-coral transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary/40 md:px-6 md:py-3 md:text-[15px]"
        >
          {t('dashboard.inspirationCta')}
        </button>
      </div>
    </div>
  )
}
