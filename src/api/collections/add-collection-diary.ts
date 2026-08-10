import { apiRequest } from '@/lib/api-request'

export type AddCollectionDiaryResponse = {
  id: number
}

export async function addCollectionDiary(
  id: number,
  diaryId: string,
): Promise<AddCollectionDiaryResponse> {
  return apiRequest<AddCollectionDiaryResponse>(`/api/diary-collection/${id}/diary`, {
    method: 'POST',
    body: { diaryId },
    auth: true,
  })
}
