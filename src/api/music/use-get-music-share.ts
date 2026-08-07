import { useQuery } from '@tanstack/react-query'

import { getMusicShare } from './get-music-share'
import type { MusicShare } from './music-share'

export const musicShareQueryKey = (token: string) => ['music', 'share', token] as const

export function useGetMusicShare(token: string | undefined) {
  return useQuery<MusicShare>({
    queryKey: musicShareQueryKey(token ?? ''),
    queryFn: () => getMusicShare(token!),
    enabled: Boolean(token),
    retry: false,
  })
}
