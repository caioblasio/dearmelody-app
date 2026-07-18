import { refreshAccessToken } from '@/api/auth/refresh'
import { getToken, logout } from '@/lib/auth'

export type ApiRequestInit = Omit<RequestInit, 'body'> & {
  body?: unknown
  /** When true, sends `Authorization: Bearer <token>` if a token is stored. */
  auth?: boolean
}

export class ApiError extends Error {
  public readonly status: number
  public readonly data: unknown

  constructor(status: number, data: unknown) {
    super(`Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

const AUTH_COOKIE_PATHS = new Set(['/api/auth', '/api/token/refresh', '/api/logout'])

function getApiPath(url: string): string {
  return new URL(resolveApiUrl(url), window.location.origin).pathname
}

function isAuthCookieEndpoint(url: string): boolean {
  return AUTH_COOKIE_PATHS.has(getApiPath(url))
}

export function resolveApiUrl(url: string): string {
  return url.startsWith('http') ? url : `${API_BASE}${url}`
}

/**
 * On an authed 401: try a single refresh. Returns true if the caller should retry.
 * On refresh failure or a second 401, logs out and returns false.
 */
async function tryRefreshAfterUnauthorized(
  status: number,
  url: string,
  requiresAuth: boolean,
  alreadyRetried: boolean,
): Promise<boolean> {
  if (status !== 401 || !requiresAuth || isAuthCookieEndpoint(url)) {
    return false
  }

  if (alreadyRetried) {
    void logout()
    return false
  }

  try {
    await refreshAccessToken()
    return true
  } catch {
    void logout()
    return false
  }
}

export async function fetchAuthenticatedBlob(url: string, alreadyRetried = false): Promise<Blob> {
  const token = getToken()
  const response = await fetch(resolveApiUrl(url), {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!response.ok) {
    if (await tryRefreshAfterUnauthorized(response.status, url, true, alreadyRetried)) {
      return fetchAuthenticatedBlob(url, true)
    }

    const errorData = await response.json().catch(() => null)
    throw new ApiError(response.status, errorData)
  }

  return response.blob()
}

export async function apiRequest<TResponse>(
  url: string,
  init: ApiRequestInit = {},
  alreadyRetried = false,
): Promise<TResponse> {
  const { body, headers, auth, ...rest } = init
  const resolvedUrl = resolveApiUrl(url)

  const authHeaders: Record<string, string> = {}
  if (auth) {
    const token = getToken()
    if (token) {
      authHeaders.Authorization = `Bearer ${token}`
    }
  }

  const response = await fetch(resolvedUrl, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    if (await tryRefreshAfterUnauthorized(response.status, url, auth === true, alreadyRetried)) {
      return apiRequest(url, init, true)
    }

    const errorData = await response.json().catch(() => null)
    throw new ApiError(response.status, errorData)
  }

  return (await response.json()) as TResponse
}
