export type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: unknown
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

export async function apiRequest<TResponse>(url: string, init: ApiRequestInit = {}) {
  const { body, headers, ...rest } = init
  const resolvedUrl = url.startsWith('http') ? url : `${API_BASE}${url}`

  const response = await fetch(resolvedUrl, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new ApiError(response.status, errorData)
  }

  return (await response.json()) as TResponse
}
