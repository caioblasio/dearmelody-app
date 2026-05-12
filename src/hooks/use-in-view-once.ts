import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number | number[]
}

export function useInViewOnce<T extends Element>(options?: Options) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const rootMargin = options?.rootMargin ?? '0px 0px -6% 0px'
  const threshold = options?.threshold ?? 0.12

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible, rootMargin, threshold])

  return { ref, visible }
}
