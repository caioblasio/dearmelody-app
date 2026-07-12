import { Plus } from 'lucide-react'
import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function RecordMemoryFab() {
  const { t } = useTranslation()
  const isNewEntry = useMatch('/new-entry')

  if (isNewEntry) {
    return null
  }

  return (
    <Link
      to="/new-entry"
      aria-label={t('aria.recordMemory')}
      className="btn-coral-gradient shadow-fab fixed bottom-8 right-5 z-40 hidden items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.06] active:scale-95 md:inline-flex"
    >
      <Plus className="size-4 shrink-0" aria-hidden />
      <span>{t('pastMelodies.recordMemory')}</span>
    </Link>
  )
}
