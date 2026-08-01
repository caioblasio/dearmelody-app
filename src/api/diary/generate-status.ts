import type { DiaryEntryDetail, DiaryMusicTrack } from './diary-entry-detail'

export type GenerateStatus = 'new' | 'generating' | 'downloading' | 'done' | 'failed'

export type MusicDisplayState = 'pending' | 'loading' | 'ready' | 'failed'

/** Poll interval while melody generation is in progress. */
export const MUSIC_READY_POLL_MS = 2500

export function getMusicDisplayState(
  musics: DiaryMusicTrack[] | null | undefined
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

/** React Query refetchInterval while music is still generating. */
export function musicReadyRefetchInterval(data: DiaryEntryDetail | undefined): number | false {
  if (!data) return false
  return isMusicContentLoading(getMusicDisplayState(data.musics)) ? MUSIC_READY_POLL_MS : false
}
