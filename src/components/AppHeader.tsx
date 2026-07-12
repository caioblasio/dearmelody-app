import { LogOut, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logo from '@/assets/logo.svg'
import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { useUserInfo } from '@/api/user/use-user-info'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/auth'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

function navLinkClass(isActive: boolean) {
  return cn(
    'rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-chip-bg/60',
    isActive ? 'bg-chip-bg text-ink' : 'text-muted'
  )
}

export function AppHeader() {
  const { t } = useTranslation()
  const { data: user } = useUserInfo()

  const initials =
    [user?.first_name?.[0], user?.last_name?.[0]]
      .filter(Boolean)
      .map((letter) => letter!.toUpperCase())
      .join('') || 'DM'

  return (
    <header className="border-b border-warm-border bg-card-bg/90 backdrop-blur-md">
      <div className={cn(AUTH_SHELL_CLASS, 'flex items-center py-4')}>
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <NavLink
            className="flex items-center gap-2 font-heading text-xl font-semibold text-ink"
            to="/"
            end
          >
            <img src={logo} alt="" className="h-6 w-6 shrink-0" aria-hidden />
            <DearMelodyWordmark />
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={t('aria.profileMenu')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-plum font-heading text-sm font-semibold text-butter transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/30"
            >
              {initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings />
              {t('nav.settings')}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={logout}>
              <LogOut />
              {t('nav.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
