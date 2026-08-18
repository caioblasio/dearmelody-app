import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addCollectionDiary } from './add-collection-diary'
import type { CollectionSummary } from './collection-summary'
import { removeCollectionDiary } from './remove-collection-diary'
import { collectionQueryKey } from './use-get-collection'

export type ToggleEntryCollectionInput = {
  diaryId: string
  collection: CollectionSummary
  /** Desired next membership state — true means the entry should be in the collection. */
  isMember: boolean
}

export function useToggleEntryCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ diaryId, collection, isMember }: ToggleEntryCollectionInput) => {
      if (isMember) {
        await addCollectionDiary(collection.id, [diaryId])
        return
      }
      await removeCollectionDiary(collection.id, diaryId)
    },

    onMutate: async ({ diaryId, collection, isMember }) => {
      const membershipKey = ['diary', 'entry', diaryId, 'collections'] as const
      await queryClient.cancelQueries({ queryKey: membershipKey })

      const previousQueries = queryClient.getQueriesData<CollectionSummary[]>({
        queryKey: membershipKey,
      })

      for (const [queryKey] of previousQueries) {
        queryClient.setQueryData<CollectionSummary[]>(queryKey, (prev) => {
          const current = prev ?? []
          if (isMember) {
            if (current.some((item) => item.id === collection.id)) return current
            return [...current, collection]
          }
          return current.filter((item) => item.id !== collection.id)
        })
      }

      return { previousQueries }
    },

    onError: (_error, _variables, context) => {
      for (const [queryKey, data] of context?.previousQueries ?? []) {
        queryClient.setQueryData(queryKey, data)
      }
    },

    onSettled: (_data, _error, { diaryId, collection }) => {
      void queryClient.invalidateQueries({ queryKey: ['collections'] })
      void queryClient.invalidateQueries({ queryKey: collectionQueryKey(collection.id) })
      void queryClient.invalidateQueries({
        queryKey: ['diary', 'entry', diaryId, 'collections'],
      })
    },
  })
}
