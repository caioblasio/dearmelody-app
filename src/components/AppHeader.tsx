import { Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { useUserInfo } from '@/api/user/use-user-info'
import { cn } from '@/lib/utils'

export function AppHeader() {
  const { data: user } = useUserInfo()

  return (
    <header className="border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-6 text-sm text-on-surface-variant md:flex">
            <NavLink className="font-serif text-xl font-bold italic text-primary" to="/" end>
              Song Diary
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                cn(
                  'border-b-2 border-transparent pb-0.5 transition-colors hover:text-primary',
                  isActive ? 'border-primary font-semibold text-primary' : ''
                )
              }
              to="/new-entry"
            >
              New Entry
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                cn(
                  'border-b-2 border-transparent pb-0.5 transition-colors hover:text-primary',
                  isActive ? 'border-primary font-semibold text-primary' : ''
                )
              }
              to="/past-melodies"
            >
              Past Melodies
            </NavLink>
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
  )
}
