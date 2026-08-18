import { apiRequest } from '@/lib/api-request'

import type { CollectionSummary } from './collection-summary'
import type { GetCollectionsParams } from './get-collections'

export async function getDiaryEntryCollections(
  diaryId: string,
  params?: GetCollectionsParams,
): Promise<CollectionSummary[]> {
  const search = new URLSearchParams()
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.offset != null) search.set('offset', String(params.offset))
  const query = search.toString()
  const url = query
    ? `/api/diary/${encodeURIComponent(diaryId)}/collection?${query}`
    : `/api/diary/${encodeURIComponent(diaryId)}/collection`

  return apiRequest<CollectionSummary[]>(url, { auth: true })
}
