import { useQuery } from '@tanstack/react-query'

import type { DiaryEntryDetail } from './diary-entry-detail'
import { getDiaryEntry } from './get-diary-entry'

export function useGetDiaryEntry(id: string | undefined) {
  return useQuery<DiaryEntryDetail>({
    queryKey: ['diary', 'entry', id],
    queryFn: () => getDiaryEntry(id!),
    enabled: Boolean(id),
  })
}
