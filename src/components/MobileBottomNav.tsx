import { Home, Music2, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

function sideNavClass(isActive: boolean) {
  return cn(
    'flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium text-on-surface-variant transition-colors',
    isActive && 'text-primary font-bold'
  )
}

export function MobileBottomNav() {
  const { t } = useTranslation()

  return (
    <nav
      aria-label={t('aria.mobileNav')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant bg-surface-container-lowest/90 backdrop-blur-md md:hidden"
    >
      <div className="flex w-full items-end px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
        <NavLink to="/" end className={({ isActive }) => sideNavClass(isActive)}>
          <Home className="size-5 shrink-0" aria-hidden />
          <span className="truncate">{t('nav.home')}</span>
        </NavLink>

        <NavLink to="/new-entry" className={({ isActive }) => sideNavClass(isActive)}>
          <Plus className="size-6 shrink-0" aria-hidden />
          <span className="truncate">{t('nav.newEntry')}</span>
        </NavLink>

        <NavLink to="/melodies" className={({ isActive }) => sideNavClass(isActive)}>
          <Music2 className="size-5 shrink-0" aria-hidden />
          <span className="truncate">{t('nav.pastMelodies')}</span>
        </NavLink>
      </div>
    </nav>
  )
}
