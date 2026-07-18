import { logoutRequest } from '@/api/auth/logout'

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  localStorage.removeItem('token')
}

export async function logout() {
  try {
    await logoutRequest()
  } catch {
    // Best-effort: still clear local session if the API call fails.
  }

  removeToken()

  if (window.location.pathname !== '/login') {
    window.location.assign('/login')
  }
}
