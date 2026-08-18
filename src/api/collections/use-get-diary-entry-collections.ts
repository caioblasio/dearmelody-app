import { useQuery } from '@tanstack/react-query'

import type { CollectionSummary } from './collection-summary'
import type { GetCollectionsParams } from './get-collections'
import { getDiaryEntryCollections } from './get-diary-entry-collections'

export const diaryEntryCollectionsQueryKey = (
  diaryId: string,
  params?: GetCollectionsParams,
) => ['diary', 'entry', diaryId, 'collections', params ?? {}] as const

export function useGetDiaryEntryCollections(
  diaryId: string | undefined,
  params?: GetCollectionsParams,
  enabled = true,
) {
  return useQuery<CollectionSummary[]>({
    queryKey: diaryEntryCollectionsQueryKey(diaryId!, params),
    queryFn: () => getDiaryEntryCollections(diaryId!, params),
    enabled: Boolean(diaryId) && enabled,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
