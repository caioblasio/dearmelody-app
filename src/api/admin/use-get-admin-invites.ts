import { useQuery } from '@tanstack/react-query'

import type { AdminInvite } from './admin-invite'
import { getAdminInvites } from './get-admin-invites'

export const adminInvitesQueryKey = ['admin', 'invites'] as const

export function useGetAdminInvites(enabled = true) {
  return useQuery<AdminInvite[]>({
    queryKey: adminInvitesQueryKey,
    queryFn: getAdminInvites,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
