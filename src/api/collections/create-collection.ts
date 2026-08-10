import { apiRequest } from '@/lib/api-request'

export type CreateCollectionPayload = {
  title: string
  description?: string
}

export type CreateCollectionResponse = {
  id: number
}

export async function createCollection(
  payload: CreateCollectionPayload,
): Promise<CreateCollectionResponse> {
  return apiRequest<CreateCollectionResponse>('/api/diary-collection', {
    method: 'POST',
    body: {
      title: payload.title,
      ...(payload.description != null ? { description: payload.description } : {}),
    },
    auth: true,
  })
}
