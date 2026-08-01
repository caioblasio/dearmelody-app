import meloListening from '@/assets/melo-listening.svg'
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

function MeloMascot() {
  return (
    <img
      src={meloListening}
      alt=""
      data-anim
      className="melo-bob-asset relative z-10 h-[168px] w-auto max-w-[200px] select-none"
      aria-hidden
      draggable={false}
    />
  )
}

export function ComposingHeroLoaderCalm({
  className,
  title = 'Composing your melody',
  subtitle = "Turning today's entry into a song. Usually about 30 seconds.",
}: {
  className?: string
  title?: string
  subtitle?: string
}) {
  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-[360px] flex-col items-center justify-center gap-4 rounded-[28px] border border-warm-border/60 bg-card-bg px-7 py-7 shadow-sm',
        className,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex h-[274px] w-full max-w-[290px] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(170deg,#F1EAF7,#E4D5F0)]">
        <div className="relative flex h-[210px] w-[220px] items-center justify-center">
          <div
            data-anim
            className="melo-pulse absolute left-[35px] top-[32px] h-[150px] w-[150px] rounded-full border-[3px] border-[rgba(139,91,176,0.4)]"
          />
          <div
            data-anim
            className="melo-pulse melo-pulse-delay absolute left-[35px] top-[32px] h-[150px] w-[150px] rounded-full border-[3px] border-[rgba(255,122,89,0.4)]"
          />

          <div data-anim className="melo-orbit pointer-events-none absolute left-[-42px] top-[-47px] h-[304px] w-[304px]">
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

          <div className="relative z-10 flex items-center justify-center pb-1">
            <MeloMascot />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-heading text-[18px] font-semibold text-ink">
          {title}
          <LoadingDots />
        </div>
        <div className="mt-0.5 text-sm text-muted">{subtitle}</div>
      </div>
    </section>
  )
}

export function ComposingHeroLoaderDrums({
  className,
  title = 'Drumming up your melody',
  subtitle = 'A more upbeat wait — Melo lays down the beat while it renders.',
}: {
  className?: string
  title?: string
  subtitle?: string
}) {
  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-[360px] flex-col items-center justify-center gap-4 rounded-[28px] border border-warm-border/60 bg-card-bg px-7 py-7 shadow-sm',
        className,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex h-[274px] w-full max-w-[290px] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(170deg,#FFE3D8,#FFC9BC)]">
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

          {/* Head cluster */}
          <div className="absolute left-[52px] top-[34px] size-10 rounded-full bg-[#FFFDF8]" />
          <div className="absolute left-[128px] top-[34px] size-10 rounded-full bg-[#FFFDF8]" />
          <div className="absolute left-[86px] top-6 size-12 rounded-full bg-[#FFFDF8]" />
          <div className="absolute left-6 top-[86px] size-[34px] rounded-full bg-[#FFFDF8]" />
          <div className="absolute left-[162px] top-[86px] size-[34px] rounded-full bg-[#FFFDF8]" />
          <div className="absolute left-[35px] top-9 h-[132px] w-[150px] rounded-[46%_46%_44%_44%] bg-[#FFFDF8]" />
          <div className="absolute left-[62px] top-[58px] h-[82px] w-24 rounded-[48%] bg-[#F2C29B]" />
          <div className="absolute left-20 top-[62px] h-2 w-[18px] box-border rounded-t-full border-t-4 border-[#5B3B8C]" />
          <div className="absolute left-[124px] top-[62px] h-2 w-[18px] box-border rounded-t-full border-t-4 border-[#5B3B8C]" />
          <div className="absolute left-[78px] top-[72px] h-[26px] w-6 rounded-full bg-white" />
          <div className="absolute left-[120px] top-[72px] h-[26px] w-6 rounded-full bg-white" />
          <div className="absolute left-[84px] top-[79px] h-3.5 w-3 rounded-full bg-[#5B3B8C]" />
          <div className="absolute left-[126px] top-[79px] h-3.5 w-3 rounded-full bg-[#5B3B8C]" />
          <div className="absolute left-[87px] top-[81px] size-1 rounded-full bg-white" />
          <div className="absolute left-[129px] top-[81px] size-1 rounded-full bg-white" />
          <div className="absolute left-[95px] top-[104px] h-[18px] w-[30px] rounded-[12%_12%_90%_90%] bg-[#5B3B8C]" />
          <div className="absolute left-[101px] top-[114px] h-2 w-[18px] rounded-b-[60%] bg-[#FF8E7A]" />
          <div className="absolute left-[66px] top-[100px] h-2 w-3.5 rounded-full bg-[#FFA98F] opacity-60" />
          <div className="absolute left-[140px] top-[100px] h-2 w-3.5 rounded-full bg-[#FFA98F] opacity-60" />
          <div className="absolute left-11 top-[26px] box-border h-[58px] w-[132px] rounded-t-[66px] border-[9px] border-b-0 border-[#FF7A59]" />
          <div className="absolute left-[37px] top-[60px] h-[34px] w-5 rounded-lg bg-[#FF7A59]" />
          <div className="absolute left-[163px] top-[60px] h-[34px] w-5 rounded-lg bg-[#FF7A59]" />

          {/* Left snare */}
          <div className="absolute left-1 top-[156px] h-10 w-[58px] rounded-[3px_3px_5px_5px] bg-[linear-gradient(90deg,#E8695A,#F08B7C_50%,#D9564A)]" />
          <div className="absolute left-4 top-[158px] h-9 w-[3px] bg-white/45" />
          <div className="absolute left-8 top-[158px] h-9 w-[3px] bg-white/45" />
          <div className="absolute left-12 top-[158px] h-9 w-[3px] bg-white/45" />
          <div className="absolute left-0.5 top-[190px] h-2 w-[62px] rounded bg-[#D9CBBB]" />
          <div className="absolute left-0 top-[147px] box-border h-5 w-[66px] rounded-full border-[3px] border-[#CFC0AE] bg-[#FBF4E8]" />

          {/* Right floor tom */}
          <div className="absolute left-[158px] top-[156px] h-10 w-[58px] rounded-[3px_3px_5px_5px] bg-[linear-gradient(90deg,#D9564A,#F08B7C_50%,#E8695A)]" />
          <div className="absolute left-[170px] top-[158px] h-9 w-[3px] bg-white/45" />
          <div className="absolute left-[186px] top-[158px] h-9 w-[3px] bg-white/45" />
          <div className="absolute left-[202px] top-[158px] h-9 w-[3px] bg-white/45" />
          <div className="absolute left-[156px] top-[190px] h-2 w-[62px] rounded bg-[#D9CBBB]" />
          <div className="absolute left-[154px] top-[147px] box-border h-5 w-[66px] rounded-full border-[3px] border-[#CFC0AE] bg-[#FBF4E8]" />

          {/* Bass drum */}
          <div className="absolute left-[65px] top-[138px] size-[90px] rounded-full bg-[#CFC0AE]" />
          <div className="absolute left-[72px] top-[145px] box-border size-[76px] rounded-full border-2 border-[#E3D5C2] bg-[radial-gradient(circle_at_42%_38%,#FEF9EF,#F3E7D3)]" />
          <div className="absolute left-[101px] top-[174px] size-[18px] rounded-full bg-[#E86B5A] opacity-85" />
          <div className="absolute left-[91px] top-[224px] h-5 w-[5px] origin-top rotate-[24deg] rounded-[3px] bg-[#A99C86]" />
          <div className="absolute left-[124px] top-[224px] h-5 w-[5px] origin-top -rotate-[24deg] rounded-[3px] bg-[#A99C86]" />

          {/* Cymbals */}
          <div className="absolute left-[30px] top-[116px] h-[82px] w-[3px] rounded-[2px] bg-[#A99C86]" />
          <div className="absolute left-[186px] top-[116px] h-[82px] w-[3px] rounded-[2px] bg-[#A99C86]" />
          <div className="absolute left-[-2px] top-[104px] h-[15px] w-[66px] rotate-[9deg] rounded-full bg-[linear-gradient(#FFE7A6,#EDA82A)] shadow-[0_2px_3px_rgba(0,0,0,0.08)]" />
          <div className="absolute left-[26px] top-[108px] h-[5px] w-2 rotate-[9deg] rounded-full bg-[#D98F1E]" />
          <div className="absolute left-[156px] top-[104px] h-[15px] w-[66px] -rotate-[9deg] rounded-full bg-[linear-gradient(#FFE7A6,#EDA82A)] shadow-[0_2px_3px_rgba(0,0,0,0.08)]" />
          <div className="absolute left-[186px] top-[108px] h-[5px] w-2 -rotate-[9deg] rounded-full bg-[#D98F1E]" />

          {/* Arms hinged at shoulder */}
          <div
            data-anim
            className="melo-arm-pump-l absolute left-[66px] top-[108px] h-11 w-3.5 rounded-lg bg-[#F2C29B]"
          >
            <div className="absolute left-[-2px] top-9 size-[17px] rounded-full bg-[#F2C29B]" />
            <div className="absolute left-[-8px] top-[46px] h-10 w-[5px] origin-top -rotate-[35deg] rounded-[3px] bg-[#C89B6A]" />
          </div>
          <div
            data-anim
            className="melo-arm-pump-r absolute left-[140px] top-[108px] h-11 w-3.5 rounded-lg bg-[#F2C29B]"
          >
            <div className="absolute left-0 top-9 size-[17px] rounded-full bg-[#F2C29B]" />
            <div className="absolute left-3.5 top-[46px] h-10 w-[5px] origin-top rotate-[35deg] rounded-[3px] bg-[#C89B6A]" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-heading text-[18px] font-semibold text-ink">
          {title}
          <LoadingDots />
        </div>
        <div className="mt-0.5 text-sm text-muted">{subtitle}</div>
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

