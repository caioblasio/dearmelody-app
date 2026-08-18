import { Navigate, Outlet } from 'react-router-dom'

import { useUserInfo } from '@/api/user/use-user-info'
import { isAdminEmail } from '@/lib/admin'

export function AdminRoute() {
  const { data: user } = useUserInfo()

  if (!isAdminEmail(user?.email)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
