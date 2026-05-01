import { useQuery } from '@tanstack/react-query'

import { getDiary } from './get-diary'

export function useGetDiary() {
  return useQuery({
    queryKey: ['diary'],
    queryFn: getDiary,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
