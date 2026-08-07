import { Outlet, useMatch } from 'react-router-dom'

import { AppSidebar } from '@/components/AppSidebar'
import {
  MelodyGenerationBar,
  useMelodyGenerationBarVisible,
} from '@/components/melody-generation/MelodyGenerationBar'
import { GlobalPlayerDesktopDock } from '@/components/player/GlobalPlayerDesktopDock'
import { GlobalPlayerMiniBar } from '@/components/player/GlobalPlayerMiniBar'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { MelodyGenerationProvider } from '@/lib/melody-generation/MelodyGenerationProvider'
import { PlayerProvider } from '@/lib/player/PlayerProvider'
import { usePlayer } from '@/lib/player/use-player'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

export { AUTH_SHELL_CLASS }

/** Authenticated chrome (sidebar + docks). Assumes PlayerProvider + MelodyGenerationProvider ancestors. */
export function AuthenticatedAppShell() {
  const entryMatch = useMatch('/melodies/:entryId')
  const shareMatch = useMatch('/melodies/share/:shareToken')
  const isImmersivePlayerPage = Boolean(entryMatch || shareMatch)
  const { track } = usePlayer()
  const showGenerationBar = useMelodyGenerationBarVisible()

  const isViewingCurrentTrack =
    (entryMatch?.params.entryId && track?.entryId === entryMatch.params.entryId) ||
    (shareMatch?.params.shareToken &&
      track?.entryId === `share:${shareMatch.params.shareToken}`)

  const showMiniBar = Boolean(track) && !isViewingCurrentTrack

  return (
    <div className="flex min-h-screen bg-surface">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1">
          <div
            className={cn(
              AUTH_SHELL_CLASS,
              isImmersivePlayerPage
                ? 'px-0 py-0 sm:px-0 lg:px-8 lg:py-8'
                : cn(
                    'py-6 sm:py-8',
                    /* Base room for mobile bottom nav */
                    'pb-28 md:pb-28',
                    /* Extra room when mobile mini player is stacked above the nav */
                    showMiniBar && 'pb-[11.5rem] md:pb-28',
                    /* Extra room when composing/ready bar is visible */
                    showGenerationBar && !showMiniBar && 'pb-[11.5rem] md:pb-32',
                    showGenerationBar && showMiniBar && 'pb-[15rem] md:pb-36'
                  )
            )}
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* Desktop: composing/ready bar above floating dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center md:flex">
        <div className="pointer-events-auto w-full max-w-md px-4">
          <MelodyGenerationBar variant="desktop" />
        </div>
      </div>

      <GlobalPlayerDesktopDock />

      {/* Mobile: generation bar → mini player → bottom nav */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <MelodyGenerationBar variant="mobile" />
        <GlobalPlayerMiniBar />
        <MobileBottomNav />
      </div>
    </div>
  )
}

export function AppLayout() {
  return (
    <PlayerProvider>
      <MelodyGenerationProvider>
        <AuthenticatedAppShell />
      </MelodyGenerationProvider>
    </PlayerProvider>
  )
}
