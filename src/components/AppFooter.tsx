import { useTranslation } from 'react-i18next'

export function AppFooter() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-outline-variant bg-surface-container px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm text-on-surface-variant">
        <span>{t('layout.footerLead')}</span>
        <span className="hidden sm:inline">{t('layout.footerRights')}</span>
      </div>
    </footer>
  )
}
