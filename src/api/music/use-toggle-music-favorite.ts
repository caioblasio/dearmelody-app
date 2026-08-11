import { useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { ApiError } from '@/lib/api-request'

import { favoriteMusic } from './favorite-music'
import { unfavoriteMusic } from './unfavorite-music'
import { favoriteMusicQueryKey } from './use-get-favorite-music'

export type ToggleMusicFavoriteInput = {
  musicId: number
  /** Desired next favorited state. */
  isFavorited: boolean
}

type DiaryCacheSnapshot = {
  listQueries: Array<{ queryKey: readonly unknown[]; data: DiaryListItem[] | undefined }>
  entryQueries: Array<{ queryKey: readonly unknown[]; data: DiaryEntryDetail | undefined }>
}

function isDiaryListQueryKey(queryKey: readonly unknown[]): boolean {
  return queryKey[0] === 'diary' && queryKey[1] !== 'entry'
}

function isDiaryEntryQueryKey(queryKey: readonly unknown[]): boolean {
  return queryKey[0] === 'diary' && queryKey[1] === 'entry'
}

function setMusicFavoritedInList(
  items: DiaryListItem[],
  musicId: number,
  isFavorited: boolean,
): DiaryListItem[] {
  let changed = false
  const next = items.map((item) => {
    if (!item.music || item.music.id !== musicId || item.music.isFavorited === isFavorited) {
      return item
    }
    changed = true
    return { ...item, music: { ...item.music, isFavorited } }
  })
  return changed ? next : items
}

function setMusicFavoritedInDetail(
  detail: DiaryEntryDetail,
  musicId: number,
  isFavorited: boolean,
): DiaryEntryDetail {
  if (!detail.musics) return detail
  let changed = false
  const musics = detail.musics.map((track) => {
    if (track.id !== musicId || track.isFavorited === isFavorited) return track
    changed = true
    return { ...track, isFavorited }
  })
  return changed ? { ...detail, musics } : detail
}

function snapshotDiaryCaches(queryClient: QueryClient): DiaryCacheSnapshot {
  const listQueries = queryClient
    .getQueriesData<DiaryListItem[]>({ queryKey: ['diary'] })
    .filter(([queryKey]) => isDiaryListQueryKey(queryKey))
    .map(([queryKey, data]) => ({ queryKey, data }))

  const entryQueries = queryClient
    .getQueriesData<DiaryEntryDetail>({ queryKey: ['diary', 'entry'] })
    .filter(([queryKey]) => isDiaryEntryQueryKey(queryKey))
    .map(([queryKey, data]) => ({ queryKey, data }))

  return { listQueries, entryQueries }
}

function applyFavoritedToCaches(
  queryClient: QueryClient,
  musicId: number,
  isFavorited: boolean,
): void {
  const { listQueries, entryQueries } = snapshotDiaryCaches(queryClient)

  for (const { queryKey, data } of listQueries) {
    if (!data) continue
    const next = setMusicFavoritedInList(data, musicId, isFavorited)
    if (next !== data) {
      queryClient.setQueryData(queryKey, next)
    }
  }

  for (const { queryKey, data } of entryQueries) {
    if (!data) continue
    const next = setMusicFavoritedInDetail(data, musicId, isFavorited)
    if (next !== data) {
      queryClient.setQueryData(queryKey, next)
    }
  }
}

function restoreDiaryCaches(queryClient: QueryClient, snapshot: DiaryCacheSnapshot): void {
  for (const { queryKey, data } of snapshot.listQueries) {
    queryClient.setQueryData(queryKey, data)
  }
  for (const { queryKey, data } of snapshot.entryQueries) {
    queryClient.setQueryData(queryKey, data)
  }
}

export function useToggleMusicFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ musicId, isFavorited }: ToggleMusicFavoriteInput) => {
      if (isFavorited) {
        try {
          await favoriteMusic(musicId)
        } catch (error) {
          // Already favorited — treat as success so UI stays in sync.
          if (error instanceof ApiError && error.status === 409) return
          throw error
        }
        return
      }
      await unfavoriteMusic(musicId)
    },

    onMutate: async ({ musicId, isFavorited }) => {
      await queryClient.cancelQueries({ queryKey: ['diary'] })
      const snapshot = snapshotDiaryCaches(queryClient)
      applyFavoritedToCaches(queryClient, musicId, isFavorited)
      return { snapshot }
    },

    onError: (_error, _variables, context) => {
      if (context?.snapshot) {
        restoreDiaryCaches(queryClient, context.snapshot)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: favoriteMusicQueryKey })
    },
  })
}
