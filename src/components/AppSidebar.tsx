import { BookOpen, FolderOpen, Home, LogOut, Settings, Shield } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'

import logo from '@/assets/logo.svg'
import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { useUserInfo } from '@/api/user/use-user-info'
import { isAdminEmail } from '@/lib/admin'
import { logout } from '@/lib/auth'
import { useMelodyGeneration } from '@/lib/melody-generation/use-melody-generation'
import { cn } from '@/lib/utils'

type NavItem = {
  to: string
  labelKey: string
  icon: LucideIcon
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', labelKey: 'nav.dashboard', icon: Home, end: true },
  { to: '/melodies', labelKey: 'nav.pastMelodies', icon: BookOpen },
  { to: '/collections', labelKey: 'nav.collections', icon: FolderOpen },
]

function navLinkClass(isActive: boolean, disabled?: boolean) {
  return cn(
    'flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
    disabled
      ? 'cursor-not-allowed text-muted/50'
      : isActive
        ? 'bg-chip-bg text-ink'
        : 'text-muted hover:bg-chip-bg/60 hover:text-ink'
  )
}

export function AppSidebar() {
  const { t } = useTranslation()
  const { data: user } = useUserInfo()
  const { isComposing } = useMelodyGeneration()

  const initials =
    [user?.first_name?.[0], user?.last_name?.[0]]
      .filter(Boolean)
      .map((letter) => letter!.toUpperCase())
      .join('') || 'DM'

  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'DearMelody'
  const showAdmin = isAdminEmail(user?.email)

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-warm-border bg-card-bg md:flex">
      <div className="flex flex-1 flex-col px-4 py-6">
        <NavLink
          className="mb-8 flex items-center gap-2 px-2 font-heading text-xl font-semibold text-ink"
          to="/"
          end
        >
          <img src={logo} alt="" className="h-6 w-6 shrink-0" aria-hidden />
          <DearMelodyWordmark />
        </NavLink>

        <nav aria-label={t('aria.sidebarNav')} className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => {
            const isNewEntry = to === '/new-entry'
            const disabled = isNewEntry && isComposing

            if (disabled) {
              return (
                <span
                  key={to}
                  className={navLinkClass(false, true)}
                  aria-disabled="true"
                  title={t('melodyGeneration.newEntryDisabled')}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {t(labelKey)}
                </span>
              )
            }

            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {t(labelKey)}
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-warm-border pt-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum font-heading text-sm font-semibold text-butter"
              aria-hidden
            >
              {initials}
            </div>
            <p className="min-w-0 truncate text-sm font-semibold text-ink">{displayName}</p>
          </div>

          <div className="flex flex-col gap-0.5">
            <NavLink to="/profile" className={({ isActive }) => navLinkClass(isActive)}>
              <Settings className="size-4 shrink-0" aria-hidden />
              {t('nav.settings')}
            </NavLink>
            {showAdmin ? (
              <NavLink to="/admin" className={({ isActive }) => navLinkClass(isActive)}>
                <Shield className="size-4 shrink-0" aria-hidden />
                {t('nav.admin')}
              </NavLink>
            ) : null}
            <button
              type="button"
              onClick={() => void logout()}
              className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-chip-bg/60 hover:text-ink"
            >
              <LogOut className="size-4 shrink-0" aria-hidden />
              {t('nav.logout')}
            </button>
          </div>

          <div className="mt-4 space-y-1 border-t border-warm-border px-2 pt-4 text-xs text-muted">
            <p>{t('layout.footerLead')}</p>
            <p className="flex items-center gap-1">
              <DearMelodyWordmark className="font-heading font-semibold" />
              <span>{t('layout.footerRights')}</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
