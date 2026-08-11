import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { CollectionCard } from '@/components/collections/CollectionCard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { CollectionCardData } from '@/lib/collections'

const PREVIEW_COLLECTION_ID = -1

export function NewCollectionPage() {
  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewDescription, setPreviewDescription] = useState('')

  const syncPreview = () => {
    setPreviewTitle(title)
    setPreviewDescription(description)
  }

  const previewCollection: CollectionCardData = {
    id: PREVIEW_COLLECTION_ID,
    title: previewTitle.trim() || t('collections.untitledPreview'),
    description: previewDescription.trim() || null,
    imageLocation: null,
    entryCount: 0,
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          to="/collections"
          aria-label={t('collections.backAria')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          {t('collections.backToCollections')}
        </Link>

        <header className="space-y-2">
          <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
            {t('collections.newTitle')}
          </h1>
          <p className="text-muted">{t('collections.newSubtitle')}</p>
        </header>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-3">
          <h2 className="label-caps text-sand">{t('collections.informationSection')}</h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="collection-title" className="text-[13px] font-semibold text-body">
                {t('collections.titleLabel')}
              </Label>
              <Input
                id="collection-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={syncPreview}
                placeholder={t('collections.titlePlaceholder')}
                className="rounded-[14px]"
                autoComplete="off"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="collection-description"
                className="text-[13px] font-semibold text-body"
              >
                {t('collections.descriptionLabel')}
              </Label>
              <Textarea
                id="collection-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={syncPreview}
                placeholder={t('collections.descriptionPlaceholder')}
                className="rounded-[14px]"
                rows={4}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-4 lg:self-start">
          <p className="label-caps text-sand">{t('collections.previewLabel')}</p>
          <CollectionCard collection={previewCollection} interactive={false} />
        </aside>
      </div>

      {/* Entry selector — full width; implemented in a follow-up plan */}
      <div className="w-full" />
    </section>
  )
}
