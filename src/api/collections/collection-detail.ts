export type CollectionDiaryEntrySummary = {
  id: string
  title: string
  createdAt: string
  mood: string | null
}

export type CollectionDetail = {
  id: number
  title: string
  description: string | null
  imageLocation: string | null
  diaryEntries: CollectionDiaryEntrySummary[]
}
