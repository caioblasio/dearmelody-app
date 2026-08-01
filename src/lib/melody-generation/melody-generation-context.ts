import { createContext } from 'react'

export type MelodyGenerationPhase = 'idle' | 'composing' | 'ready'

export type MelodyGenerationContextValue = {
  entryId: string | null
  phase: MelodyGenerationPhase
  isComposing: boolean
  startComposing: (entryId: string) => void
  dismiss: () => void
}

export const MelodyGenerationContext = createContext<MelodyGenerationContextValue | null>(
  null,
)
