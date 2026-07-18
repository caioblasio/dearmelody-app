import type { GenerateStatus } from './generate-status'

export type DiaryMusicTrack = {
  id: number
  title: string
  service: string
  imageLocation: string | null
  lyrics: string | null
  generateStatus: GenerateStatus
  createdAt: string
}

export type DiaryEntryDetail = {
  id: string
  title: string
  mood: string | null
  entry: string
  createdAt: string
  updatedAt: string
  favorite?: boolean
  musics: DiaryMusicTrack[] | null
}
