import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'

export function DashboardPage() {
  const { t } = useTranslation()
  const { data: user } = useUserInfo()

  const name = user?.first_name ?? ''

  return (
    <section className="space-y-6">
      <div className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-8 text-center shadow-sm sm:p-10">
        <h1 className="font-serif text-3xl font-bold text-on-surface">{t('dashboard.title')}</h1>
        <p className="mt-3 text-on-surface-variant">{t('dashboard.welcome', { name })}</p>
      </div>
    </section>
  )
}
