import { useQueries } from '@tanstack/react-query'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import { getDiaryEntry } from '@/api/diary/get-diary-entry'
import { getMusicDisplayState } from '@/api/diary/generate-status'
import { diaryEntryQueryKey } from '@/api/diary/use-get-diary-entry'

import { useGetCollection } from './use-get-collection'

export type CollectionPlayableEntry = {
  detail: DiaryEntryDetail
  songTitle: string
}

export function useCollectionPlayableEntries(collectionId: number | undefined) {
  const collectionQuery = useGetCollection(collectionId)
  const entryIds = collectionQuery.data?.diaryEntries.map((entry) => entry.id) ?? []

  const entryQueries = useQueries({
    queries: entryIds.map((id) => ({
      queryKey: diaryEntryQueryKey(id),
      queryFn: () => getDiaryEntry(id),
      enabled: collectionQuery.isSuccess && entryIds.length > 0,
      refetchOnWindowFocus: false,
    })),
  })

  const isHydrating =
    collectionQuery.isSuccess &&
    entryIds.length > 0 &&
    entryQueries.some((query) => query.isLoading || query.isPending)

  const playable: CollectionPlayableEntry[] = []
  for (const query of entryQueries) {
    const detail = query.data
    if (!detail) continue
    if (getMusicDisplayState(detail.musics) !== 'ready') continue
    const music = detail.musics?.[0]
    if (!music) continue
    playable.push({
      detail,
      songTitle: music.title || detail.title,
    })
  }

  return {
    collection: collectionQuery.data,
    playable,
    isLoading: collectionQuery.isLoading || isHydrating,
    isError:
      collectionQuery.isError ||
      (entryIds.length > 0 &&
        !isHydrating &&
        entryQueries.length > 0 &&
        entryQueries.every((query) => query.isError)),
    isEmptyCollection:
      collectionQuery.isSuccess && (collectionQuery.data?.diaryEntries.length ?? 0) === 0,
    hasNoPlayable:
      collectionQuery.isSuccess &&
      !isHydrating &&
      (collectionQuery.data?.diaryEntries.length ?? 0) > 0 &&
      playable.length === 0,
  }
}
