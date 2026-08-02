import { Loader2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Slider } from '@/components/ui/slider'
import { usePlayer } from '@/lib/player/use-player'
import { cn } from '@/lib/utils'

function formatDurationMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

type PlayerControlsProps = {
  controlsClassName?: string
  variant?: 'default' | 'warm'
  showVolume?: boolean
  /**
   * - `full`: shuffle / prev / play / next / repeat (kept for a future full player)
   * - `playOnly`: progress + play button; optional trailing actions (share, download, cover)
   */
  transport?: 'full' | 'playOnly'
  /** Rendered to the right of the play button when `transport="playOnly"`. */
  trailingActions?: ReactNode
  /** When set, play activates this entry if it is not already the current track. */
  entryId?: string
  onActivate?: () => void | Promise<void>
}

export function PlayerControls({
  controlsClassName,
  variant = 'default',
  showVolume,
  transport = 'full',
  trailingActions,
  entryId,
  onActivate,
}: PlayerControlsProps) {
  const { t } = useTranslation()
  const {
    isPlaying,
    isLoading,
    error,
    duration,
    volume,
    displayedTime,
    togglePlay,
    seek,
    beginScrub,
    setVolume,
    isCurrentEntry,
  } = usePlayer()

  const isWarm = variant === 'warm'
  const shouldShowVolume = showVolume ?? !isWarm
  const isActiveTrack = entryId ? isCurrentEntry(entryId) : true
  const showPlaying = isActiveTrack && isPlaying
  const showDuration = isActiveTrack ? duration : 0
  const showTime = isActiveTrack ? displayedTime : 0
  const isPlayOnly = transport === 'playOnly'

  async function handlePlayClick() {
    if (entryId && !isCurrentEntry(entryId)) {
      await onActivate?.()
      return
    }
    await togglePlay()
  }

  const transportBtnClass = isWarm
    ? 'inline-flex size-9 items-center justify-center rounded-full text-player-ink/70 transition-colors hover:bg-player-ink/10 hover:text-player-ink'
    : 'inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-coral'

  const playBtnClass = isWarm
    ? cn(
        'inline-flex items-center justify-center rounded-full bg-player-ink text-butter shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70',
        isPlayOnly ? 'size-14' : 'size-[4.625rem]'
      )
    : 'inline-flex size-11 items-center justify-center rounded-full btn-coral-gradient text-on-primary shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-70'

  const timeClass = isWarm
    ? 'font-mono text-[11px] tabular-nums text-player-brown lg:text-xs'
    : 'font-mono text-[11px] tabular-nums text-muted lg:text-xs'

  const playButton = (
    <button
      type="button"
      aria-label={
        isLoading && isActiveTrack
          ? t('entry.player.loading')
          : showPlaying
            ? t('entry.player.pause')
            : t('entry.player.play')
      }
      className={playBtnClass}
      onClick={() => void handlePlayClick()}
      disabled={isLoading && isActiveTrack}
    >
      {isLoading && isActiveTrack ? (
        <Loader2 className="size-5 animate-spin" aria-hidden />
      ) : showPlaying ? (
        <Pause className={cn(isPlayOnly ? 'size-5' : 'size-6')} aria-hidden />
      ) : (
        <Play className={cn('translate-x-0.5', isPlayOnly ? 'size-5' : 'size-6')} aria-hidden />
      )}
    </button>
  )

  return (
    <>
      <div className="shrink-0 space-y-2">
        <Slider
          min={0}
          max={Math.max(showDuration, 1)}
          step={0.1}
          value={[showTime]}
          onValueChange={(value) => {
            if (!isActiveTrack) return
            beginScrub(value[0] ?? 0)
          }}
          onValueCommit={(value) => {
            if (!isActiveTrack) {
              void onActivate?.()
              return
            }
            void seek(value[0] ?? 0)
          }}
          disabled={isLoading && isActiveTrack}
          aria-label={t('entry.player.progress')}
        />
        <div className={cn('flex justify-between', timeClass)}>
          <span>{formatDurationMmSs(showTime)}</span>
          <span>{formatDurationMmSs(showDuration)}</span>
        </div>
      </div>

      {isPlayOnly ? (
        <div className="flex shrink-0 items-center justify-between gap-3">
          {playButton}
          {trailingActions ? (
            <div className="flex flex-wrap items-center justify-end gap-2">{trailingActions}</div>
          ) : null}
        </div>
      ) : (
        <div
          className={cn(
            'flex shrink-0 flex-col gap-3 border border-warm-border p-3 backdrop-blur-sm lg:rounded-2xl lg:p-4',
            controlsClassName
          )}
        >
          {error && isActiveTrack ? (
            <p className="text-center text-sm font-medium text-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:justify-between">
            <button
              type="button"
              aria-label={t('entry.player.shuffle')}
              className={transportBtnClass}
              disabled
            >
              <Shuffle className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={t('entry.player.previous')}
              className={transportBtnClass}
              disabled
            >
              <SkipBack className="size-4" aria-hidden />
            </button>
            {playButton}
            <button
              type="button"
              aria-label={t('entry.player.next')}
              className={transportBtnClass}
              disabled
            >
              <SkipForward className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={t('entry.player.repeat')}
              className={transportBtnClass}
              disabled
            >
              <Repeat className="size-4" aria-hidden />
            </button>
          </div>

          {shouldShowVolume ? (
            <div className="flex items-center justify-center gap-2 text-muted sm:justify-between">
              <Volume2 className="size-4 shrink-0 opacity-70" aria-hidden />
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={(value) => setVolume(value[0] ?? 0)}
                aria-label={t('entry.player.volume')}
                className="min-w-0 max-w-[12rem] flex-1 lg:max-w-none"
              />
            </div>
          ) : null}
        </div>
      )}

      {isPlayOnly && error && isActiveTrack ? (
        <p className="text-center text-sm font-medium text-error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  )
}
