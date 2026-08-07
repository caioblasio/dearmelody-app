import { useMutation, useQueryClient } from '@tanstack/react-query'

import { shareMusic } from './share-music'

export function useShareMusic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (musicId: number) => shareMusic(musicId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['diary', 'entry'] })
    },
  })
}
