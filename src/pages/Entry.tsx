import { ChevronLeft, Download, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getMusicDisplayState, isMusicContentLoading } from '@/api/diary/generate-status'
import { getMusic } from '@/api/music/get-music'
import { useGetDiaryEntry } from '@/api/diary/use-get-diary-entry'
import { ComposingHeroLoaderCalm } from '@/components/loading/composing-loaders'
import { PlayerHero } from '@/components/player/PlayerHero'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { downloadBlob, extensionFromMime, sanitizeDownloadFilename } from '@/lib/download-blob'
import { ApiError } from '@/lib/api-request'
import { cn } from '@/lib/utils'

function EntryPageSkeleton() {
  const { t } = useTranslation()

  return (
    <div
      className="space-y-6"
      aria-busy="true"
      aria-live="polite"
      aria-label={t('entry.loading')}
    >
      <div className="rounded-[20px] border border-warm-border bg-card-bg px-5 py-4 lg:px-6 lg:py-5">
        <Skeleton className="h-3 w-32" />
        <div className="mt-3 space-y-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[94%]" />
          <Skeleton className="h-4 w-[88%]" />
          <Skeleton className="h-4 w-[72%]" />
        </div>
      </div>

      <section className="player-gradient rounded-[28px] px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-11">
          <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0">
            <Skeleton className="aspect-square w-full rounded-[24px]" />
          </div>

          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="h-3 w-44 bg-player-ink/15" />
              <div className="flex shrink-0 items-center gap-1.5">
                <Skeleton className="size-8 rounded-full bg-player-ink/15" />
                <Skeleton className="h-7 w-20 rounded-full bg-player-ink/15" />
              </div>
            </div>

            <Skeleton className="h-12 w-3/4 max-w-lg bg-player-ink/20" />

            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-8 w-20 rounded-md bg-player-ink/15" />
              <Skeleton className="h-8 w-24 rounded-md bg-player-ink/15" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-1 w-full bg-player-ink/20" />
              <div className="flex justify-center gap-2">
                <Skeleton className="size-9 rounded-full bg-player-ink/20" />
                <Skeleton className="size-[4.625rem] rounded-full bg-player-ink/30" />
                <Skeleton className="size-9 rounded-full bg-player-ink/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export function EntryPage() {
  const { entryId } = useParams<{ entryId: string }>()
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useGetDiaryEntry(entryId)

  const [favoriteByEntryId, setFavoriteByEntryId] = useState<Record<string, boolean>>({})
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const is404 = error instanceof ApiError && error.status === 404

  const primaryMusic = data?.musics?.[0] ?? null
  const musicState = getMusicDisplayState(data?.musics)
  const musicReady = musicState === 'ready'
  const musicLoading = isMusicContentLoading(musicState)
  const musicFailed = musicState === 'failed'

  let recordedDate: Date | null = null
  if (data?.createdAt) {
    const d = new Date(data.createdAt)
    recordedDate = Number.isNaN(d.getTime()) ? null : d
  }

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

      {isLoading && <EntryPageSkeleton />}

      {isError && !is404 && <Alert variant="destructive">{t('entry.error')}</Alert>}

      {is404 && (
        <p className="text-sm text-muted" role="status">
          {t('entry.notFound')}
        </p>
      )}

      {data && recordedDate && (
        <div className="space-y-6">
          {data.entry.trim() ? (
            <details
              open
              className="rounded-[20px] border border-warm-border bg-card-bg px-5 py-4 lg:px-6 lg:py-5"
            >
              <summary className="label-caps cursor-pointer text-sand [&::-webkit-details-marker]:hidden">
                {t('entry.originalEntry')}
              </summary>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-body lg:text-base lg:leading-relaxed">
                {data.entry}
              </p>
            </details>
          ) : null}

          {musicLoading ? (
            <ComposingHeroLoaderCalm
              title={t('melodyGeneration.composing')}
              subtitle={t('melodyGeneration.composingSubtitle')}
            />
          ) : (
            <PlayerHero
              variant="warm"
              entryDetail={data}
              lyricsMode="flip"
              headerActions={
                <button
                  type="button"
                  aria-pressed={favorite}
                  aria-label={favorite ? t('entry.unfavorite') : t('entry.favorite')}
                  className={cn(
                    'rounded-full border border-warm-border/60 bg-card-bg/70 p-1.5 text-muted transition-colors hover:text-plum',
                    favorite && 'text-plum'
                  )}
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={cn('size-3.5 lg:size-4', favorite && 'fill-plum/60')}
                    aria-hidden
                  />
                </button>
              }
              toolbar={
                musicFailed ? null : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2 border-player-ink/30 text-player-ink"
                      onClick={onShare}
                    >
                      <Share2 className="size-4" aria-hidden />
                      <span className="hidden sm:inline">{t('entry.share')}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2 border-player-ink/30 text-player-ink"
                      disabled={!musicReady || isDownloading || musicLoading}
                      onClick={onDownload}
                    >
                      <Download className="size-4" aria-hidden />
                      <span className="hidden sm:inline">
                        {isDownloading ? t('entry.downloading') : t('entry.download')}
                      </span>
                    </Button>
                  </>
                )
              }
              belowToolbar={
                downloadError ? <Alert variant="destructive">{downloadError}</Alert> : null
              }
            />
          )}
        </div>
      )}
    </div>
  )
}
