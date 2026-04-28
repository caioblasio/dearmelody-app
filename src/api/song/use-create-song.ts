import { useMutation } from '@tanstack/react-query'
import { createSong, type CreateSongPayload, type CreateSongResponse } from './create-song'

type UseCreateSongOptions = {
  onSuccess?: (data: CreateSongResponse) => void | Promise<void>
  onError?: (error: Error) => void
}

export function useCreateSong(options?: UseCreateSongOptions) {
  return useMutation({
    mutationFn: (payload: CreateSongPayload) => createSong(payload),

    onSuccess: async (data) => {
      await options?.onSuccess?.(data)
    },

    onError: (error) => {
      options?.onError?.(error)
    },
  })
}
