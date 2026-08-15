import { useQuery } from '@tanstack/react-query'

import type { DiaryMusicTrack } from '@/api/diary/diary-entry-detail'

import { getFavoriteMusic } from './get-favorite-music'

export const favoriteMusicQueryKey = ['music', 'favorites'] as const

export function useGetFavoriteMusic(enabled = true) {
  return useQuery<DiaryMusicTrack[]>({
    queryKey: favoriteMusicQueryKey,
    queryFn: () => getFavoriteMusic(),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
