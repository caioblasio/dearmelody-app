import { apiRequest } from '@/lib/api-request'

export type UpdateCollectionPayload = {
  title?: string
  description?: string
}

export type UpdateCollectionResponse = {
  id: number
}

export async function updateCollection(
  id: number,
  payload: UpdateCollectionPayload,
): Promise<UpdateCollectionResponse> {
  return apiRequest<UpdateCollectionResponse>(`/api/diary-collection/${id}`, {
    method: 'PATCH',
    body: payload,
    auth: true,
  })
}
