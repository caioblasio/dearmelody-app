import { Outlet } from 'react-router-dom'
import { Settings } from 'lucide-react'

import { useUserInfo } from '@/api/user/use-user-info'

export function AppLayout() {
  const { data: user } = useUserInfo()

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <span className="font-serif text-xl font-bold italic text-primary">Song Diary</span>
            <nav className="hidden items-center gap-6 text-sm text-on-surface-variant md:flex">
              <a className="transition-colors hover:text-primary" href="#">
                New Entry
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Your Melody
              </a>
              <a className="transition-colors hover:text-primary" href="#">
                Past Melodies
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Settings"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant transition-colors hover:text-primary"
            >
              <Settings className="h-4 w-4" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">
              {user?.name?.[0] ?? 'U'}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container px-4 py-5 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm text-on-surface-variant">
          <span>Keep journaling your musical memories.</span>
          <span className="hidden sm:inline">Melodiary © 2026</span>
        </div>
      </footer>
    </div>
  )
}
