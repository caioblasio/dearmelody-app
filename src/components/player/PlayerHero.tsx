import { AlertCircle, ImageIcon, Mic2 } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { getMusicDisplayState, isMusicContentLoading } from '@/api/diary/generate-status'
import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import { PastMelodyMoodIcon } from '@/components/PastMelodyMoodIcon'
import { PlayerControls } from '@/components/player/PlayerControls'
import { Skeleton } from '@/components/ui/skeleton'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import type { PlayerTrack } from '@/lib/player/player-context'
import { usePlayer } from '@/lib/player/use-player'
import { cn } from '@/lib/utils'

function formatRecordedCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

function AlbumArtPlaceholder({ failed }: { failed?: boolean }) {
  const { t } = useTranslation()

  if (failed) {
    return (
      <div
        className="flex min-h-[16rem] flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-error lg:min-h-[25rem]"
        role="alert"
      >
        <AlertCircle className="size-8 shrink-0" aria-hidden />
        <p className="text-sm font-medium">{t('entry.generationFailed')}</p>
      </div>
    )
  }

  return (
    <div className="album-art-gradient relative flex h-full min-h-[16rem] w-full flex-1 items-center justify-center overflow-hidden rounded-[24px] lg:min-h-[25rem]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-[70%] rounded-full border border-white/20" aria-hidden />
        <div className="absolute size-[50%] rounded-full border border-white/15" aria-hidden />
        <div className="absolute size-[30%] rounded-full border border-white/10" aria-hidden />
      </div>
      <span className="relative font-heading text-6xl text-on-primary/90" aria-hidden>
        ♪
      </span>
    </div>
  )
}

type PlayerHeroProps = {
  variant?: 'default' | 'warm'
  /** Full entry detail — used on the Entry page. */
  entryDetail?: DiaryEntryDetail
  /** Track from the global player — used in the mini-player dock overlays. */
  track?: PlayerTrack
  /** Optional actions rendered next to the mood pill (favorite, etc.). */
  headerActions?: ReactNode
  /** Optional toolbar under the title (share, download, etc.). */
  toolbar?: ReactNode
  /** Extra content under the toolbar (e.g. download errors). */
  belowToolbar?: ReactNode
  className?: string
  /**
   * How lyrics are presented.
   * - `below`: panel under the player (Entry page)
   * - `flip`: art face flips to lyrics
   * - `hidden`: no lyrics UI
   */
  lyricsMode?: 'below' | 'flip' | 'hidden'
  compact?: boolean
}

export function PlayerHero({
  variant = 'warm',
  entryDetail,
  track: trackProp,
  headerActions,
  toolbar,
  belowToolbar,
  className,
  lyricsMode = 'below',
  compact = false,
}: PlayerHeroProps) {
  const { t, i18n } = useTranslation()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { track: contextTrack, playFromDetail } = usePlayer()
  /** When equal to the current entry id, the art face is flipped to lyrics. */
  const [lyricsFaceEntryId, setLyricsFaceEntryId] = useState<string | null>(null)

  const track = trackProp ?? (entryDetail ? null : contextTrack)
  const primaryMusic = entryDetail?.musics?.[0] ?? null
  const musicState = entryDetail ? getMusicDisplayState(entryDetail.musics) : 'ready'
  const musicLoading = entryDetail ? isMusicContentLoading(musicState) : false
  const musicReady = entryDetail ? musicState === 'ready' : Boolean(track)
  const musicFailed = entryDetail ? musicState === 'failed' : false

  const mood = entryDetail?.mood ?? track?.mood ?? null
  const theme = getArchiveMoodTheme(toMoodIcon(mood))
  const moodLabel = capitalizeMood(mood)

  const createdAt = entryDetail?.createdAt ?? track?.createdAt
  let recordedDate: Date | null = null
  if (createdAt) {
    const d = new Date(createdAt)
    recordedDate = Number.isNaN(d.getTime()) ? null : d
  }

  const entryTitle = entryDetail?.title ?? track?.entryTitle ?? ''
  const displayMusicTitle = primaryMusic?.title ?? track?.title ?? entryTitle
  const imageLocation = primaryMusic?.imageLocation ?? track?.imageLocation ?? null
  const lyricsText = (primaryMusic?.lyrics ?? track?.lyrics)?.trim() ?? ''
  const entryId = entryDetail?.id ?? track?.entryId
  const canFlipToLyrics =
    lyricsMode === 'flip' && Boolean(lyricsText) && !musicLoading && !musicFailed
  const showLyricsFace = Boolean(entryId) && lyricsFaceEntryId === entryId

  async function handleActivate() {
    if (entryDetail) {
      await playFromDetail(entryDetail)
    }
  }

  const artFace = musicFailed ? (
    <AlbumArtPlaceholder failed />
  ) : musicLoading ? (
    <Skeleton className="size-full min-h-[16rem] rounded-[24px]" aria-hidden />
  ) : imageLocation ? (
    <img
      src={imageLocation}
      alt=""
      className="size-full object-cover"
      loading="eager"
      decoding="async"
    />
  ) : (
    <AlbumArtPlaceholder />
  )

  const lyricsFace = (
    <div className="flex size-full flex-col rounded-[24px] border border-warm-border/80 bg-cream-bg/95 p-4 backdrop-blur-sm">
      <h2 className="mb-2 shrink-0 font-heading text-base font-semibold text-ink">
        {t('entry.lyricsHeading')}
      </h2>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pr-1">
        <p className="whitespace-pre-wrap text-sm italic leading-relaxed text-body">{lyricsText}</p>
      </div>
    </div>
  )

  return (
    <div className={cn('space-y-6', className)}>
      <section className={cn('player-gradient rounded-[28px] px-4 py-8 sm:px-8 lg:px-12 lg:py-12')}>
        <div
          className={cn(
            'flex flex-col gap-8',
            compact ? 'lg:flex-col lg:items-stretch' : 'lg:flex-row lg:items-center lg:gap-11'
          )}
        >
          <div
            className={cn(
              'mx-auto w-full shrink-0',
              compact ? 'max-w-[280px]' : 'max-w-[400px] lg:mx-0'
            )}
          >
            {lyricsMode === 'flip' ? (
              <div
                className="relative aspect-square w-full [perspective:1200px]"
                aria-live="polite"
              >
                <div
                  className={cn(
                    'relative size-full [transform-style:preserve-3d]',
                    !prefersReducedMotion && 'transition-transform duration-500 ease-out',
                    showLyricsFace && '[transform:rotateY(180deg)]'
                  )}
                >
                  <div
                    className={cn(
                      'shadow-album-art absolute inset-0 overflow-hidden rounded-[24px] [backface-visibility:hidden]',
                      prefersReducedMotion && showLyricsFace && 'invisible'
                    )}
                  >
                    {artFace}
                  </div>
                  <div
                    className={cn(
                      'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]',
                      prefersReducedMotion && !showLyricsFace && 'invisible'
                    )}
                  >
                    {lyricsFace}
                  </div>
                </div>
              </div>
            ) : (
              <div className="shadow-album-art overflow-hidden rounded-[24px] aspect-square">
                {artFace}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex items-start justify-between gap-3">
              {recordedDate ? (
                <p className="label-caps text-player-brown">
                  {t('entry.nowPlaying', {
                    date: formatRecordedCaps(recordedDate, i18n.language),
                  })}
                </p>
              ) : (
                <span />
              )}
              <div className="flex shrink-0 items-center gap-1.5">
                {headerActions}
                {moodLabel ? (
                  <div
                    className={cn(
                      'flex items-center gap-1 rounded-full border px-2 py-0.5 lg:gap-1.5 lg:px-3 lg:py-1',
                      theme.moodPill
                    )}
                  >
                    <PastMelodyMoodIcon mood={toMoodIcon(mood)} className="size-3.5 lg:size-4" />
                    <span className="max-w-[5.5rem] truncate text-[9px] font-semibold uppercase tracking-wider lg:max-w-none lg:text-[10px]">
                      {moodLabel}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {musicLoading ? (
              <Skeleton className="h-12 w-3/4 max-w-lg" aria-hidden />
            ) : (
              <h1
                className={cn(
                  'font-heading font-semibold leading-tight text-player-ink',
                  compact ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-[2.875rem]'
                )}
              >
                {musicFailed ? entryTitle : displayMusicTitle}
              </h1>
            )}

            {!musicLoading &&
            !musicFailed &&
            primaryMusic?.title &&
            primaryMusic.title !== entryTitle ? (
              <p className="text-base font-medium text-player-brown">{entryTitle}</p>
            ) : null}

            {toolbar || canFlipToLyrics ? (
              <div className="flex flex-wrap items-center gap-2">
                {toolbar}
                {canFlipToLyrics ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-player-ink/30 bg-card-bg/50 px-3 py-1.5 text-sm font-semibold text-player-ink transition-colors hover:bg-card-bg/80"
                    onClick={() => setLyricsFaceEntryId(showLyricsFace ? null : (entryId ?? null))}
                    aria-pressed={showLyricsFace}
                  >
                    {showLyricsFace ? (
                      <>
                        <ImageIcon className="size-4" aria-hidden />
                        {t('player.showCover')}
                      </>
                    ) : (
                      <>
                        <Mic2 className="size-4" aria-hidden />
                        {t('player.showLyrics')}
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            ) : null}
            {belowToolbar}

            {musicFailed ? (
              <p className="text-sm font-medium text-error" role="alert">
                {t('entry.generationFailed')}
              </p>
            ) : musicLoading ? (
              <div className="space-y-3" aria-busy="true" aria-label={t('entry.generationLoading')}>
                <Skeleton className="h-1 w-full bg-player-ink/20" />
                <div className="flex justify-center gap-2">
                  <Skeleton className="size-9 rounded-full bg-player-ink/20" />
                  <Skeleton className="size-[4.625rem] rounded-full bg-player-ink/30" />
                  <Skeleton className="size-9 rounded-full bg-player-ink/20" />
                </div>
              </div>
            ) : musicReady && entryId ? (
              <PlayerControls
                variant={variant}
                controlsClassName="border-0 bg-transparent p-0 shadow-none"
                entryId={entryId}
                onActivate={entryDetail ? handleActivate : undefined}
              />
            ) : null}
          </div>
        </div>
      </section>

      {lyricsMode === 'below' && (lyricsText || musicLoading) ? (
        <article className="rounded-[20px] border border-warm-border bg-card-bg/80 p-6 backdrop-blur-sm lg:p-8">
          <h2 className="mb-4 font-heading text-lg font-semibold text-ink lg:text-xl">
            {t('entry.lyricsHeading')}
          </h2>
          <div className="max-h-[min(45vh,24rem)] overflow-y-auto overscroll-y-contain rounded-2xl bg-cream-bg/80 px-5 py-5 lg:max-h-96">
            {musicFailed ? (
              <div
                className="flex h-full min-h-[12rem] flex-col items-center justify-center gap-2 text-center text-error"
                role="alert"
              >
                <AlertCircle className="size-8 shrink-0" aria-hidden />
                <p className="text-sm font-medium">{t('entry.generationFailed')}</p>
              </div>
            ) : musicLoading ? (
              <div className="space-y-3" aria-busy="true" aria-label={t('entry.generationLoading')}>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[92%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[78%]" />
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-sm italic leading-relaxed text-body lg:text-base lg:leading-relaxed">
                {lyricsText}
              </p>
            )}
          </div>
        </article>
      ) : null}
    </div>
  )
}
