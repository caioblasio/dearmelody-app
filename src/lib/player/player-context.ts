import { createContext } from 'react'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'

export type PlayerTrack = {
  entryId: string
  musicId: number
  title: string
  entryTitle: string
  imageLocation: string | null
  lyrics: string | null
  mood: string | null
  createdAt: string
}

export type PlayerContextValue = {
  track: PlayerTrack | null
  isPlaying: boolean
  isLoading: boolean
  isResolving: boolean
  resolvingEntryId: string | null
  error: string | null
  currentTime: number
  duration: number
  volume: number
  isScrubbing: boolean
  scrubTime: number
  displayedTime: number
  playEntry: (entryId: string) => Promise<void>
  playFromDetail: (detail: DiaryEntryDetail) => Promise<void>
  togglePlay: () => Promise<void>
  seek: (time: number) => Promise<void>
  beginScrub: (time: number) => void
  setVolume: (volume: number) => void
  stop: () => void
  isCurrentEntry: (entryId: string) => boolean
}

export const PlayerContext = createContext<PlayerContextValue | null>(null)

export function trackFromDetail(detail: DiaryEntryDetail): PlayerTrack | null {
  const music = detail.musics?.[0]
  if (!music || music.generateStatus !== 'done') return null

  return {
    entryId: detail.id,
    musicId: music.id,
    title: music.title || detail.title,
    entryTitle: detail.title,
    imageLocation: music.imageLocation,
    lyrics: music.lyrics,
    mood: detail.mood,
    createdAt: detail.createdAt,
  }
}
