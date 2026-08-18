import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { fetchUserInfo } from '@/api/user/user-info'
import { ComposingCompactIconLoader } from '@/components/loading/composing-loaders'
import { getToken, setToken } from '@/lib/auth'

// Survives React Strict Mode's mount → unmount → remount. Reset on full page load
// (Google OAuth always lands here via a fresh navigation).
let callbackHandled = false

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  useLayoutEffect(() => {
    if (callbackHandled) return
    callbackHandled = true

    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const error = params.get('error')

    const enterApp = async (jwt?: string) => {
      if (jwt) {
        setToken(jwt)
      }

      try {
        const user = await fetchUserInfo()
        queryClient.setQueryData(['user'], user)
      } catch {
        // ProtectedRoute will retry or bounce via the existing 401 logout path.
      }

      // Replace the callback URL (including ?token=) so the JWT is not left in history.
      navigate('/', { replace: true })
    }

    if (token) {
      void enterApp(token)
      return
    }

    if (error) {
      console.error('[google-auth]', error)
      navigate('/login', { replace: true, state: { googleAuthError: true } })
      return
    }

    if (getToken()) {
      void enterApp()
      return
    }

    navigate('/login', { replace: true })
  }, [navigate, queryClient])

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <ComposingCompactIconLoader title={t('common.loading')} />
    </div>
  )
}
