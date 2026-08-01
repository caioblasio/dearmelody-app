import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import {
  getMusicDisplayState,
  musicReadyRefetchInterval,
} from '@/api/diary/generate-status'
import { getDiaryEntry } from '@/api/diary/get-diary-entry'
import { diaryEntryQueryKey } from '@/api/diary/use-get-diary-entry'

import {
  MelodyGenerationContext,
  type MelodyGenerationPhase,
} from './melody-generation-context'

export function MelodyGenerationProvider({ children }: { children: ReactNode }) {
  const [entryId, setEntryId] = useState<string | null>(null)
  const [phase, setPhase] = useState<MelodyGenerationPhase>('idle')
  const entryMatch = useMatch('/melodies/:entryId')

  const { data } = useQuery<DiaryEntryDetail>({
    queryKey: diaryEntryQueryKey(entryId ?? ''),
    queryFn: () => getDiaryEntry(entryId!),
    enabled: phase === 'composing' && Boolean(entryId),
    refetchInterval: (query) =>
      phase === 'composing' ? musicReadyRefetchInterval(query.state.data) : false,
  })

  useEffect(() => {
    if (phase !== 'composing' || !data) return

    const state = getMusicDisplayState(data.musics)
    if (state === 'ready') {
      const onTrackedEntry = entryMatch?.params.entryId === entryId
      if (onTrackedEntry) {
        setEntryId(null)
        setPhase('idle')
      } else {
        setPhase('ready')
      }
      return
    }
    if (state === 'failed') {
      setEntryId(null)
      setPhase('idle')
    }
  }, [data, phase, entryId, entryMatch?.params.entryId])

  const value = useMemo(
    () => ({
      entryId,
      phase,
      isComposing: phase === 'composing',
      startComposing: (id: string) => {
        setEntryId(id)
        setPhase('composing')
      },
      dismiss: () => {
        setEntryId(null)
        setPhase('idle')
      },
    }),
    [entryId, phase],
  )

  return (
    <MelodyGenerationContext.Provider value={value}>{children}</MelodyGenerationContext.Provider>
  )
}
