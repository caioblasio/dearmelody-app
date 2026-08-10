import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeCollectionDiary } from './remove-collection-diary'
import { collectionQueryKey } from './use-get-collection'

type RemoveCollectionDiaryVariables = {
  id: number
  diaryId: string
}

export function useRemoveCollectionDiary() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, diaryId }: RemoveCollectionDiaryVariables) =>
      removeCollectionDiary(id, diaryId),
    onSuccess: (_data, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ['collections'] })
      void queryClient.invalidateQueries({ queryKey: collectionQueryKey(id) })
    },
  })
}
