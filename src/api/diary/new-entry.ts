import { apiRequest } from '@/lib/api-request'

export type NewEntryPayload = {
  reflection: string
  resonance: string
}

export type NewEntryResponse = {
  id: string
  title: string
  url: string
  duration: number
  mood: string
}

export async function createNewEntry(payload: NewEntryPayload): Promise<NewEntryResponse> {
  return apiRequest<NewEntryResponse>('/api/diary/new-entry', {
    method: 'POST',
    body: payload,
    auth: true,
  })
}
