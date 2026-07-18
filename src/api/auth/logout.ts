import { apiRequest } from '@/lib/api-request'

/** Revokes the server refresh cookie. Best-effort — callers should ignore failures. */
export async function logoutRequest(): Promise<void> {
  await apiRequest('/api/logout', {
    method: 'POST',
    credentials: 'include',
  })
}
