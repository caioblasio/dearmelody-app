import { apiRequest } from '@/lib/api-request'

export type CreateSongPayload = {
  reflection: string
  resonance: string
}

export type CreateSongResponse = {
  id: string
  title: string
  url: string
  duration: number
  mood: string
}

export async function createSong(payload: CreateSongPayload): Promise<CreateSongResponse> {
  try {
    return await apiRequest<CreateSongResponse>('/api/create_song', {
      method: 'POST',
      body: payload,
    })
  } catch (error) {
    throw error
  }
}
