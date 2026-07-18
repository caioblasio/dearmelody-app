import { apiRequest } from '@/lib/api-request'

import { decodeDiaryEntryDetail } from './decode-entry'
import type { DiaryEntryDetail } from './diary-entry-detail'

export async function getDiaryEntry(id: string): Promise<DiaryEntryDetail> {
  const detail = await apiRequest<DiaryEntryDetail>(`/api/diary/${encodeURIComponent(id)}`, { auth: true })
  return decodeDiaryEntryDetail(detail)
}
