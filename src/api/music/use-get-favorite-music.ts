import { useQuery } from '@tanstack/react-query'

import type { MusicSummary } from './music-summary'
import { getFavoriteMusic } from './get-favorite-music'

export const favoriteMusicQueryKey = ['music', 'favorites'] as const

export function useGetFavoriteMusic() {
  return useQuery<MusicSummary[]>({
    queryKey: favoriteMusicQueryKey,
    queryFn: () => getFavoriteMusic(),
    retry: false,
    refetchOnWindowFocus: false,
  })
}
