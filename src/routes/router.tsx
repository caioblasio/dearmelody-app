// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { CollectionsPage } from '@/pages/Collections'
import { DashboardPage } from '@/pages/Dashboard'
import { EntryPage } from '@/pages/Entry'
import { LoginPage } from '@/pages/Login'
import { MyMelodiesPage } from '@/pages/MyMelodies'
import { NewEntryPage } from '@/pages/NewEntry'
import { ProfilePage } from '@/pages/Profile'
import { SharedMelodyPage } from '@/pages/SharedMelody'
import { SignUpPage } from '@/pages/SignUp'
import { ProtectedRoute } from './protected-route'
import { PublicRoute } from './public-route'
import { SharedMelodyRoute } from './shared-melody-route'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '/melodies/share/:shareToken',
    element: <SharedMelodyRoute />,
    children: [
      {
        index: true,
        element: <SharedMelodyPage />,
        handle: { title: 'shareMelody.documentTitle' },
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
          {
            path: '/melodies/:entryId',
            element: <EntryPage />,
            handle: { title: 'entry.documentTitle' },
          },
          {
            path: '/melodies',
            element: <MyMelodiesPage />,
            handle: { title: 'pastMelodies.title' },
          },
          {
            path: '/collections',
            element: <CollectionsPage />,
            handle: { title: 'collections.title' },
          },
          {
            path: '/profile',
            element: <ProfilePage />,
            handle: { title: 'settings.title' },
          },
        ],
      },
    ],
  },
])
