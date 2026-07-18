import { useTranslation } from 'react-i18next'

import meloListening from '@/assets/melo-listening.svg'
import meloSongReady from '@/assets/melo-song-ready.svg'
import { cn } from '@/lib/utils'

type AuthMobileHeaderProps = {
  variant: 'login' | 'signup'
  className?: string
}

export function AuthMobileHeader({ variant, className }: AuthMobileHeaderProps) {
  const { t } = useTranslation()
  const isLogin = variant === 'login'

  return (
    <div
      className={cn(
        'relative overflow-hidden px-6 pt-8 pb-6',
        isLogin ? 'auth-mobile-login' : 'auth-mobile-signup',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-8 h-36 w-36 rounded-full border border-white/30"
        aria-hidden
      />
      <img
        src={isLogin ? meloListening : meloSongReady}
        alt=""
        className="relative mb-4 h-[115px] w-auto drop-shadow-[0_12px_20px_rgba(91,59,140,0.2)]"
        aria-hidden
      />
      <h1 className="relative font-heading text-[25px] font-semibold tracking-[-0.3px] text-player-ink">
        {isLogin ? t('login.mobile.headline') : t('signup.mobile.headline')}
      </h1>
      <p className="relative mt-1 font-sans text-[15px] text-[#6B4A32]">
        {isLogin ? t('login.mobile.subheadline') : t('signup.mobile.subheadline')}
      </p>
    </div>
  )
}
