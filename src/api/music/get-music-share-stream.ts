import { ApiError, resolveApiUrl } from '@/lib/api-request'

export async function getMusicShareStream(token: string): Promise<Blob> {
  const response = await fetch(
    resolveApiUrl(`/api/music/share/${encodeURIComponent(token)}/stream`)
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new ApiError(response.status, errorData)
  }

  return response.blob()
}
