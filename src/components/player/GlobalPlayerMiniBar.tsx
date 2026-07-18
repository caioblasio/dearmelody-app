import { Loader2, Pause, Play, X } from 'lucide-react'
import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { usePlayer } from '@/lib/player/use-player'

/** Mobile mini player strip — sits above the bottom nav in AppLayout. */
export function GlobalPlayerMiniBar() {
  const { t } = useTranslation()
  const { track, isPlaying, isLoading, togglePlay, stop } = usePlayer()

  const entryMatch = useMatch('/melodies/:entryId')
  const isOnCurrentEntryPage =
    Boolean(track && entryMatch?.params.entryId === track.entryId)

  if (!track || isOnCurrentEntryPage) {
    return null
  }

  return (
    <div className="border-t border-warm-border bg-card-bg/95 backdrop-blur-md">
      <div className="flex items-center gap-3 px-3 py-2">
        <Link
          to={`/melodies/${track.entryId}`}
          className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-coral/35"
          aria-label={t('player.openEntry', { title: track.title })}
        >
          {track.imageLocation ? (
            <img
              src={track.imageLocation}
              alt=""
              className="size-10 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="album-art-gradient flex size-10 shrink-0 items-center justify-center rounded-lg text-sm text-on-primary/90">
              ♪
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{track.title}</p>
            <p className="truncate text-xs text-muted">{track.entryTitle}</p>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-coral text-on-primary transition-transform hover:scale-105 active:scale-95 disabled:opacity-70"
          onClick={() => void togglePlay()}
          disabled={isLoading}
          aria-label={
            isLoading
              ? t('entry.player.loading')
              : isPlaying
                ? t('entry.player.pause')
                : t('entry.player.play')
          }
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : isPlaying ? (
            <Pause className="size-4" aria-hidden />
          ) : (
            <Play className="size-4 translate-x-px" aria-hidden />
          )}
        </button>

        <button
          type="button"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-chip-bg/60 hover:text-ink"
          onClick={stop}
          aria-label={t('player.stop')}
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
