import { useContext } from 'react'

import { MelodyGenerationContext } from './melody-generation-context'

export function useMelodyGeneration() {
  const ctx = useContext(MelodyGenerationContext)
  if (!ctx) {
    throw new Error('useMelodyGeneration must be used within a MelodyGenerationProvider')
  }
  return ctx
}
