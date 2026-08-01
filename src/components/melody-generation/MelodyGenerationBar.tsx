import { useMatch, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ComposingButtonLoaderLight } from '@/components/loading/composing-loaders'
import { useMelodyGeneration } from '@/lib/melody-generation/use-melody-generation'
import { cn } from '@/lib/utils'

type MelodyGenerationBarProps = {
  className?: string
  /** Desktop floating bar vs mobile strip in the bottom stack. */
  variant?: 'mobile' | 'desktop'
}

export function MelodyGenerationBar({
  className,
  variant = 'mobile',
}: MelodyGenerationBarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { entryId, phase, dismiss } = useMelodyGeneration()
  const entryMatch = useMatch('/melodies/:entryId')

  const isOnTrackedEntry =
    Boolean(entryId) && entryMatch?.params.entryId === entryId

  if (phase === 'idle' || !entryId || isOnTrackedEntry) {
    return null
  }

  if (phase === 'composing') {
    return (
      <div
        className={cn(
          'flex justify-center px-3 py-2',
          variant === 'mobile' && 'border-t border-warm-border bg-card-bg/95 backdrop-blur-md',
          variant === 'desktop' && 'pointer-events-none',
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <ComposingButtonLoaderLight
          className={cn(
            'pointer-events-none w-full max-w-md',
            variant === 'desktop' && 'shadow-[0_12px_26px_rgba(255,122,89,0.32)]',
          )}
          label={t('melodyGeneration.composing')}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex justify-center px-3 py-2',
        variant === 'mobile' && 'border-t border-warm-border bg-card-bg/95 backdrop-blur-md',
        className,
      )}
    >
      <button
        type="button"
        className="btn-coral-gradient w-full max-w-md rounded-full px-6 py-3.5 font-heading text-base font-semibold text-surface shadow-[0_12px_26px_rgba(255,122,89,0.32)] transition-transform hover:scale-[1.02] active:scale-95"
        onClick={() => {
          dismiss()
          navigate(`/melodies/${entryId}`)
        }}
      >
        {t('melodyGeneration.readyCta')}
      </button>
    </div>
  )
}

/** Whether the global generation bar should reserve layout space. */
export function useMelodyGenerationBarVisible() {
  const { entryId, phase } = useMelodyGeneration()
  const entryMatch = useMatch('/melodies/:entryId')
  const isOnTrackedEntry =
    Boolean(entryId) && entryMatch?.params.entryId === entryId
  return phase !== 'idle' && Boolean(entryId) && !isOnTrackedEntry
}
