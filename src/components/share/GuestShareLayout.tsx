import { Outlet, useMatch } from 'react-router-dom'

import { GlobalPlayerDesktopDock } from '@/components/player/GlobalPlayerDesktopDock'
import { GlobalPlayerMiniBar } from '@/components/player/GlobalPlayerMiniBar'
import { SharePublicHeader } from '@/components/share/SharePublicHeader'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { MelodyGenerationProvider } from '@/lib/melody-generation/MelodyGenerationProvider'
import { PlayerProvider } from '@/lib/player/PlayerProvider'
import { usePlayer } from '@/lib/player/use-player'
import { cn } from '@/lib/utils'

/** Guest chrome for public share links. Assumes PlayerProvider ancestor. */
export function GuestShareShell() {
  const shareMatch = useMatch('/melodies/share/:shareToken')
  const { track } = usePlayer()
  const showMiniBar =
    Boolean(track) &&
    !(
      shareMatch?.params.shareToken &&
      track?.entryId === `share:${shareMatch.params.shareToken}`
    )

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SharePublicHeader />
      <main className={cn('flex-1', showMiniBar && 'pb-24')}>
        {/* Match authenticated immersive player shell: constrained card, not full-bleed */}
        <div className={cn(AUTH_SHELL_CLASS, 'px-0 py-0 sm:px-0 lg:px-8 lg:py-8')}>
          <Outlet />
        </div>
      </main>
      <GlobalPlayerDesktopDock showNewEntryFab={false} />
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <GlobalPlayerMiniBar />
      </div>
    </div>
  )
}

export function GuestShareLayout() {
  return (
    <PlayerProvider>
      <MelodyGenerationProvider>
        <GuestShareShell />
      </MelodyGenerationProvider>
    </PlayerProvider>
  )
}
