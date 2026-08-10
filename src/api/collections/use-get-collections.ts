import { useQuery } from '@tanstack/react-query'

import type { CollectionSummary } from './collection-summary'
import { getCollections, type GetCollectionsParams } from './get-collections'

export const collectionsQueryKey = (params?: GetCollectionsParams) =>
  ['collections', params ?? {}] as const

export function useGetCollections(params?: GetCollectionsParams) {
  return useQuery<CollectionSummary[]>({
    queryKey: collectionsQueryKey(params),
    queryFn: () => getCollections(params),
    retry: false,
    refetchOnWindowFocus: false,
  })
}
