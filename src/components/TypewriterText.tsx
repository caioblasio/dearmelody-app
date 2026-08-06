import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { cn } from '@/lib/utils'

const DEFAULT_TYPING_INTERVAL_MS = 64

type TypewriterTextProps = {
  text: string
  active?: boolean
  intervalMs?: number
  caretClassName?: string
}

export function TypewriterText({
  text,
  active = true,
  intervalMs = DEFAULT_TYPING_INTERVAL_MS,
  caretClassName,
}: TypewriterTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [displayed, setDisplayed] = useState(() => (prefersReducedMotion ? text : ''))
  const isTyping = active && displayed.length < text.length && !prefersReducedMotion

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text)
      return
    }

    if (!active) {
      return
    }

    setDisplayed('')
    let index = 0

    const intervalId = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(intervalId)
      }
    }, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [text, active, intervalMs, prefersReducedMotion])

  return (
    <>
      {displayed}
      {isTyping ? (
        <span
          className={cn(
            'ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.12em] animate-pulse align-baseline bg-current opacity-80',
            caretClassName,
          )}
          aria-hidden
        />
      ) : null}
    </>
  )
}
