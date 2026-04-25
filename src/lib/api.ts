export type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: unknown
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
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as TResponse
}
