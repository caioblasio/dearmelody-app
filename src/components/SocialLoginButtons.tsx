import { useTranslation } from 'react-i18next'

import { getGoogleAuthUrl } from '@/api/auth/google'
import { GoogleIcon } from '@/components/GoogleIcon'
import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

type SocialLoginButtonsProps = {
  labelKey?: string
  inviteCode?: string
  /** Return false to cancel navigation (e.g. Terms not accepted). */
  onBeforeNavigate?: () => boolean
}

export function SocialLoginButtons({
  labelKey = 'social.google',
  inviteCode,
  onBeforeNavigate,
}: SocialLoginButtonsProps) {
  const { t } = useTranslation()
  const href = getGoogleAuthUrl(inviteCode)

  return (
    <div className="grid grid-cols-1">
      <a
        href={href}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'h-auto gap-2 border-warm-border px-4 py-3 text-ink hover:border-peach hover:bg-[#FFFBF4] active:scale-95',
        )}
        onClick={(event) => {
          if (onBeforeNavigate && !onBeforeNavigate()) {
            event.preventDefault()
          }
        }}
      >
        <GoogleIcon />
        <span className="text-sm font-semibold text-ink">{t(labelKey)}</span>
      </a>
    </div>
  )
}
