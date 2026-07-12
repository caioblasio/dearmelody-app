import { apiRequest } from '@/lib/api-request'

import type { DiaryListItem } from './diary-list-item'

export type GetDiaryParams = {
  limit?: number
  offset?: number
  mood?: string
  dateStart?: string
  dateEnd?: string
}

export async function getDiary(params?: GetDiaryParams): Promise<DiaryListItem[]> {
  const search = new URLSearchParams()
  if (params?.limit != null) search.set('limit', String(params.limit))
  if (params?.offset != null) search.set('offset', String(params.offset))
  if (params?.mood) search.set('mood', params.mood)
  if (params?.dateStart) search.set('dateStart', params.dateStart)
  if (params?.dateEnd) search.set('dateEnd', params.dateEnd)
  const query = search.toString()
  const url = query ? `/api/diary?${query}` : '/api/diary'

  return apiRequest<DiaryListItem[]>(url, { auth: true })
}
