import { AlertCircle, ChevronLeft, ImageIcon, Mic2 } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getMusicDisplayState, isMusicContentLoading } from '@/api/diary/generate-status'
import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import { useMelodyGenerationBarVisible } from '@/components/melody-generation/MelodyGenerationBar'
import { EntrySnippetBar } from '@/components/player/EntrySnippetBar'
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

function StyleChips({
  styles,
  moodLabel,
  mood,
  themeClass,
  className,
}: {
  styles: string[]
  moodLabel: string | null
  mood: string | null
  themeClass: string
  className?: string
}) {
  const chips: { key: string; label: string; mood?: boolean }[] = []
  if (moodLabel) chips.push({ key: 'mood', label: moodLabel, mood: true })
  for (const style of styles.slice(0, 2)) {
    const label = style.charAt(0).toUpperCase() + style.slice(1)
    chips.push({ key: style, label })
  }
  if (chips.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {chips.map((chip) =>
        chip.mood ? (
          <li
            key={chip.key}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
              themeClass
            )}
          >
            <PastMelodyMoodIcon mood={toMoodIcon(mood)} className="size-3.5" />
            {chip.label}
          </li>
        ) : (
          <li
            key={chip.key}
            className="rounded-full border border-player-ink/15 bg-card-bg/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-player-ink/80"
          >
            {chip.label}
          </li>
        )
      )}
    </ul>
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
  /** Share / download buttons — placed above the progress bar. */
  toolbar?: ReactNode
  /** Extra content under the controls (e.g. download errors). */
  belowToolbar?: ReactNode
  /** Content rendered directly under the transport controls (e.g. up-next list). */
  belowControls?: ReactNode
  className?: string
  /**
   * How lyrics are presented.
   * - `below`: panel under the player
   * - `flip`: art face flips to lyrics (default open when lyrics exist)
   * - `hidden`: no lyrics UI
   */
  lyricsMode?: 'below' | 'flip' | 'hidden'
  compact?: boolean
  /**
   * Stretch the player to the viewport on mobile (entry immersive layout).
   * Disable on share so banner / extras can sit below without a full-screen gap.
   */
  fillViewport?: boolean
  /** Show immersive mobile back control. */
  showBackLink?: boolean
  /** Destination for the back control (default: Past Melodies). */
  backHref?: string
  /** Accessible label for the back control. */
  backAriaLabel?: string
  /** Overrides the default “Now playing · from DATE” eyebrow. */
  eyebrow?: string
  /** Used when there is no `entryDetail` (e.g. public share playback). */
  onActivate?: () => void | Promise<void>
  /**
   * - `playOnly`: progress + play (entry page)
   * - `skip`: progress + prev / play / next (collection details)
   */
  transport?: 'playOnly' | 'skip'
  onPrevious?: () => void
  onNext?: () => void
  canPrevious?: boolean
  canNext?: boolean
}

export function PlayerHero({
  variant = 'warm',
  entryDetail,
  track: trackProp,
  headerActions,
  toolbar,
  belowToolbar,
  belowControls,
  className,
  lyricsMode = 'below',
  compact = false,
  fillViewport = true,
  showBackLink = false,
  backHref = '/melodies',
  backAriaLabel,
  eyebrow,
  onActivate: onActivateProp,
  transport = 'playOnly',
  onPrevious,
  onNext,
  canPrevious = false,
  canNext = false,
}: PlayerHeroProps) {
  const { t, i18n } = useTranslation()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { track: contextTrack, playFromDetail, setImmersiveEntryId } = usePlayer()
  const entryMatch = useMatch('/melodies/:entryId')
  const shareMatch = useMatch('/melodies/share/:shareToken')
  const showGenerationBar = useMelodyGenerationBarVisible()

  useEffect(() => {
    const immersiveId = entryDetail?.id ?? trackProp?.entryId
    if (!immersiveId) return
    setImmersiveEntryId(immersiveId)
    return () => setImmersiveEntryId(null)
  }, [entryDetail?.id, trackProp?.entryId, setImmersiveEntryId])

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
  const styles = primaryMusic?.styles ?? track?.styles ?? []
  const entryBody = entryDetail?.entry?.trim() ?? ''
  const entryId = entryDetail?.id ?? track?.entryId
  const canFlipToLyrics =
    lyricsMode === 'flip' && Boolean(lyricsText) && !musicLoading && !musicFailed

  /** Mini bar shows when another track is playing (not this entry / share / hero detail). */
  const isViewingCurrentTrack =
    Boolean(entryDetail?.id && contextTrack?.entryId === entryDetail.id) ||
    Boolean(trackProp?.entryId && contextTrack?.entryId === trackProp.entryId) ||
    (entryMatch?.params.entryId && contextTrack?.entryId === entryMatch.params.entryId) ||
    (shareMatch?.params.shareToken &&
      contextTrack?.entryId === `share:${shareMatch.params.shareToken}`)
  const showMiniBar = Boolean(contextTrack) && !isViewingCurrentTrack

  /** When set to the current entry id, the user has chosen the cover face. Lyrics are the default. */
  const [coverFaceEntryId, setCoverFaceEntryId] = useState<string | null>(null)
  const showLyricsFace = canFlipToLyrics && coverFaceEntryId !== entryId

  async function handleActivate() {
    if (entryDetail) {
      await playFromDetail(entryDetail)
      return
    }
    await onActivateProp?.()
  }

  const canActivate = Boolean(entryDetail || onActivateProp)

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
    <div className="flex size-full flex-col rounded-[24px] border border-warm-border/80 bg-cream-bg/95 p-4 backdrop-blur-sm sm:p-5">
      <h2 className="mb-2 shrink-0 font-heading text-base font-semibold text-ink lg:text-lg">
        {t('entry.lyricsHeading')}
      </h2>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pr-1">
        <p className="whitespace-pre-wrap text-base italic leading-relaxed text-body lg:text-lg lg:leading-relaxed">
          {lyricsText}
        </p>
      </div>
    </div>
  )

  const flipToggle =
    canFlipToLyrics ? (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-player-ink/30 bg-card-bg/50 px-3 py-1.5 text-sm font-semibold text-player-ink transition-colors hover:bg-card-bg/80"
        onClick={() =>
          setCoverFaceEntryId(showLyricsFace ? (entryId ?? null) : null)
        }
        aria-pressed={showLyricsFace}
      >
        {showLyricsFace ? (
          <>
            <ImageIcon className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t('player.showCover')}</span>
          </>
        ) : (
          <>
            <Mic2 className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t('player.showLyrics')}</span>
          </>
        )}
      </button>
    ) : null

  const trailingActions = (
    <>
      {toolbar}
      {flipToggle}
    </>
  )

  const artBlock = (
    <div
      className={cn(
        'mx-auto w-full shrink-0',
        compact ? 'max-w-[280px]' : 'max-w-[400px] lg:mx-0'
      )}
    >
      {lyricsMode === 'flip' ? (
        <div className="relative aspect-square w-full [perspective:1200px]" aria-live="polite">
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
        <div className="shadow-album-art aspect-square overflow-hidden rounded-[24px]">{artFace}</div>
      )}

      <StyleChips
        styles={styles}
        moodLabel={moodLabel}
        mood={mood}
        themeClass={theme.moodPill}
        className="mt-4 hidden lg:flex"
      />
    </div>
  )

  return (
    <div className={cn('space-y-6', className)}>
      <section
        className={cn(
          'player-gradient relative flex flex-col rounded-none px-5 pt-4 sm:px-8',
          /* Mobile immersive: full-bleed gradient; pad above fixed bottom chrome */
          fillViewport && 'min-h-[100dvh] pb-28',
          fillViewport && showMiniBar && !showGenerationBar && 'pb-[11.5rem]',
          fillViewport && showGenerationBar && !showMiniBar && 'pb-[11.5rem]',
          fillViewport && showGenerationBar && showMiniBar && 'pb-[15rem]',
          /* Share / contained: hug content so extras can sit below on mobile */
          !fillViewport && 'pb-8',
          /* Desktop: contained card */
          'lg:min-h-0 lg:rounded-[28px] lg:px-12 lg:pb-12 lg:pt-12'
        )}
      >
        {showBackLink ? (
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <Link
              to={backHref}
              className="inline-flex size-10 items-center justify-center rounded-full text-player-ink transition-colors hover:bg-player-ink/10"
              aria-label={backAriaLabel ?? t('entry.backAria')}
            >
              <ChevronLeft className="size-6" aria-hidden />
            </Link>
            {eyebrow ? (
              <p className="label-caps truncate text-player-brown">{eyebrow}</p>
            ) : recordedDate ? (
              <p className="label-caps text-player-brown">{t('player.nowPlaying')}</p>
            ) : (
              <span />
            )}
            <div className="flex size-10 shrink-0 items-center justify-center">{headerActions}</div>
          </div>
        ) : null}

        {eyebrow && !showBackLink ? (
          <p className="mb-6 label-caps text-player-brown lg:hidden">{eyebrow}</p>
        ) : null}

        <div
          className={cn(
            'flex flex-col gap-8',
            compact ? 'lg:flex-col lg:items-stretch' : 'lg:flex-row lg:items-start lg:gap-11'
          )}
        >
          {artBlock}

          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="hidden items-start justify-between gap-3 lg:flex">
              {eyebrow ? (
                <p className="label-caps text-player-brown">{eyebrow}</p>
              ) : recordedDate ? (
                <p className="label-caps text-player-brown">
                  {t('entry.nowPlaying', {
                    date: formatRecordedCaps(recordedDate, i18n.language),
                  })}
                </p>
              ) : (
                <span />
              )}
              <div className="flex shrink-0 items-center gap-1.5">{headerActions}</div>
            </div>

            {musicLoading ? (
              <Skeleton className="h-12 w-3/4 max-w-lg" aria-hidden />
            ) : (
              <h1
                className={cn(
                  'font-heading font-semibold leading-tight text-player-ink',
                  compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-[2.875rem]'
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

            <StyleChips
              styles={styles}
              moodLabel={moodLabel}
              mood={mood}
              themeClass={theme.moodPill}
              className="lg:hidden"
            />

            {belowToolbar}

            {musicFailed ? (
              <p className="text-sm font-medium text-error" role="alert">
                {t('entry.generationFailed')}
              </p>
            ) : musicLoading ? (
              <div
                className="space-y-3"
                aria-busy="true"
                aria-label={t('entry.generationLoading')}
              >
                <div className="mb-2 flex justify-start gap-2">
                  <Skeleton className="h-8 w-20 rounded-full bg-player-ink/15" />
                  <Skeleton className="h-8 w-20 rounded-full bg-player-ink/15" />
                </div>
                <Skeleton className="h-1 w-full bg-player-ink/20" />
                <div className="flex justify-center">
                  <Skeleton className="size-14 rounded-full bg-player-ink/30" />
                </div>
              </div>
            ) : musicReady && entryId ? (
              <>
                <PlayerControls
                  variant={variant}
                  transport={transport}
                  trailingActions={trailingActions}
                  entryId={entryId}
                  onActivate={canActivate ? handleActivate : undefined}
                  onPrevious={onPrevious}
                  onNext={onNext}
                  canPrevious={canPrevious}
                  canNext={canNext}
                />
                {belowControls}
              </>
            ) : null}

            {/* Desktop entry snippet sits under controls in the right column on lg;
                full-width bar spans below the two-column layout via the footer below. */}
          </div>
        </div>

        {entryBody ? (
          <div className="mt-auto pt-8 lg:mt-10 lg:pt-0">
            <EntrySnippetBar entryText={entryBody} entryTitle={entryTitle} />
          </div>
        ) : null}
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
              <p className="whitespace-pre-wrap text-base italic leading-relaxed text-body lg:text-lg lg:leading-relaxed">
                {lyricsText}
              </p>
            )}
          </div>
        </article>
      ) : null}
    </div>
  )
}
