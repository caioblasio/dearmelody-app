import { apiRequest } from '@/lib/api-request'

export async function removeCollectionDiary(id: number, diaryId: string): Promise<void> {
  await apiRequest<undefined>(`/api/diary-collection/${id}/diary/${diaryId}`, {
    method: 'DELETE',
    auth: true,
  })
}
