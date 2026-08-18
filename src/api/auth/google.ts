import { resolveApiUrl } from '@/lib/api-request'

export function getGoogleAuthUrl(inviteCode?: string): string {
  const url = new URL(resolveApiUrl('/api/auth/google'), window.location.origin)
  const normalized = inviteCode?.trim().toUpperCase()
  if (normalized) {
    url.searchParams.set('invite_code', normalized)
  }
  // When API_BASE is empty, resolveApiUrl returns a relative path; URL()
  // resolves it against origin, but we want a same-origin relative href for
  // the Vite proxy. Prefer pathname+search when the host matches the page.
  if (url.origin === window.location.origin) {
    return `${url.pathname}${url.search}`
  }
  return url.toString()
}
