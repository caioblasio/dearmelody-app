// lib/auth.ts
export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function logout() {
  removeToken()
  if (window.location.pathname !== '/login') {
    window.location.assign('/login')
  }
}
