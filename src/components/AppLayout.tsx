import { Outlet, useMatch } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

export { AUTH_SHELL_CLASS }
export function AppLayout() {
  const isNewEntry = useMatch('/new-entry')

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <AppHeader />

      <main className={cn('flex-1', isNewEntry && 'flex min-h-0 flex-col')}>
        <div
          className={cn(
            AUTH_SHELL_CLASS,
            isNewEntry && 'flex min-h-0 flex-1 flex-col',
            'py-6 sm:py-8',
            'pb-28 md:pb-8',
            !isNewEntry && 'md:pb-28'
          )}
        >
          <Outlet />
        </div>
      </main>

      <AppFooter />
      <MobileBottomNav />
    </div>
  )
}
