import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

export function AuthHeader() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b border-warm-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8 shrink-0" aria-hidden />
            <DearMelodyWordmark className="font-heading text-xl font-semibold" />
          </div>
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
        <Link
          to="/signup"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'px-4 py-2')}
        >
          {t('authHeader.signUp')}
        </Link>
      </div>
    </header>
  )
}
