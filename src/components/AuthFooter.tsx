import { useTranslation } from 'react-i18next'

export function AuthFooter() {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t border-warm-border bg-card-bg px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-ink">
            Dear<span className="text-coral">Melody</span>
          </span>
          <span className="text-sm text-muted">{t('authFooter.rights')}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a className="text-muted transition-colors hover:text-coral" href="#">
            {t('authFooter.privacyPolicy')}
          </a>
          <a className="text-muted transition-colors hover:text-coral" href="#">
            {t('authFooter.termsOfUse')}
          </a>
          <a className="text-muted transition-colors hover:text-coral" href="#">
            {t('authFooter.support')}
          </a>
        </nav>
      </div>
    </footer>
  )
}
