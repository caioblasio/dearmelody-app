import { Outlet, useMatch } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { GlobalPlayerDesktopDock } from '@/components/player/GlobalPlayerDesktopDock'
import { GlobalPlayerMiniBar } from '@/components/player/GlobalPlayerMiniBar'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { PlayerProvider } from '@/lib/player/PlayerProvider'
import { usePlayer } from '@/lib/player/use-player'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

export { AUTH_SHELL_CLASS }

function AppLayoutShell() {
  const isNewEntry = useMatch('/new-entry')
  const entryMatch = useMatch('/melodies/:entryId')
  const { track } = usePlayer()

  const showMiniBar =
    Boolean(track) &&
    !(entryMatch?.params.entryId && track?.entryId === entryMatch.params.entryId)

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <AppHeader />

      <main className={cn('flex-1', isNewEntry && 'flex min-h-0 flex-col')}>
        <div
          className={cn(
            AUTH_SHELL_CLASS,
            isNewEntry && 'flex min-h-0 flex-1 flex-col',
            'py-6 sm:py-8',
            /* Base room for mobile bottom nav */
            'pb-28 md:pb-8',
            !isNewEntry && 'md:pb-28',
            /* Extra room when mobile mini player is stacked above the nav */
            showMiniBar && 'pb-[11.5rem] md:pb-28',
          )}
        >
          <Outlet />
        </div>
      </main>

      <AppFooter />

      <GlobalPlayerDesktopDock />

      {/* Mobile: mini player stacked directly above bottom nav */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <GlobalPlayerMiniBar />
        <MobileBottomNav />
      </div>
    </div>
  )
}

export function AppLayout() {
  return (
    <PlayerProvider>
      <AppLayoutShell />
    </PlayerProvider>
  )
}
