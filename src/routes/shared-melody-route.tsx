import { useTranslation } from 'react-i18next'

import { useUserInfo } from '@/api/user/use-user-info'
import { AppLayout } from '@/components/AppLayout'
import { ComposingCompactIconLoader } from '@/components/loading/composing-loaders'
import { GuestShareLayout } from '@/components/share/GuestShareLayout'
import { getToken } from '@/lib/auth'

/** Public share URL: authenticated users get app chrome; guests get the share shell. */
export function SharedMelodyRoute() {
  const { t } = useTranslation()
  const hasToken = Boolean(getToken())
  const { data: user, isLoading } = useUserInfo()

  if (hasToken && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <ComposingCompactIconLoader title={t('common.loading')} />
      </div>
    )
  }

  if (hasToken && user) {
    return <AppLayout />
  }

  return <GuestShareLayout />
}
