import { ChevronLeft, Download } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getMusicDisplayState, isMusicContentLoading } from '@/api/diary/generate-status'
import { getMusic } from '@/api/music/get-music'
import { useGetDiaryEntry } from '@/api/diary/use-get-diary-entry'
import { ComposingHeroLoaderCalm } from '@/components/loading/composing-loaders'
import { MusicFavoriteButton } from '@/components/MusicFavoriteButton'
import { MusicShareButton } from '@/components/MusicShareButton'
import { PlayerHero } from '@/components/player/PlayerHero'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { downloadBlob, extensionFromMime, sanitizeDownloadFilename } from '@/lib/download-blob'
import { ApiError } from '@/lib/api-request'

function EntryPageSkeleton() {
  const { t } = useTranslation()

  return (
    <div
      className="player-gradient relative flex min-h-[100dvh] flex-col px-5 pb-28 pt-4 sm:px-8 lg:min-h-0 lg:rounded-[28px] lg:px-12 lg:py-12"
      aria-busy="true"
      aria-live="polite"
      aria-label={t('entry.loading')}
    >
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Skeleton className="size-10 rounded-full bg-player-ink/15" />
        <Skeleton className="h-3 w-24 bg-player-ink/15" />
        <Skeleton className="size-10 rounded-full bg-player-ink/15" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-11">
        <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0">
          <Skeleton className="aspect-square w-full rounded-[24px] bg-player-ink/15" />
          <div className="mt-4 hidden gap-2 lg:flex">
            <Skeleton className="h-7 w-16 rounded-full bg-player-ink/15" />
            <Skeleton className="h-7 w-20 rounded-full bg-player-ink/15" />
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <div className="hidden items-start justify-between gap-3 lg:flex">
            <Skeleton className="h-3 w-44 bg-player-ink/15" />
            <Skeleton className="size-8 rounded-full bg-player-ink/15" />
          </div>

          <Skeleton className="h-12 w-3/4 max-w-lg bg-player-ink/20" />

          <div className="flex gap-2 lg:hidden">
            <Skeleton className="h-7 w-16 rounded-full bg-player-ink/15" />
            <Skeleton className="h-7 w-20 rounded-full bg-player-ink/15" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-1 w-full bg-player-ink/20" />
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="size-14 rounded-full bg-player-ink/30" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-10 rounded-full bg-player-ink/15 sm:w-20" />
                <Skeleton className="h-8 w-10 rounded-full bg-player-ink/15 sm:w-20" />
                <Skeleton className="h-8 w-10 rounded-full bg-player-ink/15 sm:w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Skeleton className="mt-8 h-16 w-full rounded-2xl bg-player-ink/10 lg:mt-10" />
    </div>
  )
}

export function EntryPage() {
  const { entryId } = useParams<{ entryId: string }>()
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useGetDiaryEntry(entryId)

  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const is404 = error instanceof ApiError && error.status === 404

  const primaryMusic = data?.musics?.[0] ?? null
  const musicState = getMusicDisplayState(data?.musics)
  const musicReady = musicState === 'ready'
  const musicLoading = isMusicContentLoading(musicState)
  const musicFailed = musicState === 'failed'

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

  const toolbar =
    musicFailed || !data ? null : (
      <>
        {primaryMusic ? (
          <MusicShareButton
            musicId={primaryMusic.id}
            shareToken={primaryMusic.shareToken}
            title={primaryMusic.title || data.title}
            disabled={!musicReady || musicLoading}
          />
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-player-ink/30 bg-card-bg/50 text-player-ink"
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

  return (
    <div>
      {/* Desktop: back to Past Melodies above the player (mobile uses in-player chevron) */}
      <Link
        to="/melodies"
        className="mb-6 hidden items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light lg:inline-flex"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        {t('entry.backToArchive')}
      </Link>

      {isLoading && <EntryPageSkeleton />}

      {isError && !is404 && (
        <div className="px-5 py-6 sm:px-8 lg:px-0">
          <Alert variant="destructive">{t('entry.error')}</Alert>
        </div>
      )}

      {is404 && (
        <p className="px-5 py-6 text-sm text-muted sm:px-8 lg:px-0" role="status">
          {t('entry.notFound')}
        </p>
      )}

      {data &&
        (musicLoading ? (
          <div className="px-5 py-6 sm:px-8 lg:px-0 lg:py-0">
            <ComposingHeroLoaderCalm
              title={t('melodyGeneration.composing')}
              subtitle={t('melodyGeneration.composingSubtitle')}
            />
          </div>
        ) : (
          <PlayerHero
            variant="warm"
            entryDetail={data}
            lyricsMode="flip"
            showBackLink
            headerActions={
              primaryMusic ? (
                <MusicFavoriteButton
                  musicId={primaryMusic.id}
                  isFavorited={primaryMusic.isFavorited}
                  variant="hero"
                />
              ) : null
            }
            toolbar={toolbar}
            belowToolbar={
              downloadError ? <Alert variant="destructive">{downloadError}</Alert> : null
            }
          />
        ))}
    </div>
  )
}
