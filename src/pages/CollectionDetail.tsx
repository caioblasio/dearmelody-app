import { ChevronLeft, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useCollectionPlayableEntries } from '@/api/collections/use-collection-playable-entries'
import { getMusic } from '@/api/music/get-music'
import { CollectionUpNext } from '@/components/collections/CollectionUpNext'
import { MusicFavoriteButton } from '@/components/MusicFavoriteButton'
import { MusicShareButton } from '@/components/MusicShareButton'
import { PlayerHero } from '@/components/player/PlayerHero'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ApiError } from '@/lib/api-request'
import { collectionEditPath, isFavoritesCollectionId } from '@/lib/collections'
import { downloadBlob, extensionFromMime, sanitizeDownloadFilename } from '@/lib/download-blob'
import { usePlayer } from '@/lib/player/use-player'

function CollectionDetailSkeleton() {
  const { t } = useTranslation()

  return (
    <div
      className="player-gradient relative flex min-h-[100dvh] flex-col px-5 pb-28 pt-4 sm:px-8 lg:min-h-0 lg:rounded-[28px] lg:px-12 lg:py-12"
      aria-busy="true"
      aria-live="polite"
      aria-label={t('collections.detailLoading')}
    >
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Skeleton className="size-10 rounded-full bg-player-ink/15" />
        <Skeleton className="h-3 w-24 bg-player-ink/15" />
        <Skeleton className="size-10 rounded-full bg-player-ink/15" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-11">
        <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0">
          <Skeleton className="aspect-square w-full rounded-[24px] bg-player-ink/15" />
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <Skeleton className="h-12 w-3/4 max-w-lg bg-player-ink/20" />
          <div className="space-y-3">
            <Skeleton className="h-1 w-full bg-player-ink/20" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-1">
                <Skeleton className="size-9 rounded-full bg-player-ink/15" />
                <Skeleton className="size-14 rounded-full bg-player-ink/30" />
                <Skeleton className="size-9 rounded-full bg-player-ink/15" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-10 rounded-full bg-player-ink/15 sm:w-20" />
                <Skeleton className="h-8 w-10 rounded-full bg-player-ink/15 sm:w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FavoritesCollectionStub() {
  const { t } = useTranslation()

  return (
    <section className="space-y-3 px-5 py-6 sm:px-8 lg:px-0">
      <Link
        to="/collections"
        className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        {t('collections.backToCollections')}
      </Link>
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {t('collections.favouritesTitle')}
        </h1>
        <p className="max-w-xl text-sm text-muted sm:text-base">
          {t('collections.favouritesDescription')}
        </p>
      </header>
    </section>
  )
}

export function CollectionDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isFavorites = isFavoritesCollectionId(id)
  const numericId = !isFavorites && id != null && /^\d+$/.test(id) ? Number(id) : undefined

  const { collection, playable, isLoading, isError, isEmptyCollection, hasNoPlayable } =
    useCollectionPlayableEntries(numericId)
  const { playFromDetail } = usePlayer()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  useEffect(() => {
    setCurrentIndex(0)
    setDownloadError(null)
  }, [numericId])

  useEffect(() => {
    if (playable.length === 0) {
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= playable.length) {
      setCurrentIndex(playable.length - 1)
    }
  }, [playable.length, currentIndex])

  if (isFavorites) {
    return <FavoritesCollectionStub />
  }

  if (id == null || numericId == null) {
    return (
      <p className="px-5 py-6 text-sm text-muted sm:px-8 lg:px-0" role="status">
        {t('collections.detailNotFound')}
      </p>
    )
  }

  const safeIndex = Math.min(currentIndex, Math.max(playable.length - 1, 0))
  const current = playable[safeIndex] ?? null
  const currentDetail = current?.detail ?? null
  const primaryMusic = currentDetail?.musics?.[0] ?? null

  const upNextItems = playable
    .slice(safeIndex + 1)
    .concat(playable.slice(0, safeIndex))
    .map((item) => ({
      id: item.detail.id,
      title: item.songTitle,
      entryTitle: item.detail.title,
      imageLocation: item.detail.musics?.[0]?.imageLocation ?? null,
    }))

  async function selectIndex(nextIndex: number) {
    const item = playable[nextIndex]
    if (!item) return
    setCurrentIndex(nextIndex)
    setDownloadError(null)
    await playFromDetail(item.detail)
  }

  async function onPrevious() {
    if (safeIndex <= 0) return
    await selectIndex(safeIndex - 1)
  }

  async function onNext() {
    if (safeIndex >= playable.length - 1) return
    await selectIndex(safeIndex + 1)
  }

  async function onSelectUpNext(entryId: string) {
    const nextIndex = playable.findIndex((item) => item.detail.id === entryId)
    if (nextIndex < 0) return
    await selectIndex(nextIndex)
  }

  async function onDownload() {
    if (!primaryMusic || !currentDetail || isDownloading) return

    setIsDownloading(true)
    setDownloadError(null)
    try {
      const blob = await getMusic(primaryMusic.id)
      const filename = `${sanitizeDownloadFilename(primaryMusic.title || currentDetail.title || 'melody')}.${extensionFromMime(blob.type)}`
      downloadBlob(blob, filename)
    } catch (err) {
      setDownloadError(err instanceof ApiError ? t('entry.downloadError') : t('entry.error'))
    } finally {
      setIsDownloading(false)
    }
  }

  const toolbar =
    currentDetail && primaryMusic ? (
      <>
        <MusicShareButton
          musicId={primaryMusic.id}
          shareToken={primaryMusic.shareToken}
          title={primaryMusic.title || currentDetail.title}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 border-player-ink/30 bg-card-bg/50 text-player-ink"
          disabled={isDownloading}
          onClick={() => void onDownload()}
        >
          <Download className="size-4" aria-hidden />
          <span className="hidden sm:inline">
            {isDownloading ? t('entry.downloading') : t('entry.download')}
          </span>
        </Button>
      </>
    ) : null

  return (
    <div>
      <div className="mb-6 hidden items-center justify-between gap-3 lg:flex">
        <Link
          to="/collections"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          {t('collections.backToCollections')}
        </Link>
        {!isLoading && !isError ? (
          <Link
            to={collectionEditPath(numericId)}
            className="text-sm font-semibold text-coral transition-colors hover:text-coral-light"
          >
            {t('collections.editCollection')}
          </Link>
        ) : null}
      </div>

      {isLoading && <CollectionDetailSkeleton />}

      {isError && (
        <div className="px-5 py-6 sm:px-8 lg:px-0">
          <Alert variant="destructive">{t('collections.detailLoadError')}</Alert>
        </div>
      )}

      {!isLoading && !isError && isEmptyCollection && (
        <section className="space-y-3 px-5 py-6 sm:px-8 lg:px-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
              {collection?.title ?? t('collections.detailTitle')}
            </h1>
            <Link
              to={collectionEditPath(numericId)}
              className="text-sm font-semibold text-coral transition-colors hover:text-coral-light lg:hidden"
            >
              {t('collections.editCollection')}
            </Link>
          </div>
          {collection?.description ? (
            <p className="max-w-xl text-sm text-muted sm:text-base">{collection.description}</p>
          ) : null}
          <p className="text-sm text-muted" role="status">
            {t('collections.detailEmpty')}
          </p>
        </section>
      )}

      {!isLoading && !isError && hasNoPlayable && (
        <section className="space-y-3 px-5 py-6 sm:px-8 lg:px-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
              {collection?.title ?? t('collections.detailTitle')}
            </h1>
            <Link
              to={collectionEditPath(numericId)}
              className="text-sm font-semibold text-coral transition-colors hover:text-coral-light lg:hidden"
            >
              {t('collections.editCollection')}
            </Link>
          </div>
          <p className="text-sm text-muted" role="status">
            {t('collections.detailNoPlayable')}
          </p>
        </section>
      )}

      {!isLoading && !isError && currentDetail ? (
        <PlayerHero
          variant="warm"
          entryDetail={currentDetail}
          lyricsMode="flip"
          showBackLink
          backHref="/collections"
          backAriaLabel={t('collections.backAria')}
          eyebrow={collection?.title}
          transport="skip"
          canPrevious={safeIndex > 0}
          canNext={safeIndex < playable.length - 1}
          onPrevious={() => void onPrevious()}
          onNext={() => void onNext()}
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
          belowControls={
            <CollectionUpNext
              items={upNextItems}
              onSelect={(entryId) => void onSelectUpNext(entryId)}
              trailing={
                <Link
                  to={collectionEditPath(numericId)}
                  className="text-sm font-semibold text-player-brown transition-colors hover:text-player-ink lg:hidden"
                >
                  {t('collections.editCollection')}
                </Link>
              }
            />
          }
        />
      ) : null}
    </div>
  )
}
