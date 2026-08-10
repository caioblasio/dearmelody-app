export const APP_LOCALE_STORAGE_KEY = 'dearmelody.locale'

export const SUPPORTED_LOCALES = ['en', 'pt'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export function isAppLocale(value: string): value is AppLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/** Map a BCP-47 / locale tag to a supported app locale. */
export function normalizeLocale(tag: string | null | undefined): AppLocale | null {
  if (!tag) return null
  const base = tag.trim().toLowerCase().split(/[-_]/)[0]
  if (base === 'en' || base === 'pt') return base
  return null
}

/**
 * Resolve app locale: localStorage → browser → en.
 */
export function resolveAppLocale(): AppLocale {
  if (typeof window === 'undefined') return 'en'

  try {
    const stored = normalizeLocale(window.localStorage.getItem(APP_LOCALE_STORAGE_KEY))
    if (stored) return stored
  } catch {
    // ignore storage access errors
  }

  const browser =
    normalizeLocale(window.navigator.languages?.[0]) ??
    normalizeLocale(window.navigator.language)

  return browser ?? 'en'
}

export function persistAppLocale(locale: AppLocale): void {
  try {
    window.localStorage.setItem(APP_LOCALE_STORAGE_KEY, locale)
  } catch {
    // ignore storage access errors
  }
}
