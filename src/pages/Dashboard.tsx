import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'

export function DashboardPage() {
  const { t } = useTranslation()
  const { data: user } = useUserInfo()

  const name = user?.name ?? ''

  return (
    <section className="flex items-center justify-center py-10">
      <div className="w-full max-w-4xl rounded-xl border border-outline-variant bg-surface-container-lowest p-10 text-center shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-on-surface">{t('dashboard.title')}</h1>
        <p className="mt-3 text-on-surface-variant">{t('dashboard.welcome', { name })}</p>
      </div>
    </section>
  )
}
