import { useQuery } from '@tanstack/react-query'

import { getDiaryEntry } from './get-diary-entry'

export function useGetDiaryEntry(id: string | undefined) {
  return useQuery({
    queryKey: ['diary', 'entry', id],
    queryFn: () => getDiaryEntry(id!),
    enabled: Boolean(id),
  })
}
