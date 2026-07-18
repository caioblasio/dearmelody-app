import { cn } from '@/lib/utils'

function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5 align-baseline', className)}>
      <span data-anim className="melo-dots text-inherit">
        .
      </span>
      <span data-anim className="melo-dots melo-dots-delay-1 text-inherit">
        .
      </span>
      <span data-anim className="melo-dots melo-dots-delay-2 text-inherit">
        .
      </span>
    </span>
  )
}

function MeloPlaceholder({
  variant,
}: {
  variant: 'calm' | 'drums'
}) {
  return (
    <div
      data-anim={variant === 'calm' ? true : undefined}
      className={cn(
        'relative flex h-[132px] w-[132px] items-center justify-center rounded-full border border-warm-border bg-card-bg shadow-sm',
        variant === 'calm' ? 'melo-bob' : undefined,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-plum-bg text-2xl font-heading font-semibold text-plum">
        ♪
      </div>
      <div className="pointer-events-none absolute -top-1 left-1/2 h-3 w-14 -translate-x-1/2 rounded-b-full bg-coral" />
    </div>
  )
}

export function ComposingHeroLoaderCalm({
  className,
}: {
  className?: string
}) {
  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-[360px] flex-col items-center justify-center gap-4 rounded-[28px] bg-surface px-7 py-7',
        className,
      )}
    >
      <div className="flex h-[274px] w-[290px] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(170deg,#F1EAF7,#E4D5F0)]">
        <div className="relative h-[210px] w-[220px]">
          <div
            data-anim
            className="melo-pulse absolute left-[35px] top-[32px] h-[150px] w-[150px] rounded-full border-[3px] border-[rgba(139,91,176,0.4)]"
          />
          <div
            data-anim
            className="melo-pulse melo-pulse-delay absolute left-[35px] top-[32px] h-[150px] w-[150px] rounded-full border-[3px] border-[rgba(255,122,89,0.4)]"
          />

          <div data-anim className="melo-orbit absolute left-[-42px] top-[-47px] h-[304px] w-[304px]">
            <div data-anim className="melo-orbit-rev absolute left-[140px] top-[-8px]">
              <div className="font-heading text-[28px] font-semibold text-plum">♪</div>
            </div>
            <div data-anim className="melo-orbit-rev absolute left-[16px] top-[236px]">
              <div className="font-heading text-[24px] font-semibold text-coral">♫</div>
            </div>
            <div data-anim className="melo-orbit-rev absolute left-[262px] top-[232px]">
              <div className="font-heading text-[20px] font-semibold text-butter">♪</div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <MeloPlaceholder variant="calm" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-heading text-[18px] font-semibold text-ink">
          Composing your melody
          <LoadingDots />
        </div>
        <div className="mt-0.5 text-sm text-muted">
          Turning today&apos;s entry into a song. Usually about 30 seconds.
        </div>
      </div>
    </section>
  )
}

export function ComposingHeroLoaderDrums({
  className,
}: {
  className?: string
}) {
  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-[360px] flex-col items-center justify-center gap-4 rounded-[28px] bg-surface px-7 py-7',
        className,
      )}
    >
      <div className="flex h-[274px] w-[290px] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(170deg,#FFE3D8,#FFC9BC)]">
        <div className="relative h-[210px] w-[220px]">
          <div
            data-anim
            className="melo-pulse absolute left-[35px] top-[44px] h-[150px] w-[150px] rounded-full border-[3px] border-[rgba(232,105,90,0.4)]"
          />
          <div
            data-anim
            className="melo-pulse melo-pulse-delay absolute left-[35px] top-[44px] h-[150px] w-[150px] rounded-full border-[3px] border-[rgba(255,176,0,0.4)]"
          />

          <div
            data-anim
            className="melo-note-float absolute left-[150px] top-[34px] font-heading text-[22px] font-semibold text-plum"
          >
            ♪
          </div>
          <div
            data-anim
            className="melo-note-float melo-note-float-delay-1 absolute left-[26px] top-[52px] font-heading text-[18px] font-semibold text-coral"
          >
            ♫
          </div>
          <div
            data-anim
            className="melo-note-float melo-note-float-delay-2 absolute left-[190px] top-[70px] font-heading text-[15px] font-semibold text-butter"
          >
            ♪
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <MeloPlaceholder variant="drums" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-heading text-[18px] font-semibold text-ink">
          Drumming up your melody
          <LoadingDots />
        </div>
        <div className="mt-0.5 text-sm text-muted">
          A more upbeat wait — Melo lays down the beat while it renders.
        </div>
      </div>
    </section>
  )
}

export function ComposingCompactIconLoader({
  className,
  title = 'Loading…',
}: {
  className?: string
  title?: string
}) {
  return (
    <section
      className={cn(
        'flex w-full max-w-[520px] items-center justify-center gap-7 rounded-[28px] bg-surface px-7 py-6',
        className,
      )}
    >
      <div className="relative h-[72px] w-[72px] shrink-0">
        <div
          data-anim
          className="melo-spin absolute inset-0 rounded-full border-[6px] border-warm-border border-t-coral border-r-coral"
        />
        <div className="absolute inset-0 flex items-center justify-center font-heading text-[26px] font-semibold text-plum">
          ♪
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="font-heading text-[15px] font-semibold text-ink">{title}</div>
        <div className="flex h-[34px] items-end justify-center gap-[5px]">
          <div data-anim className="melo-eq h-[34px] w-[6px] rounded-[3px] bg-coral" />
          <div data-anim className="melo-eq melo-eq-delay-1 h-[34px] w-[6px] rounded-[3px] bg-peach" />
          <div data-anim className="melo-eq melo-eq-delay-2 h-[34px] w-[6px] rounded-[3px] bg-plum" />
          <div
            data-anim
            className="melo-eq melo-eq-delay-3 h-[34px] w-[6px] rounded-[3px] bg-plum-light"
          />
          <div data-anim className="melo-eq melo-eq-delay-4 h-[34px] w-[6px] rounded-[3px] bg-butter" />
          <div data-anim className="melo-eq melo-eq-delay-5 h-[34px] w-[6px] rounded-[3px] bg-coral" />
        </div>
      </div>
    </section>
  )
}

export function ComposingButtonLoaderLight({
  className,
  label = 'Composing your melody',
}: {
  className?: string
  label?: string
}) {
  return (
    <div
      className={cn(
        'btn-coral-gradient mx-auto inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-heading text-base font-semibold text-surface shadow-[0_12px_26px_rgba(255,122,89,0.32)]',
        className,
      )}
    >
      <div
        data-anim
        className="melo-spin h-5 w-5 rounded-full border-[3px] border-[rgba(255,246,236,0.4)] border-t-surface"
      />
      <span>
        {label}
        <LoadingDots className="ml-0.5" />
      </span>
    </div>
  )
}

export function ComposingInlineLoaderDark({
  className,
  title = 'Composing your melody',
  subtitle = 'Works on dark surfaces too.',
}: {
  className?: string
  title?: string
  subtitle?: string
}) {
  return (
    <section
      className={cn(
        'flex w-full items-center justify-center gap-4 rounded-[18px] bg-[linear-gradient(150deg,#241E52,#1B1740)] px-[22px] py-5',
        className,
      )}
    >
      <div className="relative h-[52px] w-[52px] shrink-0">
        <div
          data-anim
          className="melo-spin absolute inset-0 rounded-full border-[5px] border-[rgba(240,237,255,0.15)] border-t-[#FF6EC7] border-r-[#7C6CFF]"
        />
        <div className="absolute inset-0 flex items-center justify-center font-heading text-[20px] font-semibold text-[#5EE7DF]">
          ♪
        </div>
      </div>
      <div className="text-center">
        <div className="font-heading text-[15px] font-semibold text-[#F0EDFF]">{title}</div>
        <div className="mt-0.5 text-[13px] text-[#9A90CE]">{subtitle}</div>
      </div>
    </section>
  )
}

