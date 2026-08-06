import { Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useMelodyGeneration } from '@/lib/melody-generation/use-melody-generation'
import { cn } from '@/lib/utils'

type NewEntryFabProps = {
  className?: string
}

/** Coral plus FAB used in the mobile bottom nav and desktop floating dock. */
export function NewEntryFab({ className }: NewEntryFabProps) {
  const { t } = useTranslation()
  const { isComposing } = useMelodyGeneration()

  const fabClassName = cn(
    'btn-coral-gradient shadow-fab flex size-14 shrink-0 items-center justify-center rounded-full text-on-primary ring-4 ring-card-bg transition-transform active:scale-95',
    className,
  )

  if (isComposing) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label={t('melodyGeneration.newEntryDisabled')}
        title={t('melodyGeneration.newEntryDisabled')}
        className={cn(fabClassName, 'cursor-not-allowed opacity-50 active:scale-100')}
      >
        <Plus className="size-6" aria-hidden />
      </button>
    )
  }

  return (
    <NavLink
      to="/new-entry"
      aria-label={t('nav.newEntry')}
      className={fabClassName}
    >
      <Plus className="size-6" aria-hidden />
    </NavLink>
  )
}
