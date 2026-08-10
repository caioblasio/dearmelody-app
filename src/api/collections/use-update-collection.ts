import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  updateCollection,
  type UpdateCollectionPayload,
  type UpdateCollectionResponse,
} from './update-collection'
import { collectionQueryKey } from './use-get-collection'

type UpdateCollectionVariables = {
  id: number
  payload: UpdateCollectionPayload
}

export function useUpdateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCollectionVariables) => updateCollection(id, payload),
    onSuccess: (_data: UpdateCollectionResponse, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ['collections'] })
      void queryClient.invalidateQueries({ queryKey: collectionQueryKey(id) })
    },
  })
}
