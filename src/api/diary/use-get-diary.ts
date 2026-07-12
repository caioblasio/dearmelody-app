import { useQuery } from '@tanstack/react-query'

import type { DiaryListItem } from './diary-list-item'
import { getDiary, type GetDiaryParams } from './get-diary'

export function useGetDiary(params?: GetDiaryParams) {
  return useQuery<DiaryListItem[]>({
    queryKey: ['diary', params ?? {}],
    queryFn: () => getDiary(params),
    retry: false,
    refetchOnWindowFocus: false,
  })
}
