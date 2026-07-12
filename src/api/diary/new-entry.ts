import { apiRequest } from '@/lib/api-request'

export type NewEntryPayload = {
  entry: string
  genre: string
}

export type NewEntryResponse = {
  id: string
}

export async function createNewEntry(payload: NewEntryPayload): Promise<NewEntryResponse> {
  return apiRequest<NewEntryResponse>('/api/new_diary', {
    method: 'POST',
    body: {
      entry: payload.entry,
      genre: payload.genre,
    },
    auth: true,
  })
}
