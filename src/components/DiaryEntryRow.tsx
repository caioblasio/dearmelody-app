import { Loader2, PauseCircle, PlayCircle } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import { usePlayer } from '@/lib/player/use-player'
import { cn } from '@/lib/utils'

type DiaryEntryRowProps = {
  entry: DiaryListItem
  locale: string
  /** When false, hides the date in the meta line (useful for same-day panels). Default true. */
  showDate?: boolean
  /** When false, hides the melody title next to the play button (useful for tight layouts). Default true. */
  showSongName?: boolean
}

function formatRowDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date)
}

function getMelodyStatus(
  entry: DiaryListItem,
  t: (key: string, options?: Record<string, string>) => string,
): { label: string; className: string; ready: boolean } {
  if (!entry.music) {
    return {
      label: t('dashboard.noMelodyYet'),
      className: 'text-coral',
      ready: false,
    }
  }

  if (entry.music.generateStatus === 'done') {
    return {
      label: t('dashboard.melodyReady', { title: entry.music.title }),
      className: 'text-plum',
      ready: true,
    }
  }

  return {
    label: t('dashboard.melodyGenerating'),
    className: 'text-muted',
    ready: false,
  }
}

export function DiaryEntryRow({
  entry,
  locale,
  showDate = true,
  showSongName = true,
}: DiaryEntryRowProps) {
  const { t } = useTranslation()
  const {
    playEntry,
    togglePlay,
    isCurrentEntry,
    isPlaying,
    isLoading,
    isResolving,
    resolvingEntryId,
  } = usePlayer()

  const theme = getArchiveMoodTheme(toMoodIcon(entry.mood))
  const parsed = parseDiaryCreatedAt(entry.createdAt)
  const moodLabel = capitalizeMood(entry.mood)
  const melodyStatus = getMelodyStatus(entry, t)
  const excerpt = entry.entry.trim()

  const isCurrent = isCurrentEntry(entry.id)
  const isRowResolving = isResolving && resolvingEntryId === entry.id
  const isRowLoading = isRowResolving || (isCurrent && isLoading)
  const showPause = isCurrent && isPlaying

  async function handlePlayClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (isCurrent) {
      await togglePlay()
      return
    }

    await playEntry(entry.id)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-[18px] border border-warm-border bg-card-bg px-5 py-4',
        'transition-colors hover:border-peach',
      )}
    >
      <Link
        to={`/melodies/${entry.id}`}
        className="flex min-w-0 flex-1 items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-coral/35"
        aria-label={t('pastMelodies.openEntry', { title: entry.title })}
      >
        <span className={cn('size-3 shrink-0 rounded-full', theme.moodDot)} aria-hidden />

        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-[15px] font-bold text-ink">{entry.title}</p>
          {excerpt ? (
            <p className="line-clamp-2 text-[13px] leading-snug text-muted">{excerpt}</p>
          ) : null}
          <p className="text-[13px] text-muted">
            {showDate ? (
              <>
                {formatRowDate(parsed, locale)} · {moodLabel}
              </>
            ) : (
              moodLabel
            )}
          </p>
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        {melodyStatus.ready && entry.music ? (
          <>
            {showSongName ? (
              <p className={cn('max-w-[9rem] truncate text-[13px] font-semibold', melodyStatus.className)}>
                {entry.music.title}
              </p>
            ) : null}
            <button
              type="button"
              className={cn(
                'rounded-full p-0.5 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
                'disabled:opacity-60',
                theme.play,
              )}
              onClick={(e) => void handlePlayClick(e)}
              disabled={isRowLoading}
              aria-label={
                isRowLoading
                  ? t('entry.player.loading')
                  : showPause
                    ? t('entry.player.pause')
                    : t('pastMelodies.playTrack', { title: entry.music.title })
              }
            >
              {isRowLoading ? (
                <Loader2 className="size-7 animate-spin" aria-hidden />
              ) : showPause ? (
                <PauseCircle className="size-7" aria-hidden />
              ) : (
                <PlayCircle className="size-7" aria-hidden />
              )}
            </button>
          </>
        ) : (
          <p className={cn('text-[13px] font-semibold', melodyStatus.className)}>
            {melodyStatus.label}
          </p>
        )}
      </div>
    </div>
  )
}
