import { fetchAuthenticatedBlob } from '@/lib/api-request'

export async function getMusicStream(musicId: number): Promise<Blob> {
  return fetchAuthenticatedBlob(`/api/music/${musicId}/stream`)
}
