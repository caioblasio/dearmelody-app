import { apiRequest } from '@/lib/api-request'
import { setToken } from '@/lib/auth'

export type RefreshResponse = {
  token: string
}

let refreshPromise: Promise<string> | null = null

async function doRefresh(): Promise<string> {
  const data = await apiRequest<RefreshResponse>('/api/token/refresh', {
    method: 'POST',
    credentials: 'include',
  })
  setToken(data.token)
  return data.token
}

/** Single-flight refresh: concurrent callers share one POST /api/token/refresh. */
export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}
