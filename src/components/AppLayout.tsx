import { Outlet, useMatch } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { RecordMemoryFab } from '@/components/RecordMemoryFab'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

export { AUTH_SHELL_CLASS }
export function AppLayout() {
  const isNewEntry = useMatch('/new-entry')

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <AppHeader />

      <main className="flex-1">
        <div className={cn(AUTH_SHELL_CLASS, 'py-6 sm:py-8', !isNewEntry && 'pb-28')}>
          <Outlet />
        </div>
      </main>

      <AppFooter />
      <RecordMemoryFab />
    </div>
  )
}
