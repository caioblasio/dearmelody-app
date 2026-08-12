import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  addCollectionDiary,
  type AddCollectionDiaryResponse,
} from './add-collection-diary'
import { collectionQueryKey } from './use-get-collection'

type AddCollectionDiaryVariables = {
  id: number
  diaryIds: string[]
}

export function useAddCollectionDiary() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, diaryIds }: AddCollectionDiaryVariables) =>
      addCollectionDiary(id, diaryIds),
    onSuccess: (_data: AddCollectionDiaryResponse, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ['collections'] })
      void queryClient.invalidateQueries({ queryKey: collectionQueryKey(id) })
    },
  })
}
