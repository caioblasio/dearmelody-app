import { apiRequest } from '@/lib/api-request'

export type ShareMusicResponse = {
  shareToken: string
}

export async function shareMusic(musicId: number): Promise<ShareMusicResponse> {
  return apiRequest<ShareMusicResponse>(`/api/music/${musicId}/share`, {
    method: 'POST',
    auth: true,
  })
}
