import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createCollection,
  type CreateCollectionPayload,
  type CreateCollectionResponse,
} from './create-collection'

export function useCreateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCollectionPayload) => createCollection(payload),
    onSuccess: (_data: CreateCollectionResponse) => {
      void queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}
