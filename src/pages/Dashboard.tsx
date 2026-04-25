import { useUserInfo } from '@/api/user/use-user-info'

export function DashboardPage() {
  const { data: user } = useUserInfo()

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-10 text-center shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-on-surface">Authenticated</h1>
        <p className="mt-3 text-on-surface-variant">
          {user.name}. You are now inside your Song Diary dashboard.
        </p>
      </div>
    </main>
  )
}
