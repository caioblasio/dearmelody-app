// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useUserInfo } from '@/api/user/use-user-info'

export function ProtectedRoute() {
  const { data: user, isLoading } = useUserInfo()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
