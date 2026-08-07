import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logo from '@/assets/logo.svg'
import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SharePublicHeader() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-30 border-b border-warm-border/80 bg-cream-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/signup" className="flex items-center gap-2.5" aria-label={t('app.documentTitle')}>
          <img src={logo} alt="" className="size-8" aria-hidden />
          <DearMelodyWordmark className="font-heading text-lg font-semibold" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'font-semibold text-ink')}
          >
            {t('shareMelody.header.login')}
          </Link>
          <Link
            to="/signup"
            className={cn(buttonVariants({ size: 'sm' }), 'font-heading font-semibold')}
          >
            {t('shareMelody.header.startFree')}
          </Link>
        </div>
      </div>
    </header>
  )
}
