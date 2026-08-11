import { useTranslation } from 'react-i18next'

export function NewCollectionPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-3">
      <header className="space-y-2">
        <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
          {t('collections.newTitle')}
        </h1>
      </header>
    </section>
  )
}
