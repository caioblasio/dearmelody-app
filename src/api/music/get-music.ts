import { fetchAuthenticatedBlob } from '@/lib/api-request'

export async function getMusic(musicId: number): Promise<Blob> {
  return fetchAuthenticatedBlob(`/api/music/${musicId}`)
}
