import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import meloRegular from '@/assets/melo-regular.svg'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { getMoodTextColor, MOOD_OF_THE_MONTH } from '@/lib/mood-colors'
import { capitalizeMood } from '@/lib/past-melody-mood'

const PREFIX_CHAR_MS = 42
const MOOD_START_DELAY_MS = 750
const MOOD_CHAR_MS = 95

export function MoodOfTheMonth() {
  const { t } = useTranslation()
  const prefersReducedMotion = usePrefersReducedMotion()
  const moodLabel = capitalizeMood(MOOD_OF_THE_MONTH)
  const moodColor = getMoodTextColor(MOOD_OF_THE_MONTH)
  const prefix = t('dashboard.moodOfTheMonthPrefix')

  const [typedPrefix, setTypedPrefix] = useState(prefersReducedMotion ? prefix : '')
  const [typedMood, setTypedMood] = useState(prefersReducedMotion ? moodLabel : '')

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedPrefix(prefix)
      setTypedMood(moodLabel)
      return
    }

    setTypedPrefix('')
    setTypedMood('')

    let prefixIndex = 0
    let moodIndex = 0
    const timeoutIds: number[] = []

    const schedule = (callback: () => void, delayMs: number) => {
      timeoutIds.push(window.setTimeout(callback, delayMs))
    }

    const typePrefixChar = () => {
      prefixIndex += 1
      setTypedPrefix(prefix.slice(0, prefixIndex))

      if (prefixIndex < prefix.length) {
        schedule(typePrefixChar, PREFIX_CHAR_MS)
        return
      }

      schedule(typeMoodChar, MOOD_START_DELAY_MS)
    }

    const typeMoodChar = () => {
      moodIndex += 1
      setTypedMood(moodLabel.slice(0, moodIndex))

      if (moodIndex < moodLabel.length) {
        schedule(typeMoodChar, MOOD_CHAR_MS)
      }
    }

    schedule(typePrefixChar, PREFIX_CHAR_MS)

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id))
    }
  }, [moodLabel, prefix, prefersReducedMotion])

  return (
    <div
      className="flex h-full w-full flex-row items-center gap-3 p-4 text-left md:flex-col md:justify-center md:gap-4 md:p-8 md:text-center"
      aria-label={t('dashboard.moodOfTheMonth', { mood: moodLabel })}
    >
      <img
        src={meloRegular}
        alt=""
        className="mood-melo-float size-20 shrink-0 md:size-32"
        aria-hidden
      />

      <p
        className="min-w-0 flex-1 font-heading text-base font-medium leading-snug text-ink md:flex-none md:text-[1.375rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        {typedPrefix}
        <span className="font-semibold" style={{ color: moodColor }}>
          {typedMood}
        </span>
      </p>
    </div>
  )
}
