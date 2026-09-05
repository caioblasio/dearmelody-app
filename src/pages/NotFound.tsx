import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { DearMelodyWordmark } from '@/components/DearMelodyWordmark'
import { getMeloCardMeta } from '@/components/melo/MeloMoodGenrePoses'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const meloMeta = getMeloCardMeta('mood', 'sad')
const { Pose, gradient } = meloMeta

export function NotFoundPage() {
  const { t } = useTranslation()

  useEffect(() => {
    const previous = document.title
    document.title = t('notFound.documentTitle')
    return () => {
      document.title = previous
    }
  }, [t])

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-cream-bg">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 50% 18%, rgba(203, 214, 236, 0.85) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 85% 75%, rgba(255, 178, 122, 0.28) 0%, transparent 55%),
            linear-gradient(180deg, #e4e9f5 0%, #fff6ec 48%, #fff1e2 100%)
          `,
        }}
        aria-hidden
      />

      <header className="relative z-10 flex items-center justify-center px-6 pt-8 sm:pt-10">
        <Link to="/" className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
          <DearMelodyWordmark />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-8 text-center">
        <div
          className="relative mb-8 flex h-[240px] w-[240px] items-center justify-center overflow-hidden rounded-[32px] sm:mb-10 sm:h-[280px] sm:w-[280px]"
          style={{ background: gradient }}
          aria-hidden
        >
          <div className="origin-center scale-[0.95] sm:scale-[1.05]">
            <Pose />
          </div>
        </div>

        <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-sand">
          {t('notFound.code')}
        </p>
        <h1 className="mt-2 max-w-md font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t('notFound.headline')}
        </h1>
        <p className="mt-3 max-w-sm font-sans text-base leading-relaxed text-muted sm:text-lg">
          {t('notFound.body')}
        </p>

        <Link
          to="/"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'mt-8 font-heading font-semibold auth-btn-shadow',
          )}
        >
          {t('notFound.cta')}
        </Link>
      </main>
    </div>
  )
}
