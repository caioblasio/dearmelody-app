// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/Login'
import { ProtectedRoute } from './protected-route'
import { PublicRoute } from './public-route'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
        handle: { title: 'dashboard.title' },
      },
    ],
  },
])
