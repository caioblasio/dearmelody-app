import { useMutation } from '@tanstack/react-query'

import { createNewEntry, type NewEntryPayload, type NewEntryResponse } from './new-entry'

type UseNewEntryOptions = {
  onSuccess?: (data: NewEntryResponse) => void | Promise<void>
  onError?: (error: Error) => void
}

export function useNewEntry(options?: UseNewEntryOptions) {
  return useMutation({
    mutationFn: (payload: NewEntryPayload) => createNewEntry(payload),

    onSuccess: async (data) => {
      await options?.onSuccess?.(data)
    },

    onError: (error) => {
      options?.onError?.(error)
    },
  })
}
