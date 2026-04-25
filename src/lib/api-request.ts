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

export async function apiRequest<TResponse>(url: string, init: ApiRequestInit = {}) {
  const { body, headers, ...rest } = init

  const response = await fetch(url, {
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
