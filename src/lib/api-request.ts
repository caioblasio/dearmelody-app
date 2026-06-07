import { getToken, logout } from '@/lib/auth'

export type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: unknown
  /** When true, sends `Authorization: Bearer <token>` if a token is stored. */
  auth?: boolean
}

export class ApiError extends Error {
  public readonly status: number
  public readonly data: unknown

  constructor(status: number, data: unknown) {
    super(`Request failed with status ${status}`)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

function isLoginEndpoint(url: string): boolean {
  const path = new URL(resolveApiUrl(url), window.location.origin).pathname
  return path === '/api/auth'
}

function handleUnauthorized(status: number, url: string, requiresAuth: boolean) {
  if (status === 401 && requiresAuth && !isLoginEndpoint(url)) {
    logout()
  }
}

export function resolveApiUrl(url: string): string {
  return url.startsWith('http') ? url : `${API_BASE}${url}`
}

export async function fetchAuthenticatedBlob(url: string): Promise<Blob> {
  const token = getToken()
  const response = await fetch(resolveApiUrl(url), {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!response.ok) {
    handleUnauthorized(response.status, url, true)
    const errorData = await response.json().catch(() => null)
    throw new ApiError(response.status, errorData)
  }

  return response.blob()
}

export async function apiRequest<TResponse>(url: string, init: ApiRequestInit = {}) {
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
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    handleUnauthorized(response.status, url, auth === true)
    const errorData = await response.json().catch(() => null)
    throw new ApiError(response.status, errorData)
  }

  return (await response.json()) as TResponse
}
