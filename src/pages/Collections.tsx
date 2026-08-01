import { useTranslation } from 'react-i18next'

export function CollectionsPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-3">
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {t('collections.title')}
        </h1>
        <p className="text-muted">{t('collections.subtitle')}</p>
      </header>
    </section>
  )
}
