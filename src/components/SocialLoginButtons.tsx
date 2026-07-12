import { useTranslation } from 'react-i18next'

import { GoogleIcon } from '@/components/GoogleIcon'

import { Button } from './ui/button'

export function SocialLoginButtons() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1">
      <Button variant="outline" className="h-auto gap-2 border-warm-border px-4 py-3 active:scale-95">
        <GoogleIcon />
        <span className="text-sm font-semibold text-ink">{t('social.google')}</span>
      </Button>
    </div>
  )
}
