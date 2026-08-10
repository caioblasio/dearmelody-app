import { apiRequest } from '@/lib/api-request'

import type { CollectionDetail } from './collection-detail'

export async function getCollection(id: number): Promise<CollectionDetail> {
  return apiRequest<CollectionDetail>(`/api/diary-collection/${id}`, { auth: true })
}
