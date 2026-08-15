import type { DiaryMusicTrack } from '@/api/diary/diary-entry-detail'
import { apiRequest } from '@/lib/api-request'

/** GET /api/music/favorites — same per-music shape as `musics[]` on GET /api/diary/{id}. */
export async function getFavoriteMusic(): Promise<DiaryMusicTrack[]> {
  return apiRequest<DiaryMusicTrack[]>('/api/music/favorites', { auth: true })
}
