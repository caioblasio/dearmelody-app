import { apiRequest } from '@/lib/api-request'

import type { DiaryEntryDetail } from './diary-entry-detail'

export async function getDiaryEntry(id: string): Promise<DiaryEntryDetail> {
  return apiRequest<DiaryEntryDetail>(`/api/diary/${encodeURIComponent(id)}`)
}
