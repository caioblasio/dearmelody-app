import { Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'
import { ComposingCompactIconLoader } from '@/components/loading/composing-loaders'
import { getToken } from '@/lib/auth'

export function ProtectedRoute() {
  const { t } = useTranslation()
  const { data: user, isLoading } = useUserInfo()

  if (!getToken()) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <ComposingCompactIconLoader title={t('common.loading')} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
