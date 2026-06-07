import { apiRequest } from '@/lib/api-request'

export type NewEntryPayload = {
  entry: string
  resonance: string
  title?: string
}

export type NewEntryResponse = {
  id: string
}

export async function createNewEntry(payload: NewEntryPayload): Promise<NewEntryResponse> {
  const title = payload.title?.trim()

  return apiRequest<NewEntryResponse>('/api/new_diary', {
    method: 'POST',
    body: {
      entry: payload.entry,
      ...(title ? { title } : {}),
    },
    auth: true,
  })
}
