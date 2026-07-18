import { apiRequest } from '@/lib/api-request'

export type NewEntryPayload = {
  entry: string
  music_style: string
}

export type NewEntryResponse = {
  id: string
}

export async function createNewEntry(payload: NewEntryPayload): Promise<NewEntryResponse> {
  return apiRequest<NewEntryResponse>('/api/new_diary', {
    method: 'POST',
    body: {
      entry: payload.entry,
      music_style: payload.music_style,
    },
    auth: true,
  })
}
