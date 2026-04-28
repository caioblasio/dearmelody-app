// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/Login'
import { NewEntryPage } from '@/pages/NewEntry'
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
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <DashboardPage />,
            handle: { title: 'dashboard.title' },
          },
          {
            path: '/new-entry',
            element: <NewEntryPage />,
            handle: { title: 'newEntry.title' },
          },
        ],
      },
    ],
  },
])
