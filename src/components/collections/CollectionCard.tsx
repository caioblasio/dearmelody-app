import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  collectionPath,
  FAVORITES_COLLECTION_ID,
  type CollectionCardData,
} from '@/lib/collections'
import { cn } from '@/lib/utils'

type CollectionCardProps = {
  collection: CollectionCardData
  className?: string
  coverClassName?: string
}

const DEFAULT_COVER = 'bg-gradient-to-br from-peach to-coral'
const FAVORITES_COVER = 'bg-gradient-to-br from-[#ff9aa8] to-[#e0455a]'

export function CollectionCard({ collection, className, coverClassName }: CollectionCardProps) {
  const { t } = useTranslation()
  const isFavorites = collection.id === FAVORITES_COLLECTION_ID

  const meta = isFavorites
    ? t('collections.songCount', { count: collection.entryCount })
    : t('collections.entryCount', { count: collection.entryCount })

  return (
    <Link
      to={collectionPath(collection.id)}
      className={cn(
        'group flex flex-col overflow-hidden rounded-[20px] border border-warm-border bg-card-bg shadow-sm',
        'motion-safe:transition-[box-shadow,border-color] hover:border-peach hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/30',
        'lg:rounded-[22px]',
        className
      )}
    >
      <div
        className={cn(
          'relative flex h-36 items-end overflow-hidden p-4 sm:h-40',
          isFavorites ? FAVORITES_COVER : DEFAULT_COVER,
          coverClassName
        )}
      >
        {collection.imageLocation ? (
          <img
            src={collection.imageLocation}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        {isFavorites ? (
          <Heart
            className="absolute right-4 top-4 size-6 text-white/35"
            fill="currentColor"
            aria-hidden
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4 sm:p-5">
        <h2 className="font-heading text-lg font-semibold text-ink sm:text-xl">{collection.title}</h2>
        {collection.description ? (
          <p className="line-clamp-2 text-sm text-muted">{collection.description}</p>
        ) : null}
        <p className="mt-auto pt-2 text-xs text-muted">{meta}</p>
      </div>
    </Link>
  )
}
