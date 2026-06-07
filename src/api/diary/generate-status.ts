import type { DiaryMusicTrack } from './diary-entry-detail'

export type GenerateStatus = 'new' | 'generating' | 'downloading' | 'done' | 'failed'

export type MusicDisplayState = 'pending' | 'loading' | 'ready' | 'failed'

export function getMusicDisplayState(
  musics: DiaryMusicTrack[] | null | undefined,
): MusicDisplayState {
  const primary = musics?.[0]
  if (!primary) return 'pending'

  const status = primary.generateStatus
  if (status === 'failed') return 'failed'
  if (status === 'done') return 'ready'
  if (status === 'new' || status === 'generating') return 'loading'
  if (status === 'downloading') return 'loading'

  return 'loading'
}

export function isMusicContentLoading(state: MusicDisplayState): boolean {
  return state === 'loading' || state === 'pending'
}
