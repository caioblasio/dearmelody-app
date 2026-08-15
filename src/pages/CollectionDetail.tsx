import { ChevronLeft, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useCollectionPlayableEntries } from '@/api/collections/use-collection-playable-entries'
import { getMusic } from '@/api/music/get-music'
import { useGetFavoriteMusic } from '@/api/music/use-get-favorite-music'
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
import { trackFromMusicTrack } from '@/lib/player/player-context'
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

export function CollectionDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isFavorites = isFavoritesCollectionId(id)
  const numericId = !isFavorites && id != null && /^\d+$/.test(id) ? Number(id) : undefined
  const editPath = !isFavorites && numericId != null ? collectionEditPath(numericId) : null

  const collectionState = useCollectionPlayableEntries(numericId)
  const favoritesQuery = useGetFavoriteMusic(isFavorites)
  const { playFromDetail, playFromMusicTrack } = usePlayer()

  const favoritesPlayable = (favoritesQuery.data ?? []).filter(
    (music) => music.generateStatus === 'done',
  )
  const playable = isFavorites ? [] : collectionState.playable
  const playableCount = isFavorites ? favoritesPlayable.length : playable.length
  const isLoading = isFavorites ? favoritesQuery.isLoading : collectionState.isLoading
  const isError = isFavorites ? favoritesQuery.isError : collectionState.isError
  const isEmpty = isFavorites
    ? favoritesQuery.isSuccess && (favoritesQuery.data?.length ?? 0) === 0
    : collectionState.isEmptyCollection
  const hasNoPlayable = isFavorites
    ? favoritesQuery.isSuccess &&
      (favoritesQuery.data?.length ?? 0) > 0 &&
      favoritesPlayable.length === 0
    : collectionState.hasNoPlayable

  const pageTitle = isFavorites
    ? t('collections.favouritesTitle')
    : (collectionState.collection?.title ?? t('collections.detailTitle'))
  const pageDescription = isFavorites
    ? t('collections.favouritesDescription')
    : collectionState.collection?.description

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  useEffect(() => {
    setCurrentIndex(0)
    setDownloadError(null)
  }, [numericId, isFavorites])

  useEffect(() => {
    if (playableCount === 0) {
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= playableCount) {
      setCurrentIndex(playableCount - 1)
    }
  }, [playableCount, currentIndex])

  if (!isFavorites && (id == null || numericId == null)) {
    return (
      <p className="px-5 py-6 text-sm text-muted sm:px-8 lg:px-0" role="status">
        {t('collections.detailNotFound')}
      </p>
    )
  }

  const safeIndex = Math.min(currentIndex, Math.max(playableCount - 1, 0))
  const currentEntry = isFavorites ? null : (playable[safeIndex] ?? null)
  const currentDetail = currentEntry?.detail ?? null
  const primaryMusic = currentDetail?.musics?.[0] ?? null
  const favoriteCurrent = isFavorites ? (favoritesPlayable[safeIndex] ?? null) : null
  const favoriteTrack = favoriteCurrent ? trackFromMusicTrack(favoriteCurrent) : null
  const currentMusic = favoriteCurrent ?? primaryMusic

  const upNextItems = isFavorites
    ? favoritesPlayable
        .slice(safeIndex + 1)
        .concat(favoritesPlayable.slice(0, safeIndex))
        .map((music) => ({
          id: String(music.id),
          title: music.title,
          entryTitle: music.title,
          imageLocation: music.imageLocation,
        }))
    : playable
        .slice(safeIndex + 1)
        .concat(playable.slice(0, safeIndex))
        .map((item) => ({
          id: item.detail.id,
          title: item.songTitle,
          entryTitle: item.detail.title,
          imageLocation: item.detail.musics?.[0]?.imageLocation ?? null,
        }))

  async function selectIndex(nextIndex: number) {
    if (isFavorites) {
      const music = favoritesPlayable[nextIndex]
      if (!music) return
      setCurrentIndex(nextIndex)
      setDownloadError(null)
      await playFromMusicTrack(music)
      return
    }

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
    if (safeIndex >= playableCount - 1) return
    await selectIndex(safeIndex + 1)
  }

  async function onSelectUpNext(itemId: string) {
    const nextIndex = isFavorites
      ? favoritesPlayable.findIndex((music) => String(music.id) === itemId)
      : playable.findIndex((item) => item.detail.id === itemId)
    if (nextIndex < 0) return
    await selectIndex(nextIndex)
  }

  async function onDownload() {
    if (!currentMusic || isDownloading) return

    setIsDownloading(true)
    setDownloadError(null)
    try {
      const blob = await getMusic(currentMusic.id)
      const filename = `${sanitizeDownloadFilename(currentMusic.title || currentDetail?.title || 'melody')}.${extensionFromMime(blob.type)}`
      downloadBlob(blob, filename)
    } catch (err) {
      setDownloadError(err instanceof ApiError ? t('entry.downloadError') : t('entry.error'))
    } finally {
      setIsDownloading(false)
    }
  }

  const editLink = editPath ? (
    <Link
      to={editPath}
      className="text-sm font-semibold text-coral transition-colors hover:text-coral-light"
    >
      {t('collections.editCollection')}
    </Link>
  ) : null

  const toolbar =
    currentMusic ? (
      <>
        <MusicShareButton
          musicId={currentMusic.id}
          shareToken={currentMusic.shareToken}
          title={currentMusic.title || currentDetail?.title || ''}
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

  const favoriteButton = currentMusic ? (
    <MusicFavoriteButton
      musicId={currentMusic.id}
      isFavorited={currentMusic.isFavorited}
      variant="hero"
    />
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
        {!isLoading && !isError ? editLink : null}
      </div>

      {isLoading && <CollectionDetailSkeleton />}

      {isError && (
        <div className="px-5 py-6 sm:px-8 lg:px-0">
          <Alert variant="destructive">{t('collections.detailLoadError')}</Alert>
        </div>
      )}

      {!isLoading && !isError && isEmpty && (
        <section className="space-y-3 px-5 py-6 sm:px-8 lg:px-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
              {pageTitle}
            </h1>
            {editLink ? <span className="lg:hidden">{editLink}</span> : null}
          </div>
          {pageDescription ? (
            <p className="max-w-xl text-sm text-muted sm:text-base">{pageDescription}</p>
          ) : null}
          <p className="text-sm text-muted" role="status">
            {isFavorites ? t('collections.favouritesEmpty') : t('collections.detailEmpty')}
          </p>
        </section>
      )}

      {!isLoading && !isError && hasNoPlayable && (
        <section className="space-y-3 px-5 py-6 sm:px-8 lg:px-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
              {pageTitle}
            </h1>
            {editLink ? <span className="lg:hidden">{editLink}</span> : null}
          </div>
          <p className="text-sm text-muted" role="status">
            {isFavorites ? t('collections.favouritesNoPlayable') : t('collections.detailNoPlayable')}
          </p>
        </section>
      )}

      {!isLoading && !isError && favoriteTrack && favoriteCurrent ? (
        <PlayerHero
          variant="warm"
          track={favoriteTrack}
          lyricsMode="flip"
          showBackLink
          backHref="/collections"
          backAriaLabel={t('collections.backAria')}
          eyebrow={pageTitle}
          transport="skip"
          canPrevious={safeIndex > 0}
          canNext={safeIndex < playableCount - 1}
          onPrevious={() => void onPrevious()}
          onNext={() => void onNext()}
          onActivate={() => playFromMusicTrack(favoriteCurrent)}
          headerActions={favoriteButton}
          toolbar={toolbar}
          belowToolbar={
            downloadError ? <Alert variant="destructive">{downloadError}</Alert> : null
          }
          belowControls={
            <CollectionUpNext
              items={upNextItems}
              onSelect={(itemId) => void onSelectUpNext(itemId)}
            />
          }
        />
      ) : null}

      {!isLoading && !isError && currentDetail ? (
        <PlayerHero
          variant="warm"
          entryDetail={currentDetail}
          lyricsMode="flip"
          showBackLink
          backHref="/collections"
          backAriaLabel={t('collections.backAria')}
          eyebrow={collectionState.collection?.title}
          transport="skip"
          canPrevious={safeIndex > 0}
          canNext={safeIndex < playableCount - 1}
          onPrevious={() => void onPrevious()}
          onNext={() => void onNext()}
          headerActions={favoriteButton}
          toolbar={toolbar}
          belowToolbar={
            downloadError ? <Alert variant="destructive">{downloadError}</Alert> : null
          }
          belowControls={
            <CollectionUpNext
              items={upNextItems}
              onSelect={(itemId) => void onSelectUpNext(itemId)}
              trailing={
                editPath ? (
                  <Link
                    to={editPath}
                    className="text-sm font-semibold text-player-brown transition-colors hover:text-player-ink lg:hidden"
                  >
                    {t('collections.editCollection')}
                  </Link>
                ) : null
              }
            />
          }
        />
      ) : null}
    </div>
  )
}
