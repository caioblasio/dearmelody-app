import { Outlet } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

export { AUTH_SHELL_CLASS }
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <AppHeader />

      <main className="flex-1">
        <div className={cn(AUTH_SHELL_CLASS, 'py-6 sm:py-8')}>
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
