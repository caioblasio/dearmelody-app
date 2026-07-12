import { useTranslation } from 'react-i18next'

import { Button } from './ui/button'

export function AuthHeader() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b border-warm-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="font-heading text-xl font-semibold text-ink">
            Dear<span className="text-coral">Melody</span>
          </span>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              className="font-medium text-muted transition-colors duration-200 hover:text-coral"
              href="#"
            >
              {t('authHeader.about')}
            </a>
            <a
              className="font-medium text-muted transition-colors duration-200 hover:text-coral"
              href="#"
            >
              {t('authHeader.journalingGuide')}
            </a>
          </nav>
        </div>
        <Button variant="outline" size="sm" className="px-4 py-2">
          {t('authHeader.signUp')}
        </Button>
      </div>
    </header>
  )
}
