import { apiRequest } from '@/lib/api-request'

import type { CollectionSummary } from './collection-summary'

export type GetCollectionsParams = {
  limit?: number
  offset?: number
}

export async function getCollections(params?: GetCollectionsParams): Promise<CollectionSummary[]> {
  const search = new URLSearchParams()
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.offset != null) search.set('offset', String(params.offset))
  const query = search.toString()
  const url = query ? `/api/diary-collection?${query}` : '/api/diary-collection'

  return apiRequest<CollectionSummary[]>(url, { auth: true })
}
