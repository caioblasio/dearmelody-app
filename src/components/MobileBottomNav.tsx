import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { NewEntryFab } from '@/components/NewEntryFab'
import { cn } from '@/lib/utils'

type BottomNavItem = {
  to: string
  labelKey: string
  end?: boolean
}

const LEFT_ITEMS: BottomNavItem[] = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/melodies', labelKey: 'nav.pastMelodies' },
]

const RIGHT_ITEMS: BottomNavItem[] = [
  { to: '/collections', labelKey: 'nav.collections' },
  { to: '/profile', labelKey: 'nav.me' },
]

function BottomNavLink({ to, labelKey, end }: BottomNavItem) {
  const { t } = useTranslation()

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex flex-1 flex-col items-center justify-center gap-1.5 px-1 py-1 text-[0.6875rem] font-semibold transition-colors',
          isActive ? 'text-ink' : 'text-muted',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              'size-1.5 rounded-full transition-colors',
              isActive ? 'bg-coral' : 'bg-sand/45',
            )}
            aria-hidden
          />
          <span className="truncate">{t(labelKey)}</span>
        </>
      )}
    </NavLink>
  )
}

export function MobileBottomNav() {
  const { t } = useTranslation()

  return (
    <nav aria-label={t('aria.mobileNav')} className="relative md:hidden">
      <div className="border-t border-warm-border bg-card-bg/95 backdrop-blur-md">
        <div className="flex items-end px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5">
          {LEFT_ITEMS.map((item) => (
            <BottomNavLink key={item.to} {...item} />
          ))}

          <div className="w-16 shrink-0" />

          {RIGHT_ITEMS.map((item) => (
            <BottomNavLink key={item.to} {...item} />
          ))}
        </div>
      </div>

      <NewEntryFab className="absolute -top-6 left-1/2 -translate-x-1/2" />
    </nav>
  )
}
