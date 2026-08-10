import { apiRequest } from '@/lib/api-request'

export async function deleteCollection(id: number): Promise<void> {
  await apiRequest<undefined>(`/api/diary-collection/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}
