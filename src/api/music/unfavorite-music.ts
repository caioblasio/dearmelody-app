import { apiRequest } from '@/lib/api-request'

export async function unfavoriteMusic(musicId: number): Promise<void> {
  await apiRequest<void>(`/api/music/${musicId}/favorite`, {
    method: 'DELETE',
    auth: true,
  })
}
