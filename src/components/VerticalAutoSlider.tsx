import { useEffect, useRef, useState, type ReactNode, type TransitionEvent } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { cn } from '@/lib/utils'

type VerticalAutoSliderProps<T> = {
  items: T[]
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  getItemKey: (item: T, index: number) => string
  renderSlide: (item: T, index: number) => ReactNode
  intervalMs?: number
  infinite?: boolean
  viewportClassName?: string
  slideClassName?: string
  className?: string
}

export function VerticalAutoSlider<T>({
  items,
  activeIndex,
  onActiveIndexChange,
  getItemKey,
  renderSlide,
  intervalMs = 3000,
  infinite = false,
  viewportClassName,
  slideClassName,
  className,
}: VerticalAutoSliderProps<T>) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const infiniteEnabled = infinite && items.length > 1 && !prefersReducedMotion

  const slides = infiniteEnabled ? [...items, items[0]!] : items
  const slideCount = slides.length

  const [displayIndex, setDisplayIndex] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const activeIndexRef = useRef(activeIndex)
  const displayIndexRef = useRef(displayIndex)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    displayIndexRef.current = displayIndex
  }, [displayIndex])

  useEffect(() => {
    if (prefersReducedMotion || items.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      if (infiniteEnabled) {
        const current = displayIndexRef.current
        if (current >= items.length) {
          return
        }

        const next = current + 1
        setDisplayIndex(next)
        onActiveIndexChange(next % items.length)
        return
      }

      onActiveIndexChange((activeIndexRef.current + 1) % items.length)
    }, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [items.length, intervalMs, onActiveIndexChange, prefersReducedMotion, infiniteEnabled])

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'transform' || !infiniteEnabled || displayIndex !== items.length) {
      return
    }

    setTransitionEnabled(false)
    setDisplayIndex(0)
    onActiveIndexChange(0)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true)
      })
    })
  }

  if (items.length === 0) {
    return null
  }

  const trackIndex = infiniteEnabled ? displayIndex : activeIndex
  const slideOffsetPercent = slideCount > 0 ? (trackIndex * 100) / slideCount : 0

  return (
    <div
      className={cn('overflow-hidden', viewportClassName, className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          transitionEnabled && 'transition-transform duration-500 ease-in-out',
          'motion-reduce:transition-none',
        )}
        style={{ transform: `translateY(-${slideOffsetPercent}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((item, index) => (
          <div
            key={
              infiniteEnabled && index === items.length
                ? `${getItemKey(item, 0)}-loop-clone`
                : getItemKey(item, index)
            }
            className={slideClassName}
          >
            {renderSlide(item, index < items.length ? index : 0)}
          </div>
        ))}
      </div>
    </div>
  )
}
