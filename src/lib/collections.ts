/** Sentinel id for the virtual favourites collection in `/collections/:id`. */
export const FAVORITES_COLLECTION_ID = 'favorites' as const

export type CollectionId = number | typeof FAVORITES_COLLECTION_ID

/** Card / list model — real API summaries plus the hardcoded favourites pseudo-collection. */
export type CollectionCardData = {
  id: CollectionId
  title: string
  description: string | null
  imageLocation: string | null
  entryCount: number
}

export function isFavoritesCollectionId(id: string | undefined): boolean {
  return id === FAVORITES_COLLECTION_ID
}

export function collectionPath(id: CollectionId): string {
  return `/collections/${id}`
}

export function collectionEditPath(id: number): string {
  return `/collections/${id}/edit`
}
