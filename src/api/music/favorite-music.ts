import { apiRequest } from '@/lib/api-request'

export type FavoriteMusicResponse = {
  id: number
}

export async function favoriteMusic(musicId: number): Promise<FavoriteMusicResponse> {
  return apiRequest<FavoriteMusicResponse>(`/api/music/${musicId}/favorite`, {
    method: 'POST',
    auth: true,
  })
}
