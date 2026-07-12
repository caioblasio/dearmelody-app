import { AlertCircle, ChevronLeft, Download, Heart, Share2 } from 'lucide-react'
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
    <div className="album-art-gradient shadow-album-art relative flex min-h-[16rem] flex-1 items-center justify-center overflow-hidden rounded-[24px] lg:min-h-[25rem] lg:w-[400px]">
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
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        {t('entry.backToArchive')}
      </Link>

      {isLoading && (
        <p className="text-sm text-muted" role="status" aria-live="polite">
          {t('entry.loading')}
        </p>
      )}

      {isError && !is404 && (
        <p className="text-sm text-error" role="alert">
          {t('entry.error')}
        </p>
      )}

      {is404 && (
        <p className="text-sm text-muted" role="status">
          {t('entry.notFound')}
        </p>
      )}

      {data && recordedDate && (
        <div className="space-y-6">
          <section className="player-gradient -mx-4 rounded-[28px] px-4 py-8 sm:-mx-6 sm:px-8 lg:-mx-8 lg:px-12 lg:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-11">
              <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0">
                {musicFailed ? (
                  <AlbumArtPlaceholder failed />
                ) : musicLoading ? (
                  <Skeleton className="min-h-[16rem] w-full rounded-[24px] lg:min-h-[25rem]" aria-hidden />
                ) : primaryMusic?.imageLocation ? (
                  <div className="shadow-album-art overflow-hidden rounded-[24px]">
                    <img
                      src={primaryMusic.imageLocation}
                      alt=""
                      className="aspect-square w-full object-cover lg:w-[400px]"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <AlbumArtPlaceholder />
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="label-caps text-player-brown">
                    {t('entry.nowPlaying', {
                      date: formatRecordedCaps(recordedDate, i18n.language),
                    })}
                  </p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      aria-pressed={favorite}
                      aria-label={favorite ? t('entry.unfavorite') : t('entry.favorite')}
                      className={cn(
                        'rounded-full border border-warm-border/60 bg-card-bg/70 p-1.5 text-muted transition-colors hover:text-plum',
                        favorite && 'text-plum',
                      )}
                      onClick={toggleFavorite}
                    >
                      <Heart
                        className={cn('size-3.5 lg:size-4', favorite && 'fill-plum/60')}
                        aria-hidden
                      />
                    </button>
                    <div
                      className={cn(
                        'flex items-center gap-1 rounded-full border px-2 py-0.5 lg:gap-1.5 lg:px-3 lg:py-1',
                        theme.moodPill,
                      )}
                    >
                      <PastMelodyMoodIcon mood={toMoodIcon(data.mood)} className="size-3.5 lg:size-4" />
                      <span className="max-w-[5.5rem] truncate text-[9px] font-semibold uppercase tracking-wider lg:max-w-none lg:text-[10px]">
                        {moodLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {musicLoading ? (
                  <Skeleton className="h-12 w-3/4 max-w-lg" aria-hidden />
                ) : (
                  <h1 className="font-heading text-4xl font-semibold leading-tight text-player-ink sm:text-[2.875rem]">
                    {musicFailed ? data.title : displayMusicTitle}
                  </h1>
                )}

                {!musicLoading && !musicFailed && primaryMusic?.title && primaryMusic.title !== data.title ? (
                  <p className="text-base font-medium text-player-brown">{data.title}</p>
                ) : null}

                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm" className="gap-2 border-player-ink/30 text-player-ink" onClick={onShare}>
                    <Share2 className="size-4" aria-hidden />
                    <span className="hidden sm:inline">{t('entry.share')}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 border-player-ink/30 text-player-ink"
                    disabled={!musicReady || isDownloading}
                    onClick={onDownload}
                  >
                    <Download className="size-4" aria-hidden />
                    <span className="hidden sm:inline">
                      {isDownloading ? t('entry.downloading') : t('entry.download')}
                    </span>
                  </Button>
                </div>
                {downloadError ? (
                  <p className="text-sm text-error" role="alert">
                    {downloadError}
                  </p>
                ) : null}

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
                ) : musicReady && primaryMusic ? (
                  <AudioPlayer
                    musicId={primaryMusic.id}
                    variant="warm"
                    controlsClassName="border-0 bg-transparent p-0 shadow-none"
                  />
                ) : null}
              </div>
            </div>
          </section>

          {lyricsText || musicLoading ? (
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

          {data.entry.trim() ? (
            <details className="rounded-[20px] border border-warm-border bg-card-bg px-5 py-4 lg:px-6 lg:py-5">
              <summary className="label-caps cursor-pointer text-sand [&::-webkit-details-marker]:hidden">
                {t('entry.originalEntry')}
              </summary>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-body lg:text-base lg:leading-relaxed">
                {data.entry}
              </p>
            </details>
          ) : null}
        </div>
      )}
    </div>
  )
}
