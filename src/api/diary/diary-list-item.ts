export type DiaryMusicSummary = {
  title: string
  imageLocation: string
  generateStatus: string
}

export type DiaryListItem = {
  id: string
  title: string
  mood: string
  entry: string
  createdAt: string
  updatedAt: string
  music: DiaryMusicSummary | null
}
