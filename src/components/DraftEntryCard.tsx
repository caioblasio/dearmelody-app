import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useMelodyGeneration } from '@/lib/melody-generation/use-melody-generation'
import { loadNewEntryDraft, type NewEntryDraft } from '@/lib/new-entry-draft'
import { cn } from '@/lib/utils'

const PREVIEW_MAX_LENGTH = 90

function draftPreview(draft: NewEntryDraft, emptyFallback: string): string {
  const trimmed = draft.entry.trim().replace(/\s+/g, ' ')
  if (!trimmed) return emptyFallback
  if (trimmed.length <= PREVIEW_MAX_LENGTH) return trimmed
  return `${trimmed.slice(0, PREVIEW_MAX_LENGTH).trimEnd()}…`
}

export function DraftEntryCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isComposing } = useMelodyGeneration()
  const draft = useMemo(() => loadNewEntryDraft(), [])

  if (!draft) return null

  const preview = draftPreview(draft, t('dashboard.draftEmptyPreview'))

  const goToDraft = () => {
    if (isComposing) return
    navigate('/new-entry')
  }

  return (
    <div
      className={cn(
        'group relative block w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-coral-light to-coral p-5 text-left md:rounded-3xl md:p-8',
        isComposing && 'opacity-70',
      )}
    >
      <div
        className="pointer-events-none absolute -bottom-10 -right-8 size-[180px] rounded-full bg-peach opacity-35"
        aria-hidden
      />

      <div className="relative flex flex-col gap-2.5 md:gap-3.5">
        <p className="label-caps text-on-primary/80">{t('dashboard.draftLabel')}</p>

        <button
          type="button"
          onClick={goToDraft}
          disabled={isComposing}
          title={isComposing ? t('melodyGeneration.newEntryDisabled') : undefined}
          className={cn(
            'min-h-16 w-full text-left font-heading text-lg font-semibold leading-snug text-on-primary transition-opacity hover:opacity-90 md:min-h-[4.5rem] md:text-[1.625rem]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary/40',
            'disabled:cursor-not-allowed disabled:hover:opacity-100',
          )}
          aria-label={`${t('dashboard.draftCta')}: ${preview}`}
        >
          &ldquo;{preview}&rdquo;
        </button>

        <button
          type="button"
          onClick={goToDraft}
          disabled={isComposing}
          title={isComposing ? t('melodyGeneration.newEntryDisabled') : undefined}
          className="mt-1 inline-flex w-fit rounded-full bg-on-primary px-4 py-2.5 text-[13px] font-bold text-coral transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary/40 disabled:cursor-not-allowed disabled:hover:scale-100 md:px-6 md:py-3 md:text-[15px]"
        >
          {t('dashboard.draftCta')}
        </button>
      </div>
    </div>
  )
}
