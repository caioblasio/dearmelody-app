import { apiRequest } from '@/lib/api-request'

import type { MusicSummary } from './music-summary'

export async function getFavoriteMusic(): Promise<MusicSummary[]> {
  return apiRequest<MusicSummary[]>('/api/music/favorites', { auth: true })
}
