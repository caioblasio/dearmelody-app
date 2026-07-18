import { ChevronLeft, Download, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getMusicDisplayState, isMusicContentLoading } from '@/api/diary/generate-status'
import { getMusic } from '@/api/music/get-music'
import { useGetDiaryEntry } from '@/api/diary/use-get-diary-entry'
import { PlayerHero } from '@/components/player/PlayerHero'
import { Button } from '@/components/ui/button'
import { downloadBlob, extensionFromMime, sanitizeDownloadFilename } from '@/lib/download-blob'
import { ApiError } from '@/lib/api-request'
import { cn } from '@/lib/utils'

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
          {data.entry.trim() ? (
            <details open className="rounded-[20px] border border-warm-border bg-card-bg px-5 py-4 lg:px-6 lg:py-5">
              <summary className="label-caps cursor-pointer text-sand [&::-webkit-details-marker]:hidden">
                {t('entry.originalEntry')}
              </summary>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-body lg:text-base lg:leading-relaxed">
                {data.entry}
              </p>
            </details>
          ) : null}
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
            }
            belowToolbar={
              downloadError ? (
                <p className="text-sm text-error" role="alert">
                  {downloadError}
                </p>
              ) : null
            }
          />
        </div>
      )}
    </div>
  )
}
