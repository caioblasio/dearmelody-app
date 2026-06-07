import { AlertCircle, ChevronLeft, Download, Heart, Share2, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getMusicDisplayState, isMusicContentLoading } from '@/api/diary/generate-status'
import { getMusic } from '@/api/music/get-music'
import { useGetDiaryEntry } from '@/api/diary/use-get-diary-entry'
import { AudioPlayer } from '@/components/AudioPlayer'
import { PastMelodyMoodIcon } from '@/components/PastMelodyMoodIcon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ARCHIVE_CARD_SHELL_GEOMETRY, archiveCardShellNeutralClass } from '@/lib/archive-card-shell'
import { downloadBlob, extensionFromMime, sanitizeDownloadFilename } from '@/lib/download-blob'
import { ApiError } from '@/lib/api-request'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import { cn } from '@/lib/utils'

function formatRecordedCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

export function EntryPage() {
  const { entryId } = useParams<{ entryId: string }>()
  const { t, i18n } = useTranslation()
  const { data, isLoading, isError, error } = useGetDiaryEntry(entryId)

  const [favoriteByEntryId, setFavoriteByEntryId] = useState<Record<string, boolean>>({})
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const is404 = error instanceof ApiError && error.status === 404

  const primaryMusic = data?.musics?.[0] ?? null
  const musicState = getMusicDisplayState(data?.musics)
  const musicLoading = isMusicContentLoading(musicState)
  const musicReady = musicState === 'ready'
  const musicFailed = musicState === 'failed'

  let recordedDate: Date | null = null
  if (data?.createdAt) {
    const d = new Date(data.createdAt)
    recordedDate = Number.isNaN(d.getTime()) ? null : d
  }

  const theme = data ? getArchiveMoodTheme(toMoodIcon(data.mood)) : getArchiveMoodTheme('serene')

  const favorite = data
    ? data.id in favoriteByEntryId
      ? favoriteByEntryId[data.id]
      : Boolean(data.favorite)
    : false

  function toggleFavorite() {
    if (!data) return
    setFavoriteByEntryId((prev) => {
      const prior = data.id in prev ? prev[data.id] : Boolean(data.favorite)
      return { ...prev, [data.id]: !prior }
    })
  }

  const lyricsText = primaryMusic?.lyrics?.trim() ?? ''

  const moodLabel = capitalizeMood(data?.mood ?? '')
  const displayMusicTitle = primaryMusic?.title ?? data?.title ?? ''

  async function onDownload() {
    if (!primaryMusic || !musicReady || isDownloading) return

    setIsDownloading(true)
    setDownloadError(null)
    try {
      const blob = await getMusic(primaryMusic.id)
      const filename = `${sanitizeDownloadFilename(primaryMusic.title ?? data?.title ?? 'melody')}.${extensionFromMime(blob.type)}`
      downloadBlob(blob, filename)
    } catch (err) {
      setDownloadError(err instanceof ApiError ? t('entry.downloadError') : t('entry.error'))
    } finally {
      setIsDownloading(false)
    }
  }

  async function onShare() {
    const shareData = {
      title: data?.title,
      text: data?.entry?.slice(0, 280),
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      }
    } catch {
      /* user cancelled or clipboard denied */
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <Link
        to="/melodies"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        {t('entry.backToArchive')}
      </Link>

      {isLoading && (
        <p className="text-sm text-on-surface-variant" role="status" aria-live="polite">
          {t('entry.loading')}
        </p>
      )}

      {isError && !is404 && (
        <p className="text-sm text-error" role="alert">
          {t('entry.error')}
        </p>
      )}

      {is404 && (
        <p className="text-sm text-on-surface-variant" role="status">
          {t('entry.notFound')}
        </p>
      )}

      {data && recordedDate && (
        <div className="space-y-8">
          <header className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-tight lg:text-[11px] lg:tracking-wide',
                  theme.date
                )}
              >
                {t('entry.recorded', { date: formatRecordedCaps(recordedDate, i18n.language) })}
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  aria-pressed={favorite}
                  aria-label={favorite ? t('entry.unfavorite') : t('entry.favorite')}
                  className={cn(
                    'rounded-full border border-outline-variant/60 bg-surface-container-lowest p-1.5 text-on-surface-variant transition-colors hover:text-secondary',
                    favorite && 'text-secondary'
                  )}
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={cn('size-3.5 lg:size-4', favorite && 'fill-secondary/60')}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    'flex items-center gap-1 rounded-full border px-2 py-0.5 lg:gap-1.5 lg:px-3 lg:py-1',
                    theme.moodPill
                  )}
                >
                  <PastMelodyMoodIcon mood={toMoodIcon(data.mood)} className="size-3.5 lg:size-4" />
                  <span className="max-w-[5.5rem] truncate text-[9px] font-semibold uppercase tracking-wider lg:max-w-none lg:text-[10px]">
                    {moodLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                {musicLoading ? (
                  <Skeleton className="h-9 w-2/3 max-w-md sm:h-10" aria-hidden />
                ) : (
                  <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">
                    {musicFailed ? data.title : displayMusicTitle}
                  </h1>
                )}
                {!musicLoading &&
                !musicFailed &&
                primaryMusic?.title &&
                primaryMusic.title !== data.title ? (
                  <p className="text-base font-medium text-on-surface-variant">{data.title}</p>
                ) : null}
                {musicLoading ? (
                  <p className="text-base font-medium text-on-surface-variant">{data.title}</p>
                ) : null}
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                <Button type="button" variant="outline" size="sm" className="gap-2" onClick={onShare}>
                  <Share2 className="size-4" aria-hidden />
                  <span className="hidden sm:inline">{t('entry.share')}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={!musicReady || isDownloading}
                  onClick={onDownload}
                >
                  <Download className="size-4" aria-hidden />
                  <span className="hidden sm:inline">
                    {isDownloading ? t('entry.downloading') : t('entry.download')}
                  </span>
                </Button>
              </div>
              </div>
              {downloadError ? (
                <p className="text-sm text-error" role="alert">
                  {downloadError}
                </p>
              ) : null}
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8">
            <article
              className={cn(
                ARCHIVE_CARD_SHELL_GEOMETRY,
                'gap-4 border shadow-sm transition-[box-shadow] motion-safe:duration-300 lg:shadow-md',
                'hover:shadow-xl motion-reduce:transition-none',
                'lg:col-span-1 lg:h-full lg:min-h-0',
                theme.card
              )}
            >
              <div
                className={cn(
                  'flex min-h-0 flex-col overflow-hidden rounded-2xl border border-black/5 shadow-inner ring-1 ring-black/5',
                  'aspect-[16/10] max-h-[min(52vh,28rem)]',
                  'lg:aspect-auto lg:max-h-none lg:w-full lg:min-h-[13rem] lg:flex-1 lg:basis-0'
                )}
              >
                {musicFailed ? (
                  <div
                    className="flex min-h-[8rem] flex-1 flex-col items-center justify-center gap-2 bg-error-container/30 px-4 text-center text-error lg:min-h-[13rem]"
                    role="alert"
                  >
                    <AlertCircle className="size-8 shrink-0" aria-hidden />
                    <p className="text-sm font-medium">{t('entry.generationFailed')}</p>
                  </div>
                ) : musicLoading ? (
                  <Skeleton
                    className="h-full w-full min-h-[8rem] rounded-none lg:min-h-[13rem]"
                    aria-hidden
                  />
                ) : primaryMusic?.imageLocation ? (
                  <img
                    src={primaryMusic.imageLocation}
                    alt=""
                    className="h-full w-full min-h-0 flex-1 object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="flex min-h-[8rem] flex-1 items-center justify-center bg-surface-container-low text-on-surface-variant lg:min-h-[13rem]">
                    <Volume2 className="size-12 opacity-40" aria-hidden />
                  </div>
                )}
              </div>

              {musicFailed ? (
                <p className="text-center text-sm font-medium text-error" role="alert">
                  {t('entry.generationFailed')}
                </p>
              ) : musicLoading ? (
                <>
                  <div className="shrink-0 space-y-2" aria-hidden>
                    <Skeleton className="h-1 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  </div>
                  <div
                    className={cn(
                      'flex shrink-0 flex-col gap-3 border border-black/5 p-3 backdrop-blur-sm lg:rounded-2xl lg:p-4',
                      theme.player
                    )}
                  >
                    <div
                      className="space-y-3"
                      aria-busy="true"
                      aria-label={t('entry.generationLoading')}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Skeleton className="size-9 rounded-full" />
                        <Skeleton className="size-9 rounded-full" />
                        <Skeleton className="size-11 rounded-full" />
                        <Skeleton className="size-9 rounded-full" />
                        <Skeleton className="size-9 rounded-full" />
                      </div>
                      <Skeleton className="h-1 w-full" />
                    </div>
                  </div>
                </>
              ) : musicReady && primaryMusic ? (
                <AudioPlayer musicId={primaryMusic.id} controlsClassName={theme.player} />
              ) : null}
            </article>

            <article
              className={cn(
                archiveCardShellNeutralClass('flex min-h-0 flex-col gap-4 lg:col-span-2'),
                'lg:h-full lg:min-h-0'
              )}
            >
              <h2 className="shrink-0 font-serif text-lg font-semibold text-on-surface lg:text-xl">
                {t('entry.lyricsHeading')}
              </h2>
              <div className="max-h-[min(45vh,24rem)] overflow-y-auto overscroll-y-contain rounded-lg bg-[#fffaf2] px-4 py-4 text-on-surface lg:max-h-96 lg:px-6 lg:py-5">
                {musicFailed ? (
                  <div
                    className="flex h-full min-h-[12rem] flex-col items-center justify-center gap-2 text-center text-error"
                    role="alert"
                  >
                    <AlertCircle className="size-8 shrink-0" aria-hidden />
                    <p className="text-sm font-medium">{t('entry.generationFailed')}</p>
                  </div>
                ) : musicLoading ? (
                  <div
                    className="space-y-3"
                    aria-busy="true"
                    aria-label={t('entry.generationLoading')}
                  >
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[78%]" />
                    <Skeleton className="h-4 w-[88%]" />
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed lg:text-base lg:leading-relaxed">
                    {lyricsText}
                  </p>
                )}
              </div>
            </article>
          </div>

          {data.entry.trim() ? (
            <details className="rounded-lg border border-outline-variant/50 bg-surface-container-low/60 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-on-surface-variant [&::-webkit-details-marker]:hidden">
                {t('entry.originalEntry')}
              </summary>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-on-surface lg:text-base lg:leading-relaxed">
                {data.entry}
              </p>
            </details>
          ) : null}
        </div>
      )}
    </div>
  )
}
