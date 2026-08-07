import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { MeloOfficialPose } from '@/components/melo/MeloMoodGenrePoses'

type ShareSignupBannerProps = {
  firstName: string
}

export function ShareSignupBanner({ firstName }: ShareSignupBannerProps) {
  const { t } = useTranslation()

  const benefits = [
    {
      title: t('shareMelody.banner.benefits.journaling.title'),
      body: t('shareMelody.banner.benefits.journaling.body'),
    },
    {
      title: t('shareMelody.banner.benefits.realLife.title'),
      body: t('shareMelody.banner.benefits.realLife.body'),
    },
    {
      title: t('shareMelody.banner.benefits.private.title'),
      body: t('shareMelody.banner.benefits.private.body'),
    },
    {
      title: t('shareMelody.banner.benefits.writer.title'),
      body: t('shareMelody.banner.benefits.writer.body'),
    },
  ] as const

  return (
    <section
      className="overflow-hidden rounded-[24px] bg-gradient-to-br from-plum to-plum-light px-6 py-8 text-on-secondary sm:px-8 lg:px-10 lg:py-10"
      aria-labelledby="share-signup-heading"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
        <div className="mx-auto shrink-0 origin-center scale-[0.55] sm:scale-[0.62] lg:mx-0 lg:scale-[0.7]">
          <MeloOfficialPose />
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="share-signup-heading"
            className="font-heading text-2xl font-semibold leading-tight text-cream-bg sm:text-3xl"
          >
            {t('shareMelody.banner.headline')}
          </h2>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="min-w-0">
                <p className="font-heading text-sm font-semibold text-cream-bg">{benefit.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-[#D8CBEA]">{benefit.body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-5 font-sans text-sm italic text-[#C9BADF]">
            {t('shareMelody.banner.ghostLine')}
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/signup"
              className="inline-flex h-14 items-center justify-center rounded-full bg-butter px-8 font-heading text-base font-semibold text-ink shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#FFC93F] active:scale-[0.98]"
            >
              {t('shareMelody.banner.cta')}
            </Link>
            <p className="text-sm text-[#EDE5F7]">
              {t('shareMelody.banner.caption', { firstName })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
