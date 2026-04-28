import { Outlet } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <AppHeader />

      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
