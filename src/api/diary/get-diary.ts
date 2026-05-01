import { apiRequest } from '@/lib/api-request'
import type { PastMelodyEntry } from '@/lib/past-melodies-mock'

export type GetDiaryResponse = {
  entries: PastMelodyEntry[]
}

export async function getDiary(): Promise<GetDiaryResponse> {
  return apiRequest<GetDiaryResponse>('/api/diary')
}
