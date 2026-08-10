import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/translations/en.json'
import pt from '@/translations/pt.json'
import de from '@/translations/de.json'
import {
  isAppLocale,
  persistAppLocale,
  resolveAppLocale,
  type AppLocale,
} from '@/lib/locale'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    de: { translation: de },
  },
  lng: resolveAppLocale(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false,
  },
})

function syncDocumentTitle() {
  document.title = i18n.t('app.documentTitle')
}

syncDocumentTitle()
i18n.on('languageChanged', syncDocumentTitle)

export async function setAppLocale(locale: string): Promise<AppLocale> {
  const next: AppLocale = isAppLocale(locale) ? locale : 'en'
  persistAppLocale(next)
  await i18n.changeLanguage(next)
  return next
}

export default i18n
