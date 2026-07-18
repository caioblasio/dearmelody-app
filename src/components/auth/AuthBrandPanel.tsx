import { useTranslation } from 'react-i18next'

import logo from '@/assets/logo.svg'
import meloListening from '@/assets/melo-listening.svg'
import meloSongReady from '@/assets/melo-song-ready.svg'
import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { cn } from '@/lib/utils'

type AuthBrandPanelProps = {
  variant: 'login' | 'signup'
  showProofBadge?: boolean
  className?: string
}

export function AuthBrandPanel({
  variant,
  showProofBadge = true,
  className,
}: AuthBrandPanelProps) {
  const { t } = useTranslation()
  const isLogin = variant === 'login'
  const meloSrc = isLogin ? meloListening : meloSongReady
  const perksRaw = t('signup.brand.perks', { returnObjects: true })
  const perks = Array.isArray(perksRaw) ? (perksRaw as string[]) : []

  return (
    <div
      className={cn(
        'relative flex h-full min-h-[680px] flex-col justify-between overflow-hidden px-11 py-11',
        isLogin ? 'auth-brand-login' : 'auth-brand-signup',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-white/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-6 -right-6 h-40 w-40 rounded-full border border-white/35"
        aria-hidden
      />

      <div className={cn('relative flex items-center gap-2.5', !isLogin && 'justify-end')}>
        <img
          src={logo}
          alt=""
          className="h-10 w-10 rounded-[13px] bg-white/70 p-1.5 shadow-sm"
          aria-hidden
        />
        <DearMelodyWordmark className="font-heading text-[21px] font-semibold text-player-ink" />
      </div>

      <div className="relative flex flex-1 items-center justify-center py-6">
        <img
          src={meloSrc}
          alt=""
          className="h-[200px] w-auto drop-shadow-[0_20px_30px_rgba(91,59,140,0.22)]"
          aria-hidden
        />
      </div>

      <div className="relative space-y-3">
        <h2 className="font-heading text-[32px] leading-tight font-semibold tracking-[-0.4px] text-player-ink md:text-[34px]">
          {isLogin ? (
            <>
              {t('login.brand.headlineLine1')}
              <br />
              {t('login.brand.headlineLine2')}
            </>
          ) : (
            <>
              {t('signup.brand.headlineLine1')}
              <br />
              {t('signup.brand.headlineLine2')}
            </>
          )}
        </h2>

        {isLogin ? (
          <>
            <p className="font-sans text-base leading-relaxed text-[#6B4A32]">
              {t('login.brand.body')}
            </p>
            {showProofBadge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,253,248,0.7)] px-3.5 py-2 text-sm font-medium text-player-ink">
                <span className="tracking-wide text-[#FFB000]" aria-hidden>
                  ★★★★★
                </span>
                <span>{t('login.brand.proofBadge')}</span>
              </div>
            )}
          </>
        ) : (
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-player-ink text-xs font-bold text-on-primary"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="font-sans text-[15px] font-medium text-[#5A3218]">{perk}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
