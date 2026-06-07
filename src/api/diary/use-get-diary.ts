import { useQuery } from '@tanstack/react-query'

import type { DiaryListItem } from './diary-list-item'
import { getDiary } from './get-diary'

export function useGetDiary() {
  return useQuery<DiaryListItem[]>({
    queryKey: ['diary'],
    queryFn: () => getDiary(),
    retry: false,
    refetchOnWindowFocus: false,
  })
}
