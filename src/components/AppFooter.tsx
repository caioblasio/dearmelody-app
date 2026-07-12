import { useTranslation } from 'react-i18next'

import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

export function AppFooter() {
  const { t } = useTranslation()

  return (
    <footer className="hidden border-t border-warm-border bg-card-bg md:block">
      <div
        className={cn(
          AUTH_SHELL_CLASS,
          'flex items-center justify-between gap-4 py-5 text-sm text-muted',
        )}
      >
        <span>{t('layout.footerLead')}</span>
        <span className="hidden sm:inline">{t('layout.footerRights')}</span>
      </div>
    </footer>
  )
}
