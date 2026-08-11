import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGetCollections } from '@/api/collections/use-get-collections'
import { useGetFavoriteMusic } from '@/api/music/use-get-favorite-music'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { Alert } from '@/components/ui/alert'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FAVORITES_COLLECTION_ID,
  type CollectionCardData,
} from '@/lib/collections'
import { cn } from '@/lib/utils'

function CollectionCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-warm-border bg-card-bg lg:rounded-[22px]">
      <Skeleton className="h-36 w-full rounded-none sm:h-40" />
      <div className="space-y-2 p-4 sm:p-5">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  )
}

export function CollectionsPage() {
  const { t } = useTranslation()
  const favoritesQuery = useGetFavoriteMusic()
  const collectionsQuery = useGetCollections()

  const isLoading = favoritesQuery.isLoading || collectionsQuery.isLoading
  const isError = favoritesQuery.isError || collectionsQuery.isError

  const cards = useMemo(() => {
    const items: CollectionCardData[] = []

    const favorites = favoritesQuery.data
    if (favorites && favorites.length > 0) {
      items.push({
        id: FAVORITES_COLLECTION_ID,
        title: t('collections.favouritesTitle'),
        description: t('collections.favouritesDescription'),
        imageLocation: null,
        entryCount: favorites.length,
      })
    }

    for (const collection of collectionsQuery.data ?? []) {
      items.push({
        id: collection.id,
        title: collection.title,
        description: collection.description,
        imageLocation: collection.imageLocation,
        entryCount: collection.entryCount,
      })
    }

    return items
  }, [favoritesQuery.data, collectionsQuery.data, t])

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
            {t('collections.title')}
          </h1>
          <p className="text-muted">{t('collections.subtitle')}</p>
        </div>

        <Link
          to="/collections/new"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'w-full shrink-0 gap-1.5 font-heading sm:w-auto'
          )}
        >
          <Plus className="size-4" aria-hidden />
          {t('collections.newCollection')}
        </Link>
      </header>

      {isError && <Alert variant="destructive">{t('collections.loadError')}</Alert>}

      {isLoading && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <CollectionCardSkeleton />
          <CollectionCardSkeleton />
          <CollectionCardSkeleton />
        </div>
      )}

      {!isLoading && !isError && cards.length === 0 && (
        <p className="text-muted">{t('collections.empty')}</p>
      )}

      {!isLoading && !isError && cards.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {cards.map((collection) => (
            <CollectionCard key={String(collection.id)} collection={collection} />
          ))}
        </div>
      )}
    </section>
  )
}
