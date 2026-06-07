import { Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'
import { getToken } from '@/lib/auth'

export function ProtectedRoute() {
  const { t } = useTranslation()
  const { data: user, isLoading } = useUserInfo()

  if (!getToken()) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return <p>{t('common.loading')}</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
