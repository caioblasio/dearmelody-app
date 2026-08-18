import { apiRequest } from '@/lib/api-request'

import type { AdminInvite } from './admin-invite'

export async function getAdminInvites(): Promise<AdminInvite[]> {
  return apiRequest<AdminInvite[]>('/api/admin/invites', { auth: true })
}
