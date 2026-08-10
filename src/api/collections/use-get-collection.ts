import { useQuery } from '@tanstack/react-query'

import type { CollectionDetail } from './collection-detail'
import { getCollection } from './get-collection'

export const collectionQueryKey = (id: number) => ['collections', id] as const

export function useGetCollection(id: number | undefined) {
  return useQuery<CollectionDetail>({
    queryKey: collectionQueryKey(id!),
    queryFn: () => getCollection(id!),
    enabled: id != null,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
