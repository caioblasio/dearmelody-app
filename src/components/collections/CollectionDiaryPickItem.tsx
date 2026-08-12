import { Loader2, Minus, PauseCircle, PlayCircle, Plus } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import type { DiaryListItem } from '@/api/diary/diary-list-item'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import { usePlayer } from '@/lib/player/use-player'
import { cn } from '@/lib/utils'

type CollectionDiaryPickItemProps = {
  entry: DiaryListItem
  locale: string
  selected: boolean
  onToggle: (id: string) => void
}

function formatRowDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date)
}

function isMelodyReady(entry: DiaryListItem): boolean {
  return entry.music?.generateStatus === 'done'
}

export function CollectionDiaryPickItem({
  entry,
  locale,
  selected,
  onToggle,
}: CollectionDiaryPickItemProps) {
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
  const melodyReady = isMelodyReady(entry)
  const primaryLabel =
    melodyReady && entry.music ? entry.music.title : entry.title
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

  function handleToggleClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onToggle(entry.id)
  }

  return (
    <Item
      variant={selected ? 'muted' : 'outline'}
      size="sm"
      className={cn(
        'rounded-[14px] border-warm-border bg-card-bg',
        selected && 'border-coral/35',
      )}
    >
      <ItemMedia className="self-center">
        <span className={cn('size-3 shrink-0 rounded-full', theme.moodDot)} aria-hidden />
      </ItemMedia>

      <ItemContent className="min-w-0 gap-0.5">
        <ItemTitle className="truncate text-[15px] font-bold text-ink">
          {primaryLabel}
        </ItemTitle>
        {excerpt ? (
          <ItemDescription className="line-clamp-1 text-[13px]">
            {excerpt}
          </ItemDescription>
        ) : null}
        <p className="text-[13px] text-muted">
          {formatRowDate(parsed, locale)} · {moodLabel}
        </p>
      </ItemContent>

      <ItemActions className="shrink-0">
        {melodyReady && entry.music ? (
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
              <Loader2 className="size-6 animate-spin" aria-hidden />
            ) : showPause ? (
              <PauseCircle className="size-6" aria-hidden />
            ) : (
              <PlayCircle className="size-6" aria-hidden />
            )}
          </button>
        ) : null}

        <button
          type="button"
          className={cn(
            'flex size-8 items-center justify-center rounded-full border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-coral/35',
            selected
              ? 'border-coral bg-coral text-white hover:bg-coral-light'
              : 'border-warm-border bg-card-bg text-muted hover:border-peach hover:text-ink',
          )}
          onClick={handleToggleClick}
          aria-label={
            selected
              ? t('collections.removeEntryAria', { title: entry.title })
              : t('collections.addEntryAria', { title: entry.title })
          }
          aria-pressed={selected}
        >
          {selected ? (
            <Minus className="size-4" aria-hidden />
          ) : (
            <Plus className="size-4" aria-hidden />
          )}
        </button>
      </ItemActions>
    </Item>
  )
}
