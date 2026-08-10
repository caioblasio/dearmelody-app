import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCollection } from './delete-collection'

export function useDeleteCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCollection(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}
