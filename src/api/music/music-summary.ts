/** Item shape for `GET /api/music` (paginated list — not favorites). */
export type MusicSummary = {
  id: number
  title: string
  imageLocation: string | null
  generateStatus: string
  styles: string[]
  isFavorited: boolean
  shareToken: string | null
}
