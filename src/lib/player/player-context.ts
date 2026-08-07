import { createContext } from 'react'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import type { MusicShare } from '@/api/music/music-share'

export type PlayerTrack = {
  entryId: string
  /** Present for owned diary tracks. Absent for public share playback. */
  musicId?: number
  /** Present when playing a public shared track. */
  shareToken?: string
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
  playFromShare: (share: MusicShare, token: string) => Promise<void>
  togglePlay: () => Promise<void>
  seek: (time: number) => Promise<void>
  beginScrub: (time: number) => void
  setVolume: (volume: number) => void
  stop: () => void
  isCurrentEntry: (entryId: string) => boolean
}

export const PlayerContext = createContext<PlayerContextValue | null>(null)

export function trackAudioKey(track: PlayerTrack): string | null {
  if (track.shareToken) return `share:${track.shareToken}`
  if (track.musicId != null) return `music:${track.musicId}`
  return null
}

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

export function trackFromShare(share: MusicShare, token: string): PlayerTrack {
  return {
    entryId: `share:${token}`,
    shareToken: token,
    title: share.title,
    entryTitle: share.title,
    imageLocation: share.imageLocation,
    lyrics: share.lyrics,
    mood: null,
    createdAt: share.createdAt,
  }
}

export function isSamePlayerTrack(a: PlayerTrack, b: PlayerTrack): boolean {
  if (a.entryId !== b.entryId) return false
  if (a.shareToken || b.shareToken) return a.shareToken === b.shareToken
  return a.musicId === b.musicId
}
