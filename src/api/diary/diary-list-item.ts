export type DiaryMusicSummary = {
  id: number
  title: string
  imageLocation: string
  generateStatus: string
  styles: string[]
  isFavorited: boolean
  shareToken: string | null
}

export type DiaryListItem = {
  id: string
  title: string
  mood: string | null
  entry: string
  createdAt: string
  updatedAt: string
  music: DiaryMusicSummary | null
}
