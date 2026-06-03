export type DiaryMusicTrack = {
  id: number
  title: string
  service: string
  location: string | null
  imageLocation: string | null
  lyrics: string | null
  createdAt: string
}

export type DiaryEntryDetail = {
  id: string
  title: string
  mood: string
  entry: string
  createdAt: string
  updatedAt: string
  /** Present when the API exposes it; mock maps from archive favorite. */
  favorite?: boolean
  musics: DiaryMusicTrack[] | null
}
