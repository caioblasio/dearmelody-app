import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'
import { removeToken } from '@/lib/auth'

export function ProtectedRoute() {
  const { t } = useTranslation()
  const { data: user, isLoading, isError } = useUserInfo()

  useEffect(() => {
    if (isError) {
      removeToken()
    }
  }, [isError])

  if (isLoading) {
    return <p>{t('common.loading')}</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
