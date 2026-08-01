import { useQuery } from '@tanstack/react-query'

import type { DiaryEntryDetail } from './diary-entry-detail'
import { musicReadyRefetchInterval } from './generate-status'
import { getDiaryEntry } from './get-diary-entry'

export const diaryEntryQueryKey = (id: string) => ['diary', 'entry', id] as const

export function useGetDiaryEntry(id: string | undefined) {
  return useQuery<DiaryEntryDetail>({
    queryKey: ['diary', 'entry', id],
    queryFn: () => getDiaryEntry(id!),
    enabled: Boolean(id),
    refetchInterval: (query) => musicReadyRefetchInterval(query.state.data),
  })
}
