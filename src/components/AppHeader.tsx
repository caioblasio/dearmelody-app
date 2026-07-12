import { Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

function navLinkClass(isActive: boolean) {
  return cn(
    'rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-chip-bg/60',
    isActive ? 'bg-chip-bg text-ink' : 'text-muted',
  )
}

export function AppHeader() {
  const { t } = useTranslation()
  const { data: user } = useUserInfo()

  const initials = user?.first_name?.[0]?.toLowerCase() ?? 'd'

  return (
    <header className="border-b border-warm-border bg-card-bg/90 backdrop-blur-md">
      <div className={cn(AUTH_SHELL_CLASS, 'flex items-center py-4')}>
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <NavLink className="font-heading text-xl font-semibold text-ink" to="/" end>
            Dear<span className="text-coral">Melody</span>
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/new-entry">
              {t('nav.newEntry')}
            </NavLink>
            <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/melodies">
              {t('nav.pastMelodies')}
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-none items-center gap-3">
          <button
            type="button"
            aria-label={t('aria.settings')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-border bg-card-bg text-muted transition-colors hover:text-coral"
          >
            <Settings className="h-4 w-4" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-plum font-heading text-sm font-semibold text-butter">
            {initials}m
          </div>
        </div>
      </div>
    </header>
  )
}
