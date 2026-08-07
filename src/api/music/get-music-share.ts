import { apiRequest } from '@/lib/api-request'

import type { MusicShare } from './music-share'

export async function getMusicShare(token: string): Promise<MusicShare> {
  return apiRequest<MusicShare>(`/api/music/share/${encodeURIComponent(token)}`)
}
