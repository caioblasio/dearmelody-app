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
      className="fixed bottom-8 right-5 z-40 hidden items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-[0_10px_30px_rgba(107,86,119,0.35)] backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 md:inline-flex"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-white/10 to-white/20" />
      <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/80" />
      <span className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 animate-ping rounded-full bg-white/60" />
      <Plus className="relative z-[1] size-4 shrink-0" aria-hidden />
      <span className="relative z-[1]">{t('pastMelodies.recordMemory')}</span>
    </Link>
  )
}
