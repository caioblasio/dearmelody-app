import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { isFavoritesCollectionId } from '@/lib/collections'

export function CollectionDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isFavorites = isFavoritesCollectionId(id)

  return (
    <section className="space-y-3">
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {isFavorites ? t('collections.favouritesTitle') : t('collections.detailTitle')}
        </h1>
      </header>
    </section>
  )
}
